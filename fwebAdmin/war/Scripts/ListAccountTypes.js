/**
 * @fileoverview
 * Provides methods for the  Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.accounttypeendpoint = fanikiwa.accounttypeendpoint || {};
fanikiwa.accounttypeendpoint.listaccounttypes = fanikiwa.accounttypeendpoint.listaccounttypes
		|| {};

fanikiwa.accounttypeendpoint.listaccounttypes.LoadAccountTypes = function() {

	$('#listAccountTypesResult').html('loading...');

	gapi.client.accounttypeendpoint.listAccountType().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					if (resp.result.items == undefined
							|| resp.result.items == null) {
						$('#listAccountTypesResult').html(
								'There are no Account Types...');
					} else {
						buildTable(resp);
					}
				}

			}, function(reason) {
				console.log('Error: ' + reason.result.error.message);
			});
};

/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
fanikiwa.accounttypeendpoint.listaccounttypes.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.accounttypeendpoint.listaccounttypes.LoadAccountTypes();
		}
	}
	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('accounttypeendpoint', 'v1', callback, apiRoot);

};

var accounttypeTable = '';
function buildTable(response) {

	accounttypeTable = '';

	populateAccountTypes(response);

	$("#listAccountTypesResult").html(accounttypeTable);
}

function populateAccountTypes(resp) {

	if (!resp.code) {
		resp.items = resp.items || [];

		$(".page-title").append("  [" + resp.result.items.length + "] ");

		accounttypeTable += '<table id="listAccountTypesTable">';
		accounttypeTable += "<thead>";
		accounttypeTable += "<tr>";
		accounttypeTable += "<th>Id</th>";
		accounttypeTable += "<th>Short Code</th>";
		accounttypeTable += "<th>Description</th>";
		accounttypeTable += "</tr>";
		accounttypeTable += "</thead>";
		accounttypeTable += "<tbody>";

		for (var i = 0; i < resp.result.items.length; i++) {
			accounttypeTable += '<tr>';
			accounttypeTable += '<td>' + resp.result.items[i].id + '</td>';
			accounttypeTable += '<td>' + resp.result.items[i].shortCode
					+ '</td>';
			accounttypeTable += '<td>' + resp.result.items[i].description
					+ '</td>';
			accounttypeTable += "</tr>";
		}

		accounttypeTable += "</tbody>";
		accounttypeTable += "</table>";

	}
}
