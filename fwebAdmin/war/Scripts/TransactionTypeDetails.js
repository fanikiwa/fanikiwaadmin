/**
 * @fileoverview
 * Provides methods for the Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.transactiontypeendpoint = fanikiwa.transactiontypeendpoint || {};
fanikiwa.transactiontypeendpoint.edittransactiontype = fanikiwa.transactiontypeendpoint.edittransactiontype
		|| {};

var errormsg = '';
errormsg += '<ul id="errorList">';

fanikiwa.transactiontypeendpoint.edittransactiontype = function() {

	errormsg = '';
	ClearException();
	errormsg += '<ul id="errorList">';
	var error_free = true;
	$('#apiResults').html('');

	// Validate the entries
	var _transactiontypeName = document
			.getElementById('txttransactiontypeName').value;
	var _transactiontypeNo = document.getElementById('txttransactiontypeNo').value;
	var _bookBalance = document.getElementById('txtbookBalance').value;
	var _clearedBalance = document.getElementById('txtclearedBalance').value;
	var _customer = document.getElementById('cbocustomer').value;
	var _coadet = document.getElementById('cbocoadet').value;
	var _transactiontypetype = document
			.getElementById('cbotransactiontypetype').value;
	var _limitCheckFlag = document.getElementById('chklimitCheckFlag').value;
	var _limitFlag = document.getElementById('cbolimitFlag').value;
	var _passFlag = document.getElementById('cbopassFlag').value;
	var _accruedInt = document.getElementById('txtaccruedInt').value;
	var _limit = document.getElementById('txtlimit').value;
	var _interestRate = document.getElementById('txtinterestRate').value;
	var _closed = document.getElementById('chkclosed').value;

	if (_transactiontypeName.length == 0) {
		errormsg += '<li>' + " TransactionType Name cannot be null " + '</li>';
		error_free = false;
	}
	if (_customer.length == 0 || _customer == -1) {
		errormsg += '<li>' + " Select Customer " + '</li>';
		error_free = false;
	}
	if (_coadet.length == 0 || _coadet == -1) {
		errormsg += '<li>' + " Select Chart Of TransactionType " + '</li>';
		error_free = false;
	}
	if (_transactiontypetype.length == 0 || _coadet == -1) {
		errormsg += '<li>' + " Select TransactionType Type " + '</li>';
		error_free = false;
	}
	if (_limitFlag.length == 0) {
		errormsg += '<li>' + " Select Limit Flag " + '</li>';
		error_free = false;
	}
	if (_passFlag.length == 0) {
		errormsg += '<li>' + " Select Pass Flag " + '</li>';
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

	$('#apiResults').html('creating offer...');
	$('#successmessage').html('');
	$('#errormessage').html('');

	// Build the Request Object
	var transactiontype = {};
	transactiontype.transactiontypeName = _transactiontypeName;
	transactiontype.transactiontypeNo = _transactiontypeNo;
	transactiontype.bookBalance = _bookBalance;
	transactiontype.clearedBalance = _clearedBalance;
	transactiontype.customer = _customer;
	transactiontype.coadet = _coadet;
	transactiontype.transactiontypetype = _transactiontypetype;
	transactiontype.limitCheckFlag = _limitCheckFlag;
	transactiontype.limitFlag = _limitFlag;
	transactiontype.passFlag = _passFlag;
	transactiontype.accruedInt = _accruedInt;
	transactiontype.limit = _limit;
	transactiontype.interestRate = _interestRate;
	transactiontype.closed = _closed;

	gapi.client.transactiontypeendpoint
			.updateTransactionType(transactiontype)
			.execute(
					function(resp) {
						console.log('response =>> ' + resp);
						if (!resp.code) {
							if (resp.result.result == false) {
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
												'window.location.href = "/Views/TransactionType/List.html";',
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
					});
};

/**
 * Enables the button callbacks in the UI.
 */
fanikiwa.transactiontypeendpoint.edittransactiontype.enableButtons = function() {
	$("#btnUpdate").removeAttr('style');
	$("#btnUpdate").removeAttr('disabled');
	$("#btnUpdate").val('Update');
	var btnUpdate = document.querySelector('#btnUpdate');
	btnUpdate.addEventListener('click', function() {
		fanikiwa.transactiontypeendpoint.edittransactiontype();
	});
	$("#chklimitCheckFlag").attr('checked', false);
	$("#chkclosed").attr('checked', false);
};

/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
fanikiwa.transactiontypeendpoint.edittransactiontype.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.enableButtons();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populatePassFlag();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateLimitFlag();
			fanikiwa.transactiontypeendpoint.edittransactiontype.populateCoa();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateTransactionTypeTypes();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateCustomers();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.initializeControls();
		}
	}

	apisToLoad = 4; // must match number of calls to gapi.client.load()
	gapi.client.load('transactiontypeendpoint', 'v1', null, apiRoot);
	gapi.client.load('coadetendpoint', 'v1', null, apiRoot);
	gapi.client.load('transactiontypetypeendpoint', 'v1', null, apiRoot);
	gapi.client.load('customerendpoint', 'v1', null, apiRoot);

};

fanikiwa.transactiontypeendpoint.edittransactiontype.initializeControls = function() {

	var id = sessionStorage.getItem('edittransactiontypeid');
	gapi.client.transactiontypeendpoint
			.getTransactionType({
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
								fanikiwa.transactiontypeendpoint.edittransactiontype
										.populateControls(resp);
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
}

fanikiwa.transactiontypeendpoint.edittransactiontype.populateControls = function(
		transactiontype) {

	if (transactiontype.transactiontypeName != undefined)
		document.getElementById('txttransactiontypeName').value = transactiontype.transactiontypeName;
	else {
		document.getElementById('txttransactiontypeName').value = "";
	}
	if (transactiontype.transactiontypeNo != undefined)
		document.getElementById('txttransactiontypeNo').value = transactiontype.transactiontypeNo;
	else {
		document.getElementById('txttransactiontypeNo').value = "";
	}
	if (transactiontype.bookBalance != undefined)
		document.getElementById('txtbookBalance').value = transactiontype.bookBalance;
	else {
		document.getElementById('txtbookBalance').value = "";
	}
	if (transactiontype.clearedBalance != undefined)
		document.getElementById('txtclearedBalance').value = transactiontype.clearedBalance;
	else {
		document.getElementById('txtclearedBalance').value = "";
	}
	if (transactiontype.customer != undefined)
		document.getElementById('cbocustomer').value = transactiontype.customer;
	else
		document.getElementById('cbocustomer').value = "";
	if (transactiontype.coadet != undefined)
		document.getElementById('cbocoadet').value = transactiontype.coadet;
	else
		document.getElementById('cbocoadet').value = "";
	if (transactiontype.transactiontypetype != undefined)
		document.getElementById('cbotransactiontypetype').value = transactiontype.transactiontypetype;
	else
		document.getElementById('cbotransactiontypetype').value = "";
	document.getElementById('chklimitCheckFlag').value = transactiontype.limitCheckFlag;
	if (transactiontype.limitFlag != undefined)
		document.getElementById('cbolimitFlag').value = transactiontype.limitFlag;
	else
		document.getElementById('cbolimitFlag').value = "";
	if (transactiontype.passFlag != undefined)
		document.getElementById('cbopassFlag').value = transactiontype.passFlag;
	else
		document.getElementById('cbopassFlag').value = "";
	document.getElementById('txtaccruedInt').value = transactiontype.accruedInt;
	document.getElementById('txtlimit').value = transactiontype.limit;
	document.getElementById('txtinterestRate').value = transactiontype.interestRate;
	document.getElementById('chkclosed').checked = transactiontype.closed;
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populatePassFlag = function() {
	var passflagarray = [ {
		id : "0",
		description : "Ok"
	}, {
		id : "1",
		description : "DebitPostingProhibited"
	}, {
		id : "2",
		description : "CreditPostingProhibited"
	}, {
		id : "3",
		description : "AllPostingProhibited"
	}, {
		id : "4",
		description : "Locked"
	}, {
		id : "-1",
		description : "Unknown"
	} ];
	var passflagoptions = '';
	for (var i = 0; i < passflagarray.length; i++) {
		passflagoptions += '<option value="' + passflagarray[i].id + '">'
				+ passflagarray[i].description + '</option>';
	}
	$("#cbopassFlag").append(passflagoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateLimitFlag = function() {
	var limitFlagarray = [ {
		id : "0",
		description : "Ok"
	}, {
		id : "5",
		description : "PostingNoLimitChecking"
	}, {
		id : "6",
		description : "PostingOverDrawingProhibited"
	}, {
		id : "7",
		description : "PostingDrawingOnUnclearedEffectsAllowed"
	}, {
		id : "8",
		description : "LimitsAllowed"
	}, {
		id : "9",
		description : "LimitForAdvanceProhibited"
	}, {
		id : "10",
		description : "LimitForBlockingProhibited"
	}, {
		id : "11",
		description : "AllLimitsProhibited"
	}, {
		id : "-1",
		description : "Unknown"
	} ];
	var limitFlagoptions = '';
	for (var i = 0; i < limitFlagarray.length; i++) {
		limitFlagoptions += '<option value="' + limitFlagarray[i].id + '">'
				+ limitFlagarray[i].description + '</option>';
	}
	$("#cbolimitFlag").append(limitFlagoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateCoa = function() {
	var coadetoptions = '';
	gapi.client.coadetendpoint.listCoadet().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					resp.items = resp.items || [];
					if (resp.result.items == undefined
							|| resp.result.items == null) {

					} else {
						for (var i = 0; i < resp.length; i++) {
							coadetoptions += '<option value="'
									+ resp.result.items[i].id + '">'
									+ resp.result.items[i].description
									+ '</option>';
						}
						$("#cbocoadet").append(coadetoptions);
					}
				}

			}, function(reason) {
				console.log('Error: ' + reason.result.error.message);
			});
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateTransactionTypeTypes = function() {
	var transactiontypetypesoptions = '';
	gapi.client.transactiontypetypeendpoint.listTransactionTypeType().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					resp.items = resp.items || [];
					if (resp.result.items == undefined
							|| resp.result.items == null) {

					} else {
						for (var i = 0; i < resp.length; i++) {
							transactiontypetypesoptions += '<option value="'
									+ resp.result.items[i].id + '">'
									+ resp.result.items[i].description
									+ '</option>';
						}
						$("#cbotransactiontypetype").append(
								transactiontypetypesoptions);
					}
				}

			}, function(reason) {
				console.log('Error: ' + reason.result.error.message);
			});
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateCustomers = function() {
	var customeroptions = '';
	gapi.client.customerendpoint.listCustomer().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					resp.items = resp.items || [];
					if (resp.result.items == undefined
							|| resp.result.items == null) {

					} else {
						for (var i = 0; i < resp.length; i++) {
							customeroptions += '<option value="'
									+ resp.result.items[i].id + '">'
									+ resp.result.items[i].description
									+ '</option>';
						}
						$("#cbocustomer").append(customeroptions);
					}
				}

			}, function(reason) {
				console.log('Error: ' + reason.result.error.message);
			});
};

function Clear() {
	$("#txttransactiontypeName").val("");
	$("#txttransactiontypeNo").val("");
	$("#txtbookBalance").val("");
	$("#txtclearedBalance").val("");
	$("#cbocustomer").val("-1");
	$("#cbocoadet").val("-1");
	$("#cbotransactiontypetype").val("-1");
	$('#chklimitCheckFlag').attr('checked', false);
	$("#cbolimitFlag").val("0");
	$("#cbopassFlag").val("0");
	$("#txtaccruedInt").val("");
	$("#txtlimit").val("");
	$("#txtinterestRate").val("");
	$('#chkclosed').attr('checked', false);
}

function DisplayException(errormsg) {

	errormsg += "</ul>";

	$("#error-display-div").html(errormsg);
	$("#error-display-div").removeClass('displaynone');
	$("#error-display-div").addClass('displayblock');
	$("#error-display-div").show();
}

function ClearException() {
	$('#errorList').remove();
	$('#error-display-div').empty();
}