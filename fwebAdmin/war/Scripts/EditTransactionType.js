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
	var _transactionTypeID = sessionStorage.getItem('edittransactiontypeid');
	var _absolute = document.getElementById('chkabsolute').checked;
	var _amountExpression = document.getElementById('txtamountExpression').value;
	var _canSuspend = document.getElementById('chkcanSuspend').checked;
	var _chargeCommission = document.getElementById('chkchargeCommission').checked;
	var _chargeCommissionToTransaction = document
			.getElementById('chkchargeCommissionToTransaction').checked;
	var _chargeWho = document.getElementById('cbochargeWho').value;
	var _commComputationMethod = document
			.getElementById('cbocommComputationMethod').value;
	var _commissionAmount = document.getElementById('txtcommissionAmount').value;
	var _commissionAmountExpression = document
			.getElementById('txtcommissionAmountExpression').value;
	var _commissionContraNarrative = document
			.getElementById('txtcommissionContraNarrative').value;
	var _commissionCrAccount = document
			.getElementById('txtcommissionCrAccount').value;
	var _commissionDrAccount = document
			.getElementById('txtcommissionDrAccount').value;
	var _commissionDrAnotherAccount = document
			.getElementById('chkcommissionDrAnotherAccount').checked;
	var _commissionMainNarrative = document
			.getElementById('txtcommissionMainNarrative').value;
	var _commissionNarrativeFlag = document
			.getElementById('cbocommissionNarrativeFlag').value;
	var _commissionTransactionType = document
			.getElementById('cbocommissionTransactionType').value;
	var _crCommCalcMethod = document.getElementById('cbocrCommCalcMethod').value;
	var _debitCredit = document.getElementById('cbodebitCredit').value;
	var _defaultAmount = document.getElementById('txtdefaultAmount').value;
	var _defaultContraAccount = document
			.getElementById('txtdefaultContraAccount').value;
	var _defaultContraNarrative = document
			.getElementById('txtdefaultContraNarrative').value;
	var _defaultMainAccount = document.getElementById('txtdefaultMainAccount').value;
	var _defaultMainNarrative = document
			.getElementById('txtdefaultMainNarrative').value;
	var _description = document.getElementById('txtdescription').value;
	var _dialogFlag = document.getElementById('cbodialogFlag').value;
	var _drCommCalcMethod = document.getElementById('cbodrCommCalcMethod').value;
	var _forcePost = document.getElementById('chkforcePost').checked;
	var _narrativeFlag = document.getElementById('cbonarrativeFlag').value;
	var _shortCode = document.getElementById('txtshortCode').value;
	var _statFlag = document.getElementById('chkstatFlag').checked;
	var _suspenseCrAccount = document.getElementById('txtsuspenseCrAccount').value;
	var _suspenseDrAccount = document.getElementById('txtsuspenseDrAccount').value;
	var _tieredTableId = document.getElementById('cbotieredTableId').value;
	var _txnClass = document.getElementById('cbotxnClass').value;
	var _txnTypeView = document.getElementById('cbotxnTypeView').value;
	var _valueDateOffset = document.getElementById('txtvalueDateOffset').value;

	if (_shortCode.length == 0) {
		errormsg += '<li>' + " Short Code cannot be null " + '</li>';
		error_free = false;
	}
	if (_description.length == 0) {
		errormsg += '<li>' + " Description cannot be null " + '</li>';
		error_free = false;
	}
	if (_debitCredit.length == 0 || _debitCredit == -1) {
		errormsg += '<li>' + " Select DebitCredit " + '</li>';
		error_free = false;
	}
	if (_tieredTableId.length == 0 || _tieredTableId == -1) {
		errormsg += '<li>' + " Select Tiered Table " + '</li>';
		error_free = false;
	}
	if (_chargeWho.length == 0 || _chargeWho == -1) {
		errormsg += '<li>' + " Select Charge Who " + '</li>';
		error_free = false;
	}
	if (_valueDateOffset.length != 0 && _valueDateOffset < 0) {
		errormsg += '<li>' + " value Date Offset must be a positive number "
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

	$('#apiResults').html('updating transactiontype...');
	$('#successmessage').html('');
	$('#errormessage').html('');

	// Build the Request Object
	var transactiontype = {};
	transactiontype.transactionTypeID = _transactionTypeID;
	transactiontype.absolute = _absolute;
	transactiontype.amountExpression = _amountExpression;
	transactiontype.canSuspend = _canSuspend;
	transactiontype.chargeCommission = _chargeCommission;
	transactiontype.chargeCommissionToTransaction = _chargeCommissionToTransaction;
	transactiontype.chargeWho = _chargeWho;
	transactiontype.commComputationMethod = _commComputationMethod;
	transactiontype.commissionAmount = _commissionAmount;
	transactiontype.commissionAmountExpression = _commissionAmountExpression;
	transactiontype.commissionContraNarrative = _commissionContraNarrative;
	transactiontype.commissionCrAccount = _commissionCrAccount;
	transactiontype.commissionDrAccount = _commissionDrAccount;
	transactiontype.commissionDrAnotherAccount = _commissionDrAnotherAccount;
	transactiontype.commissionMainNarrative = _commissionMainNarrative;
	transactiontype.commissionNarrativeFlag = _commissionNarrativeFlag;
	transactiontype.commissionTransactionType = _commissionTransactionType;
	transactiontype.crCommCalcMethod = _crCommCalcMethod;
	transactiontype.debitCredit = _debitCredit;
	transactiontype.defaultAmount = _defaultAmount;
	transactiontype.defaultContraAccount = _defaultContraAccount;
	transactiontype.defaultContraNarrative = _defaultContraNarrative;
	transactiontype.defaultMainAccount = _defaultMainAccount;
	transactiontype.defaultMainNarrative = _defaultMainNarrative;
	transactiontype.description = _description;
	transactiontype.dialogFlag = _dialogFlag;
	transactiontype.drCommCalcMethod = _drCommCalcMethod;
	transactiontype.forcePost = _forcePost;
	transactiontype.narrativeFlag = _narrativeFlag;
	transactiontype.shortCode = _shortCode;
	transactiontype.statFlag = _statFlag;
	transactiontype.suspenseCrAccount = _suspenseCrAccount;
	transactiontype.suspenseDrAccount = _suspenseDrAccount;
	transactiontype.tieredTableId = _tieredTableId;
	transactiontype.txnClass = _txnClass;
	transactiontype.txnTypeView = _txnTypeView;
	transactiontype.valueDateOffset = _valueDateOffset;

	gapi.client.transactiontypeendpoint
			.updateTransactionType(transactiontype)
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
												'window.location.href = "/Views/TransactionType/List.html";',
												1000);
							}
						} else {
							console.log('Error: ' + resp.error.message);
							$('#errormessage').html(
									'operation failed! Error...<br/>'
											+ resp.error.message);
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

	document.getElementById('txtamountExpression').value = 0;
	document.getElementById('txtvalueDateOffset').value = 0;
	document.getElementById('txtcommissionAmountExpression').value = 0;
	document.getElementById('txtcommissionAmount').value = 0;
	document.getElementById('txtdefaultAmount').value = 0;

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
					.populateDebitCredit();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateTieredTables();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateTransactionTypeViews();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateTransactionClass();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateDialogFlags();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateNarrativeFlags();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateChargeWho();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateCommissionNarrativeFlag();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateCommissionComputationMethod();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateDebitCommissionCalculationMethod();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateCreditCommissionCalculationMethod();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.populateCommissionTransactionTypes();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.enableButtons();
			fanikiwa.transactiontypeendpoint.edittransactiontype
					.initializeControls();
		}
	}

	apisToLoad = 3; // must match number of calls to gapi.client.load()
	gapi.client.load('transactiontypeendpoint', 'v1', callback, apiRoot);
	gapi.client.load('accountendpoint', 'v1', callback, apiRoot);
	gapi.client.load('tieredtableendpoint', 'v1', callback, apiRoot);

};

fanikiwa.transactiontypeendpoint.edittransactiontype.initializeControls = function() {
	$('#apiResults').html('loading...');
	var id = sessionStorage.getItem('edittransactiontypeid');
	gapi.client.transactiontypeendpoint
			.retrieveTransactionType({
				'id' : id
			})
			.execute(
					function(resp) {
						console.log(resp);
						if (!resp.code) {
							if (resp.result.success == false) {
								$('#errormessage').html(
										'operation failed! Error...<br/>'
												+ resp.result.resultMessage
														.toString());
								$('#successmessage').html('');
								$('#apiResults').html('');
							} else {
								fanikiwa.transactiontypeendpoint.edittransactiontype
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
}

fanikiwa.transactiontypeendpoint.edittransactiontype.populateControls = function(
		transactiontype) {

	if (transactiontype.transactionTypeID != undefined)
		document.getElementById('txttransactionTypeID').value = transactiontype.transactionTypeID;
	if (transactiontype.absolute != undefined)
		document.getElementById('chkabsolute').checked = transactiontype.absolute;
	if (transactiontype.amountExpression != undefined)
		document.getElementById('txtamountExpression').value = transactiontype.amountExpression;
	if (transactiontype.canSuspend != undefined)
		document.getElementById('chkcanSuspend').checked = transactiontype.canSuspend;
	if (transactiontype.chargeCommissionToTransaction != undefined)
		document.getElementById('chkchargeCommission').checked = transactiontype.chargeCommission;
	if (transactiontype.chargeCommissionToTransaction != undefined)
		document.getElementById('chkchargeCommissionToTransaction').checked = transactiontype.chargeCommissionToTransaction;
	if (transactiontype.chargeWho != undefined)
		document.getElementById('cbochargeWho').value = transactiontype.chargeWho;
	if (transactiontype.commComputationMethod != undefined)
		document.getElementById('cbocommComputationMethod').value = transactiontype.commComputationMethod;
	if (transactiontype.commissionAmount != undefined)
		document.getElementById('txtcommissionAmount').value = transactiontype.commissionAmount;
	if (transactiontype.commissionAmountExpression != undefined)
		document.getElementById('txtcommissionAmountExpression').value = transactiontype.commissionAmountExpression;
	if (transactiontype.commissionContraNarrative != undefined)
		document.getElementById('txtcommissionContraNarrative').value = transactiontype.commissionContraNarrative;
	if (transactiontype.commissionCrAccount != undefined)
		document.getElementById('txtcommissionCrAccount').value = transactiontype.commissionCrAccount;
	if (transactiontype.commissionDrAccount != undefined)
		document.getElementById('txtcommissionDrAccount').value = transactiontype.commissionDrAccount;
	if (transactiontype.commissionDrAnotherAccount != undefined)
		document.getElementById('chkcommissionDrAnotherAccount').checked = transactiontype.commissionDrAnotherAccount;
	if (transactiontype.commissionMainNarrative != undefined)
		document.getElementById('txtcommissionMainNarrative').value = transactiontype.commissionMainNarrative;
	if (transactiontype.commissionNarrativeFlag != undefined)
		document.getElementById('cbocommissionNarrativeFlag').value = transactiontype.commissionNarrativeFlag;
	if (transactiontype.commissionTransactionType != undefined)
		document.getElementById('cbocommissionTransactionType').value = transactiontype.commissionTransactionType;
	if (transactiontype.crCommCalcMethod != undefined)
		document.getElementById('cbocrCommCalcMethod').value = transactiontype.crCommCalcMethod;
	if (transactiontype.debitCredit != undefined)
		document.getElementById('cbodebitCredit').value = transactiontype.debitCredit;
	if (transactiontype.defaultAmount != undefined)
		document.getElementById('txtdefaultAmount').value = transactiontype.defaultAmount;
	if (transactiontype.defaultContraAccount != undefined)
		document.getElementById('txtdefaultContraAccount').value = transactiontype.defaultContraAccount;
	if (transactiontype.defaultContraNarrative != undefined)
		document.getElementById('txtdefaultContraNarrative').value = transactiontype.defaultContraNarrative;
	if (transactiontype.defaultMainAccount != undefined)
		document.getElementById('txtdefaultMainAccount').value = transactiontype.defaultMainAccount;
	if (transactiontype.defaultMainNarrative != undefined)
		document.getElementById('txtdefaultMainNarrative').value = transactiontype.defaultMainNarrative;
	if (transactiontype.description != undefined)
		document.getElementById('txtdescription').value = transactiontype.description;
	if (transactiontype.dialogFlag != undefined)
		document.getElementById('cbodialogFlag').value = transactiontype.dialogFlag;
	if (transactiontype.drCommCalcMethod != undefined)
		document.getElementById('cbodrCommCalcMethod').value = transactiontype.drCommCalcMethod;
	if (transactiontype.forcePost != undefined)
		document.getElementById('chkforcePost').checked = transactiontype.forcePost;
	if (transactiontype.narrativeFlag != undefined)
		document.getElementById('cbonarrativeFlag').value = transactiontype.narrativeFlag;
	if (transactiontype.shortCode != undefined)
		document.getElementById('txtshortCode').value = transactiontype.shortCode;
	if (transactiontype.statFlag != undefined)
		document.getElementById('chkstatFlag').checked = transactiontype.statFlag;
	if (transactiontype.suspenseCrAccount != undefined)
		document.getElementById('txtsuspenseCrAccount').value = transactiontype.suspenseCrAccount;
	if (transactiontype.suspenseDrAccount != undefined)
		document.getElementById('txtsuspenseDrAccount').value = transactiontype.suspenseDrAccount;
	if (transactiontype.tieredTableId != undefined)
		document.getElementById('cbotieredTableId').value = transactiontype.tieredTableId;
	if (transactiontype.txnClass != undefined)
		document.getElementById('cbotxnClass').value = transactiontype.txnClass;
	if (transactiontype.txnTypeView != undefined)
		document.getElementById('cbotxnTypeView').value = transactiontype.txnTypeView;
	if (transactiontype.valueDateOffset != undefined)
		document.getElementById('txtvalueDateOffset').value = transactiontype.valueDateOffset;

};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateDebitCredit = function() {
	var debitCreditarray = [ {
		id : "D",
		description : "Debit"
	}, {
		id : "C",
		description : "Credit"
	} ];
	var debitCreditoptions = '';
	for (var i = 0; i < debitCreditarray.length; i++) {
		debitCreditoptions += '<option value="' + debitCreditarray[i].id + '">'
				+ debitCreditarray[i].description + '</option>';
	}
	$("#cbodebitCredit").append(debitCreditoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateTieredTables = function() {
	var tieredTableoptions = '';
	gapi.client.tieredtableendpoint.listTieredtable().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					resp.items = resp.items || [];
					if (resp.result.items == undefined
							|| resp.result.items == null) {

					} else {
						for (var i = 0; i < resp.result.items.length; i++) {
							tieredTableoptions += '<option value="'
									+ resp.result.items[i].id + '">'
									+ resp.result.items[i].description
									+ '</option>';
						}
						$("#cbotieredTableId").append(tieredTableoptions);
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

fanikiwa.transactiontypeendpoint.edittransactiontype.populateTransactionTypeViews = function() {
	var txnTypeViewarray = [ {
		id : "0",
		description : "Single Entry View"
	}, {
		id : "1",
		description : "Double Entry View"
	}, {
		id : "2",
		description : "Multi Entry View"
	} ];
	var txnTypeViewoptions = '';
	for (var i = 0; i < txnTypeViewarray.length; i++) {
		txnTypeViewoptions += '<option value="' + txnTypeViewarray[i].id + '">'
				+ txnTypeViewarray[i].description + '</option>';
	}
	$("#cbotxnTypeView").append(txnTypeViewoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateTransactionClass = function() {
	var txnClassarray = [];
	var txnClassoptions = '';
	for (var i = 0; i < txnClassarray.length; i++) {
		txnClassoptions += '<option value="' + txnClassarray[i].id + '">'
				+ txnClassarray[i].description + '</option>';
	}
	$("#cbotxnClass").append(txnClassoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateDialogFlags = function() {
	var dialogFlagarray = [
			{
				id : "0",
				description : "Transaction can be used both in background(System) or Dialog(user)"
			}, {
				id : "1",
				description : "Dialog only"
			}, {
				id : "2",
				description : "System only"
			} ];
	var dialogFlagoptions = '';
	for (var i = 0; i < dialogFlagarray.length; i++) {
		dialogFlagoptions += '<option value="' + dialogFlagarray[i].id + '">'
				+ dialogFlagarray[i].description + '</option>';
	}
	$("#cbodialogFlag").append(dialogFlagoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateNarrativeFlags = function() {
	var narrativeFlagarray = [];
	var narrativeFlagoptions = '';
	for (var i = 0; i < narrativeFlagarray.length; i++) {
		narrativeFlagoptions += '<option value="' + narrativeFlagarray[i].id
				+ '">' + narrativeFlagarray[i].description + '</option>';
	}
	$("#cbonarrativeFlag").append(narrativeFlagoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateChargeWho = function() {
	var chargeWhoarray = [ {
		id : "D",
		description : "Debit"
	}, {
		id : "C",
		description : "Credit"
	} ];
	var chargeWhooptions = '';
	for (var i = 0; i < chargeWhoarray.length; i++) {
		chargeWhooptions += '<option value="' + chargeWhoarray[i].id + '">'
				+ chargeWhoarray[i].description + '</option>';
	}
	$("#cbochargeWho").append(chargeWhooptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateCommissionNarrativeFlag = function() {
	var commissionNarrativeFlagarray = [];
	var commissionNarrativeFlagoptions = '';
	for (var i = 0; i < commissionNarrativeFlagarray.length; i++) {
		commissionNarrativeFlagoptions += '<option value="'
				+ commissionNarrativeFlagarray[i].id + '">'
				+ commissionNarrativeFlagarray[i].description + '</option>';
	}
	$("#cbocommissionNarrativeFlag").append(commissionNarrativeFlagoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateCommissionComputationMethod = function() {
	var commissionComputationMethodarray = [ {
		id : "L",
		description : "Lookup commission from a table"
	}, {
		id : "T",
		description : "Compute tiered value from a Tieredtable"
	}, {
		id : "F",
		description : "Flate rate"
	} ];
	var commissionComputationMethodoptions = '';
	for (var i = 0; i < commissionComputationMethodarray.length; i++) {
		commissionComputationMethodoptions += '<option value="'
				+ commissionComputationMethodarray[i].id + '">'
				+ commissionComputationMethodarray[i].description + '</option>';
	}
	$("#cbocommComputationMethod").append(commissionComputationMethodoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateDebitCommissionCalculationMethod = function() {
	var commissionCalculationMethodarray = [];
	var commissionCalculationMethodoptions = '';
	for (var i = 0; i < commissionCalculationMethodarray.length; i++) {
		commissionCalculationMethodoptions += '<option value="'
				+ commissionCalculationMethodarray[i].id + '">'
				+ commissionCalculationMethodarray[i].description + '</option>';
	}
	$("#cbodrCommCalcMethod").append(commissionCalculationMethodoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateCreditCommissionCalculationMethod = function() {
	var commissionCalculationMethodarray = [];
	var commissionCalculationMethodoptions = '';
	for (var i = 0; i < commissionCalculationMethodarray.length; i++) {
		commissionCalculationMethodoptions += '<option value="'
				+ commissionCalculationMethodarray[i].id + '">'
				+ commissionCalculationMethodarray[i].description + '</option>';
	}
	$("#cbocrCommCalcMethod").append(commissionCalculationMethodoptions);
};

fanikiwa.transactiontypeendpoint.edittransactiontype.populateCommissionTransactionTypes = function() {
	var transactiontypeoptions = '';
	gapi.client.transactiontypeendpoint.listTransactionType().execute(
			function(resp) {
				console.log('response =>> ' + resp);
				if (!resp.code) {
					resp.items = resp.items || [];
					if (resp.result.items == undefined
							|| resp.result.items == null) {

					} else {
						for (var i = 0; i < resp.result.items.length; i++) {
							transactiontypeoptions += '<option value="'
									+ resp.result.items[i].transactionTypeID
									+ '">' + resp.result.items[i].description
									+ '</option>';
						}
						$("#cbocommissionTransactionType").append(
								transactiontypeoptions);
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

function ClearException() {
	$('#errorList').remove();
	$('#error-display-div').empty();
}

function CreateSubMenu() {
	var SubMenu = [];
	SubMenu.push('<div class="nav"><ul class="menu">');
	SubMenu
			.push('<li><div class="floatleft"><div><a href="/Views/TransactionType/Create.html" style="cursor: pointer;" >Create</a></div></div></li>');
	SubMenu.push('</ul></div>');

	$("#SubMenu").html(SubMenu.join(" "));
}

$(document).ready(function() {
	CreateSubMenu();
});
