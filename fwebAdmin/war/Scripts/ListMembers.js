/**
 * @fileoverview
 * Provides methods for the  Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.memberendpoint = fanikiwa.memberendpoint || {};
fanikiwa.memberendpoint.listmembers = fanikiwa.memberendpoint.listmembers || {};

fanikiwa.memberendpoint.listmembers.LoadMembers = function() {

	$('#listMembersResult').html('loading...');

	var email = sessionStorage.getItem('loggedinuser');

	gapi.client.memberendpoint.selectDtoMembers()
			.execute(
					function(resp) {
						console.log('response =>> ' + resp);
						if (!resp.code) {
							if (resp.result.items == undefined
									|| resp.result.items == null) {
								$('#listMembersResult').html(
										'There are no Members...');
							} else {
								buildTable(resp);
							}
						} else {
							console.log('Error: ' + resp.error.message);
							$('#errormessage').html(
									'operation failed! Error...<br/>'
											+ resp.error.message.toString());
							$('#successmessage').html('');
							$('#apiResults').html('');
						}
					},
					function(reason) {
						console.log('Error: ' + reason.result.error.message);
						$('#errormessage').html(
								'operation failed! Error...<br/>'
										+ reason.result.error.message);
						$('#successmessage').html('');
						$('#apiResults').html('');
					});
};

/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
fanikiwa.memberendpoint.listmembers.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.memberendpoint.listmembers.LoadMembers();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('memberendpoint', 'v1', callback, apiRoot);

};

var memberTable = '';
function buildTable(response) {

	memberTable = '';

	populateMembers(response);

	$("#listMembersResult").html(memberTable);

	$('#listMembersTable').DataTable(
			{
				"aLengthMenu" : [ [ 5, 10, 20, 50, 100, -1 ],
						[ 5, 10, 20, 50, 100, "All" ] ],
				"iDisplayLength" : 5
			});

}

function populateMembers(resp) {

	if (!resp.code) {
		resp.items = resp.items || [];

		$(".page-title").append("  [" + resp.result.items.length + "] ");

		memberTable += '<table id="listMembersTable">';
		memberTable += "<thead>";
		memberTable += "<tr>";
		memberTable += "<th>Member Id</th>";
		memberTable += "<th>Email</th>";
		memberTable += "<th>Telephone</th>";
		memberTable += "<th>Surname</th>";
		memberTable += "<th>Status</th>";
		memberTable += "<th>Date Activated</th>";
		memberTable += "<th></th>";
		memberTable += "<th></th>";
		memberTable += "</tr>";
		memberTable += "</thead>";
		memberTable += "<tbody>";

		for (var i = 0; i < resp.result.items.length; i++) {
			memberTable += '<tr>';
			memberTable += '<td>' + resp.result.items[i].memberId + '</td>';
			memberTable += '<td>' + resp.result.items[i].email + '</td>';
			memberTable += '<td>' + resp.result.items[i].telephone + '</td>';
			memberTable += '<td>' + resp.result.items[i].surname + '</td>';
			memberTable += '<td>' + resp.result.items[i].status + '</td>';
			memberTable += '<td>'
					+ formatDate(resp.result.items[i].dateActivated) + '</td>';

			memberTable += '<td><a href="#" onclick="Details('
					+ resp.result.items[i].memberId + ')">Details</a> </td>';
			memberTable += '<td><a href="#" onclick="Delete('
					+ resp.result.items[i].memberId + ')">Delete</a> </td>';
			memberTable += "</tr>";
		}

		memberTable += "</tbody>";
		memberTable += "</table>";

	} else {
		console.log('Error: ' + resp.error.message);
		$('#errormessage').html(
				'operation failed! Error...<br/>' + resp.error.message);
		$('#successmessage').html('');
		$('#apiResults').html('');
	}
}

function Details(id) {
	sessionStorage.memberdetailsid = id;
	window.location.href = "/Views/Member/Details.html";
}

function Delete(id) {
	// Define the Dialog and its properties.
	$("#div-delete-dialog").dialog({
		autoOpen : false,
		modal : true,
		title : "Confirm Delete",
		resizable : true,
		draggable : true,
		closeOnEscape : true,
		buttons : {
			"Yes" : function() {
				$(this).dialog('close');
				callback(true, id);
			},
			"No" : function() {
				$(this).dialog('close');
				callback(false, id);
			}
		}
	});

	$("#div-delete-dialog").html(
			"Are you sure you want to delete Member [ " + id + " ]");
	$("#div-delete-dialog").dialog("open");
}

function callback(value, id) {
	if (value) {
		DeleteNow(id);
	} else {
		return;
	}
}

function DeleteNow(id) {

	$('#apiResults').html('processing...');
	$('#successmessage').html('');
	$('#errormessage').html('');

	gapi.client.memberendpoint
			.removeMember({
				'id' : id
			})
			.execute(
					function(resp) {
						if (!resp.code) {
							if (resp.result.success == false) {
								$('#errormessage').html(
										'operation failed! Error...<br/>'
												+ resp.result.resultMessage
														.toString());
								$('#successmessage').html('');
								$('#apiResults').html('');
							} else {
								$('#successmessage').html(
										'operation successful... <br/>'
												+ resp.result.resultMessage
														.toString());
								$('#errormessage').html('');
								$('#apiResults').html('');
								window
										.setTimeout(
												'window.location.href = "/Views/Member/List.html";',
												1000);
							}
						} else {
							console.log('Error: ' + resp.error.message);
							$('#errormessage').html(
									'operation failed! Error...<br/>'
											+ resp.error.message.toString());
							$('#successmessage').html('');
							$('#apiResults').html('');
						}
					});
}
