/**
 * @fileoverview
 * Provides methods for the  Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.coadetendpoint = fanikiwa.coadetendpoint || {};
fanikiwa.coadetendpoint.listcoadet = fanikiwa.coadetendpoint.listcoadet || {};

fanikiwa.coadetendpoint.listcoadet.LoadCoaDet = function() {

	$('#listCoaDetResult').html('loading...');

	var coaid = sessionStorage.getItem('coaid');

	gapi.client.coadetendpoint.retrieveCoadetsDTO({
		coaid : coaid
	}).execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					if (resp.result.items == undefined
							|| resp.result.items == null) {
						$('#listCoaDetResult').html(
								'There are no Chart Of Accounts Details...');
					} else {
						buildTable(resp);
					}
				}

			}, function(reason) {
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
fanikiwa.coadetendpoint.listcoadet.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.coadetendpoint.listcoadet.LoadCoaDet();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('coadetendpoint', 'v1', callback, apiRoot);

};

var coadetTable = '';
function buildTable(response) {

	coadetTable = '';

	populateCoaDet(response);

	$("#listCoaDetResult").html(coadetTable);
}

function populateCoaDet(resp) {

	if (!resp.code) {
		resp.items = resp.items || [];

		$(".page-title").append("  [" + resp.result.items.length + "] ");

		coadetTable += '<table id="listCoaDetTable">';
		coadetTable += "<thead>";
		coadetTable += "<tr>";
		coadetTable += "<th>Id</th>";
		coadetTable += "<th>Short Code</th>";
		coadetTable += "<th>Description</th>";
		coadetTable += "<th>ROrder</th>";
		coadetTable += "<th>Coa Level</th>";
		coadetTable += "<th>Coa Id</th>";
		coadetTable += "</tr>";
		coadetTable += "</thead>";
		coadetTable += "<tbody>";

		for (var i = 0; i < resp.result.items.length; i++) {
			coadetTable += '<tr>';
			coadetTable += '<td>' + resp.result.items[i].id + '</td>';
			coadetTable += '<td>' + resp.result.items[i].shortCode + '</td>';
			coadetTable += '<td>' + resp.result.items[i].description + '</td>';
			coadetTable += '<td style="text-align:right">'
					+ resp.result.items[i].rorder + '</td>';
			coadetTable += '<td style="text-align:right">'
					+ resp.result.items[i].coaLevel + '</td>';
			coadetTable += '<td style="text-align:right">'
					+ resp.result.items[i].coa + '</td>';
			coaTable += '<td><a href="#" onclick="Edit('
					+ resp.result.items[i].id + ')">Edit</a> </td>';
			coadetTable += "</tr>";
		}

		coadetTable += "</tbody>";
		coadetTable += "</table>";

	}
}

function Edit(id) {
	sessionStorage.editcoadetid = id;
	window.location.href = "/Views/CoaDet/Edit.html";
}

function CreateSubMenu() {
	var SubMenu = [];
	SubMenu.push('<div class="nav"><ul class="menu">');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/CoaDet/Create.html" style="cursor: pointer;" >Create</a></div></div></li>');
	SubMenu.push('</ul></div>');

	$("#SubMenu").html(SubMenu.join(" "));
}

$(document).ready(function() {
	CreateSubMenu();
});
