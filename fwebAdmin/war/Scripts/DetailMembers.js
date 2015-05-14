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

fanikiwa.memberendpoint.memberdetail.initializeControls = function() {
	$('#apiResults').html('loading...');
	var id = sessionStorage.getItem('memberdetailsid');
	gapi.client.memberendpoint
			.getMemberByID({
				'id' : id
			})
			.execute(
					function(resp) {
						console.log(resp);
						if (!resp.code) {
							if (resp.result.result == false) {
								$('#errormessage').html(
										'operation failed! Error...<br/>'
												+ resp.result.resultMessage
														.toString());
								$('#successmessage').html('');
								$('#apiResults').html('');
							} else {
								fanikiwa.memberendpoint.memberdetail
										.populateControls(resp.result.clientToken);
								$('#successmessage').html('');
								$('#errormessage').html('');
								$('#apiResults').html('');
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
										+ reason.result.error.message
												.toString());
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
fanikiwa.memberendpoint.memberdetail.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.memberendpoint.memberdetail.initializeControls();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('memberendpoint', 'v1', callback, apiRoot);

};

fanikiwa.memberendpoint.memberdetail.populateControls = function(member) {

	if (member.memberId != undefined)
		document.getElementById('txtmemberId').value = member.memberId;
	if (member.dateActivated != undefined)
		document.getElementById('dtpdateActivated').value = member.dateActivated;
	if (member.dateJoined != undefined)
		document.getElementById('dtpdateJoined').value = member.dateJoined;
	if (member.dateOfBirth != undefined)
		document.getElementById('dtpdateOfBirth').value = member.dateOfBirth;
	if (member.email != undefined)
		document.getElementById('txtEmail').value = member.email;
	if (member.gender != undefined)
		document.getElementById('cbogender').value = member.gender;
	if (member.informBy != undefined)
		document.getElementById('cboinformBy').value = member.informBy;
	if (member.maxRecordsToDisplay != undefined)
		document.getElementById('txtmaxRecordsToDisplay').value = member.maxRecordsToDisplay;
	if (member.nationalID != undefined)
		document.getElementById('txtnationalID').value = member.nationalID;
	if (member.otherNames != undefined)
		document.getElementById('txtotherNames').value = member.otherNames;
	if (member.photo != undefined)
		document.getElementById('txtphoto').value = member.photo;
	if (member.refferedBy != undefined)
		document.getElementById('txtrefferedBy').value = member.refferedBy;
	if (member.status != undefined)
		document.getElementById('cbostatus').value = member.status;
	if (member.surname != undefined)
		document.getElementById('txtsurname').value = member.surname;
	if (member.telephone != undefined)
		document.getElementById('txttelephone').value = member.telephone;
	if (member.investmentAccount != undefined)
		document.getElementById('cboinvestmentAccount').value = member.investmentAccount;
	if (member.loanAccount != undefined)
		document.getElementById('cboloanAccount').value = member.loanAccount;
	if (member.currentAccount != undefined)
		document.getElementById('cbocurrentAccount').value = member.currentAccount;
	if (member.interestIncAccount != undefined)
		document.getElementById('cbointerestIncAccount').value = member.interestIncAccount;
	if (member.interestExpAccount != undefined)
		document.getElementById('cbointerestExpAccount').value = member.interestExpAccount;
	if (member.customer != undefined)
		document.getElementById('cbocustomer').value = member.customer;

}
