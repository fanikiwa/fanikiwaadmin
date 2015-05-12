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
	var _transactionTypeID = document.getElementById('txttransactionTypeID').value;
	var _absolute = document.getElementById('chkabsolute').value;
	var _amountExpression = document.getElementById('txtamountExpression').value;
	var _canSuspend = document.getElementById('chkcanSuspend').value;
	var _chargeCommission = document.getElementById('chkchargeCommission').value;
	var _chargeCommissionToTransaction = document
			.getElementById('chkchargeCommissionToTransaction').value;
	var _chargeWho = document.getElementById('cbochargeWho').value;
	var _commComputationMethod = document
			.getElementById('cbocommComputationMethod').value;
	var _commissionAmount = document.getElementById('txtcommissionAmount').value;
	var _commissionAmountExpression = document
			.getElementById('txtcommissionAmountExpression').value;
	var _commissionContraNarrative = document
			.getElementById('txtcommissionContraNarrative').value;
	var _commissionCrAccount = document
			.getElementById('cbocommissionCrAccount').value;
	var _commissionDrAccount = document
			.getElementById('cbocommissionDrAccount').value;
	var _commissionDrAnotherAccount = document
			.getElementById('cbocommissionDrAnotherAccount').value;
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
			.getElementById('cbodefaultContraAccount').value;
	var _defaultContraNarrative = document
			.getElementById('txtdefaultContraNarrative').value;
	var _defaultMainAccount = document.getElementById('cbodefaultMainAccount').value;
	var _defaultMainNarrative = document
			.getElementById('txtdefaultMainNarrative').value;
	var _description = document.getElementById('txtdescription').value;
	var _dialogFlag = document.getElementById('cbodialogFlag').value;
	var _drCommCalcMethod = document.getElementById('cbodrCommCalcMethod').value;
	var _forcePost = document.getElementById('chkforcePost').value;
	var _narrativeFlag = document.getElementById('cbonarrativeFlag').value;
	var _shortCode = document.getElementById('txtshortCode').value;
	var _statFlag = document.getElementById('cbostatFlag').value;
	var _suspenseCrAccount = document.getElementById('cbosuspenseCrAccount').value;
	var _suspenseDrAccount = document.getElementById('cbosuspenseDrAccount').value;
	var _tieredTableId = document.getElementById('cbotieredTableId').value;
	var _txnClass = document.getElementById('cbotxnClass').value;
	var _txnTypeView = document.getElementById('cbotxnTypeView').value;
	var _valueDateOffset = document.getElementById('txtvalueDateOffset').value;

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
					.initializeControls();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('transactiontypeendpoint', 'v1', null, apiRoot);

};

fanikiwa.transactiontypeendpoint.edittransactiontype.initializeControls = function() {

	var id = sessionStorage.getItem('edittransactiontypeid');
	gapi.client.transactiontypeendpoint
			.retrieveTransactionType({
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
	document.getElementById('txttransactionTypeID').value = transactiontype.transactionTypeID;
	document.getElementById('chkabsolute').checked = transactiontype.absolute;
	document.getElementById('txtamountExpression').value = transactiontype.amountExpression;
	document.getElementById('chkcanSuspend').checked = transactiontype.canSuspend;
	document.getElementById('chkchargeCommission').checked = transactiontype.chargeCommission;
	document.getElementById('chkchargeCommissionToTransaction').checked = transactiontype.chargeCommissionToTransaction;
	document.getElementById('cbochargeWho').value = transactiontype.chargeWho;
	document.getElementById('cbocommComputationMethod').value = transactiontype.commComputationMethod;
	document.getElementById('txtcommissionAmount').value = transactiontype.commissionAmount;
	document.getElementById('txtcommissionAmountExpression').value = transactiontype.commissionAmountExpression;
	document.getElementById('txtcommissionContraNarrative').value = transactiontype.commissionContraNarrative;
	document.getElementById('cbocommissionCrAccount').value = transactiontype.commissionCrAccount;
	document.getElementById('cbocommissionDrAccount').value = transactiontype.commissionDrAccount;
	document.getElementById('cbocommissionDrAnotherAccount').value = transactiontype.commissionDrAnotherAccount;
	document.getElementById('txtcommissionMainNarrative').value = transactiontype.commissionMainNarrative;
	document.getElementById('cbocommissionNarrativeFlag').value = transactiontype.commissionNarrativeFlag;
	document.getElementById('cbocommissionTransactionType').value = transactiontype.commissionTransactionType;
	document.getElementById('cbocrCommCalcMethod').value = transactiontype.crCommCalcMethod;
	document.getElementById('cbodebitCredit').value = transactiontype.debitCredit;
	document.getElementById('txtdefaultAmount').value = transactiontype.defaultAmount;
	document.getElementById('cbodefaultContraAccount').value = transactiontype.defaultContraAccount;
	document.getElementById('txtdefaultContraNarrative').value = transactiontype.defaultContraNarrative;
	document.getElementById('cbodefaultMainAccount').value = transactiontype.defaultMainAccount;
	document.getElementById('txtdefaultMainNarrative').value = transactiontype.defaultMainNarrative;
	document.getElementById('txtdescription').value = transactiontype.description;
	document.getElementById('cbodialogFlag').value = transactiontype.dialogFlag;
	document.getElementById('cbodrCommCalcMethod').value = transactiontype.drCommCalcMethod;
	document.getElementById('chkforcePost').checked = transactiontype.forcePost;
	document.getElementById('cbonarrativeFlag').value = transactiontype.narrativeFlag;
	document.getElementById('txtshortCode').value = transactiontype.shortCode;
	document.getElementById('cbostatFlag').value = transactiontype.statFlag;
	document.getElementById('cbosuspenseCrAccount').value = transactiontype.suspenseCrAccount;
	document.getElementById('cbosuspenseDrAccount').value = transactiontype.suspenseDrAccount;
	document.getElementById('cbotieredTableId').value = transactiontype.tieredTableId;
	document.getElementById('cbotxnClass').value = transactiontype.txnClass;
	document.getElementById('cbotxnTypeView').value = transactiontype.txnTypeView;
	document.getElementById('txtvalueDateOffset').value = transactiontype.valueDateOffset;

};

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