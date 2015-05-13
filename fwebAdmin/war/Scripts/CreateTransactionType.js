/**
 * @fileoverview
 * Provides methods for the Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.transactiontypeendpoint = fanikiwa.transactiontypeendpoint || {};
fanikiwa.transactiontypeendpoint.createtransactiontype = fanikiwa.transactiontypeendpoint.createtransactiontype
		|| {};

var errormsg = '';
errormsg += '<ul id="errorList">';

fanikiwa.transactiontypeendpoint.createtransactiontype = function() {

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
			.insertTransactionType(transactiontype)
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
fanikiwa.transactiontypeendpoint.createtransactiontype.enableButtons = function() {
	$("#btnCreate").removeAttr('style');
	$("#btnCreate").removeAttr('disabled');
	$("#btnCreate").val('Update');
	var btnCreate = document.querySelector('#btnCreate');
	btnCreate.addEventListener('click', function() {
		fanikiwa.transactiontypeendpoint.createtransactiontype();
	});
};

/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
fanikiwa.transactiontypeendpoint.createtransactiontype.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			fanikiwa.transactiontypeendpoint.createtransactiontype
					.enableButtons();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	gapi.client.load('transactiontypeendpoint', 'v1', callback, apiRoot);

};

function ClearException() {
	$('#errorList').remove();
	$('#error-display-div').empty();
}