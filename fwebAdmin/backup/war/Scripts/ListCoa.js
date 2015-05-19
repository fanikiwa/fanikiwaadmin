/**
 * @fileoverview
 * Provides methods for the  Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.coaendpoint = fanikiwa.coaendpoint || {};
fanikiwa.coaendpoint.listcoa = fanikiwa.coaendpoint.listcoa || {};

fanikiwa.coaendpoint.listcoa.LoadCoa = function() {

	$('#listCoaResult').html('loading...');

	var email = sessionStorage.getItem('loggedinuser');

	gapi.client.coaendpoint.listCoa().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					if (resp.result.items == undefined
							|| resp.result.items == null) {
						$('#listCoaResult').html(
								'There are no Chart Of Accounts...');
					} else {
						buildTable(resp);
					}
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
fanikiwa.coaendpoint.listcoa.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.coaendpoint.listcoa.LoadCoa();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('coaendpoint', 'v1', callback, apiRoot);

};

var coaTable = '';
function buildTable(response) {

	coaTable = '';

	populateCoa(response);

	$("#listCoaResult").html(coaTable);
}

function populateCoa(resp) {

	if (!resp.code) {
		resp.items = resp.items || [];

		$(".page-title").append("  [" + resp.result.items.length + "] ");

		coaTable += '<table id="listCoaTable">';
		coaTable += "<thead>";
		coaTable += "<tr>";
		coaTable += "<th>Id</th>";
		coaTable += "<th>Description</th>";
		coaTable += "<th></th>";
		coaTable += "</tr>";
		coaTable += "</thead>";
		coaTable += "<tbody>";

		for (var i = 0; i < resp.result.items.length; i++) {
			coaTable += '<tr>';
			coaTable += '<td>' + resp.result.items[i].id + '</td>';
			coaTable += '<td>' + resp.result.items[i].description + '</td>';
			coaTable += '<td><a href="#" onclick="Edit('
					+ resp.result.items[i].id + ')">Edit</a> </td>';
			coaTable += '<td><a href="#" onclick="Details('
					+ resp.result.items[i].id + ')">Details</a> </td>';
			coaTable += '<td><a href="#" onclick="Delete('
					+ resp.result.items[i].id + ')">Delete</a> </td>';
			coaTable += "</tr>";
		}

		coaTable += "</tbody>";
		coaTable += "</table>";

	}
}

function Edit(id) {
	sessionStorage.editcoaid = id;
	window.location.href = "/Views/Coa/Edit.html";
}

function Details(id) {
	sessionStorage.coaid = id;
	window.location.href = "/Views/CoaDet/List.html";
}

function CreateSubMenu() {
	var SubMenu = [];
	SubMenu.push('<div class="nav"><ul class="menu">');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Coa/Create.html" style="cursor: pointer;" >Create</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Account/Statement.html" style="cursor: pointer;">Statement</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/WithDraw/Withdraw.html" style="cursor: pointer;">Withdraw</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Deposit/Deposit.html" style="cursor: pointer;">Deposit</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Coa/List.html" style="cursor: pointer;" >Coa</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/AccountType/List.html" style="cursor: pointer;" >Account Types</a></div></div></li>');
	SubMenu.push('</ul></div>');

	$("#SubMenu").html(SubMenu.join(" "));
}

$(document).ready(function() {
	CreateSubMenu();
});
