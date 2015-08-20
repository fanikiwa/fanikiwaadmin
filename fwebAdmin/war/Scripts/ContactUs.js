/**
 * @fileoverview
 * Provides methods for the Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.contactendpoint = fanikiwa.contactendpoint || {};
fanikiwa.contactendpoint.createcontact = fanikiwa.contactendpoint.createcontact || {};

var errormsg = '';
errormsg += '<ul id="errorList">';

fanikiwa.contactendpoint.createcontact = function() {

	errormsg = '';
	ClearException();
	errormsg += '<ul id="errorList">';
	var error_free = true;
	$('#apiResults').html('');

	// Validate the entries
	var _Description = document.getElementById('txtDescription').value;
	var _Amount = document.getElementById('txtAmount').value;
	var _Interest = document.getElementById('txtInterest').value;
	var _Term = document.getElementById('cboTerm').value;
	var _ContactType = document.getElementById('cboContactType').value;
	var _privateContact = Boolean(document.getElementById('chkprivateContact').checked);
	var _PartialPay = Boolean(document.getElementById('chkPartialPay').checked);
	var _contactees = document.getElementById('txtcontactees').value;

	if (_Description.length == 0) {
		errormsg += '<li>' + " Description cannot be null " + '</li>';
		error_free = false;
	}
	if (_Amount.length == 0) {
		errormsg += '<li>' + " Amount cannot be null " + '</li>';
		error_free = false;
	}
	if (_Amount < 0) {
		errormsg += '<li>' + " Amount cannot be negative " + '</li>';
		error_free = false;
	}
	if (_Interest.length == 0) {
		errormsg += '<li>' + " Interest Rate(%) cannot be null " + '</li>';
		error_free = false;
	}
	if (_Interest < 0) {
		errormsg += '<li>' + " Interest cannot be negative " + '</li>';
		error_free = false;
	}
	if (_Term.length == 0) {
		errormsg += '<li>' + " Select Term " + '</li>';
		error_free = false;
	} 
	if (_privateContact == true && _contactees.length == 0) {
		errormsg += '<li>' + " Contactees cannot be null for a private contact"
				+ '</li>';
		error_free = false;
	}

	if (!error_free) {
		errormsg += "</ul>";
		$("#error-display-div").html(errormsg);
		$("#error-display-div").removeClass('displaynone');
		$("#error-display-div").addClass('displayblock');
		$("#error-display-div").show();
		return;
	} else {
		ClearException();
	}

	$('#apiResults').html('creating contact...');
	$('#successmessage').html('');
	$('#errormessage').html('');

	var email = JSON.parse(sessionStorage.getItem('loggedinuser')).userId;

	// Build the Request Object
	var contact = {};
	contact.description = _Description;
	contact.amount = _Amount;
	contact.interest = _Interest;
	contact.term = _Term; 
	contact.status = "Open";
	contact.email = email;
	contact.contactees = _contactees;

	gapi.client.contactendpoint
			.insertContact(contact)
			.execute(
					function(resp) {
						console.log('response =>> ' + resp);
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
												'window.location.href = "/Views/Home/Index.html";',
												1000);
							}
						} else {
							$('#errormessage').html(
									'operation failed! Please try again.');
							$('#successmessage').html('');
							$('#apiResults').html('');
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
 * Enables the button callbacks in the UI.
 */
fanikiwa.contactendpoint.createcontact.enableButtons = function() {
	$("#btnSubmit").removeAttr('style');
	$("#btnSubmit").removeAttr('disabled');
	$("#btnSubmit").val('Create');
	var btnSubmit = document.querySelector('#btnSubmit');
	btnSubmit.addEventListener('click', function() {
		fanikiwa.contactendpoint.createcontact();
	}); 
};

/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
fanikiwa.contactendpoint.createcontact.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) { 
			fanikiwa.contactendpoint.createcontact.enableButtons();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('contactendpoint', 'v1', callback, apiRoot);

};
 
function ClearException() {
	$('#errorList').remove();
	$('#error-display-div').empty();
}
 
function CreateSubMenu() {
	var SubMenu = [];
	SubMenu.push('<div class="nav"><ul class="menu">');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Home/Index.html" style="cursor: pointer;">Home</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Home/Help.html" style="cursor: pointer;">Help</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Home/ContactUs.html" style="cursor: pointer;">Contact Us</a></div></div></li>');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/Home/About.html" style="cursor: pointer;">About</a></div></div></li>');
	SubMenu.push('</ul></div>');

	$("#SubMenu").html(SubMenu.join(" "));
}

$(document).ready(function() {
	CreateSubMenu();
});
