/**
 * @fileoverview
 * Provides methods for the  Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.userprofileendpoint = fanikiwa.userprofileendpoint || {};
fanikiwa.userprofileendpoint.listuserprofiles = fanikiwa.userprofileendpoint.listuserprofiles
		|| {};

fanikiwa.userprofileendpoint.listuserprofiles.LoadUserprofiles = function() {

	$('#listUserprofilesResult').html('loading...');

	var email = sessionStorage.getItem('loggedinuser');

	gapi.client.userprofileendpoint.listUserprofile().execute(function(resp) {
		console.log('response =>> ' + resp);
		if (!resp.code) {
			if (resp.result.items == undefined || resp.result.items == null) {
				$('#listUserprofilesResult').html('There are no Users...');
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
fanikiwa.userprofileendpoint.listuserprofiles.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.userprofileendpoint.listuserprofiles.LoadUserprofiles();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('userprofileendpoint', 'v1', callback, apiRoot);

};

var userprofileTable = '';
function buildTable(response) {

	userprofileTable = '';

	populateUserprofiles(response);

	$("#listUserprofilesResult").html(userprofileTable);
}

function populateUserprofiles(resp) {

	if (!resp.code) {
		resp.items = resp.items || [];

		$(".page-title").append("  [" + resp.result.items.length + "] ");

		userprofileTable += '<table id="listUserprofilesTable">';
		userprofileTable += "<thead>";
		userprofileTable += "<tr>";
		userprofileTable += "<th>User Id</th>";
		userprofileTable += "<th>Telephone</th>";
		userprofileTable += "<th>Created Date</th>";
		userprofileTable += "</tr>";
		userprofileTable += "</thead>";
		userprofileTable += "<tbody>";

		for (var i = 0; i < resp.result.items.length; i++) {
			userprofileTable += '<tr>';
			userprofileTable += '<td>' + resp.result.items[i].userId + '</td>';
			userprofileTable += '<td>' + resp.result.items[i].telephone
					+ '</td>';
			userprofileTable += '<td>' + formatDate(resp.result.items[i].createDate)
					+ '</td>';
			userprofileTable += "</tr>";
		}

		userprofileTable += "</tbody>";
		userprofileTable += "</table>";

	}
}

function UserprofileDetails(id) {
	sessionStorage.userprofiledetailsid = id;
	window.location.href = "/Views/Userprofile/Details.html";
}
