/**
 * @fileoverview
 * Provides methods for the  Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.memberendpoint = fanikiwa.memberendpoint || {};
fanikiwa.memberendpoint.memberdetail = fanikiwa.memberendpoint.memberdetail
		|| {};

fanikiwa.memberendpoint.memberdetail.LoadMemberDetails = function() {
	$('#apiResults').html('loading...');
	var id = sessionStorage.getItem('memberdetailsid');
	gapi.client.memberendpoint.getMemberByID({
		'id' : id
	}).execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					if (resp.result.id == undefined) {
						$('#apiResults').html(
								'failed to load member details...');
					} else {
						fanikiwa.memberendpoint.memberdetail
								.populateMemberDetails(resp);
						$('#apiResults').html('');
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
fanikiwa.memberendpoint.memberdetail.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.memberendpoint.memberdetail.LoadMemberDetails();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('memberendpoint', 'v1', callback, apiRoot);

};

fanikiwa.memberendpoint.memberdetail.populateMemberDetails = function(resp) {
	$("#txtmemberId").val(resp.result.memberId);
	$("#dtpdateActivated").val(resp.result.dateActivated);
	$("#dtpdateJoined").val(resp.result.dateJoined);
	$("#dtpdateOfBirth").val(resp.result.dateOfBirth);
	$("#txtEmail").val(resp.result.email);
	$("#cbogender").val(resp.result.gender);
	$("#cboinformBy").val(resp.result.informBy);
	$("#txtmaxRecordsToDisplay").val(resp.result.maxRecordsToDisplay);
	$("#txtnationalID").val(resp.result.nationalID);
	$("#txtotherNames").val(resp.result.otherNames);
	$("#txtphoto").val(resp.result.photo);
	$("#txtrefferedBy").val(resp.result.refferedBy);
	$("#txtstatus").val(resp.result.status);
	$("#txtsurname").val(resp.result.surname);
	$("#txttelephone").val(resp.result.telephone);
	$("#cboinvestmentAccount").val(resp.result.investmentAccount);
	$("#cboloanAccount").val(resp.result.loanAccount);
	$("#cbocurrentAccount").val(resp.result.currentAccount);
	$("#cbointerestIncAccount").val(resp.result.interestIncAccount);
	$("#cbointerestExpAccount").val(resp.result.interestExpAccount);
	$("#cbocustomer").val(resp.result.customer);
}
