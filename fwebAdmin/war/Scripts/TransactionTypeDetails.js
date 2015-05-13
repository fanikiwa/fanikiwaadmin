/**
 * @fileoverview
 * Provides methods for the Endpoints UI and interaction with the
 * Endpoints API.
 */

/** global namespace for projects. */
var fanikiwa = fanikiwa || {};
fanikiwa.transactiontypeendpoint = fanikiwa.transactiontypeendpoint || {};
fanikiwa.transactiontypeendpoint.transactiontypedetails = fanikiwa.transactiontypeendpoint.transactiontypedetails
		|| {};

fanikiwa.transactiontypeendpoint.transactiontypedetails.initializeControls = function() {

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
								console
										.log('calling fanikiwa.transactiontypeendpoint.transactiontypedetails.populateControls(resp.result.clientToken)');
								fanikiwa.transactiontypeendpoint.transactiontypedetails
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

fanikiwa.transactiontypeendpoint.transactiontypedetails.populateControls = function(
		transactiontype) {
	if (transactiontype.transactionTypeID != undefined)
		document.getElementById('txttransactionTypeID').value = transactiontype.transactionTypeID;
	else {
		document.getElementById('txttransactionTypeID').value = "";
	}
	if (transactiontype.absolute != undefined)
		document.getElementById('chkabsolute').checked = transactiontype.absolute;
	else {
		document.getElementById('chkabsolute').checked = false;
	}
	if (transactiontype.amountExpression != undefined)
		document.getElementById('txtamountExpression').value = transactiontype.amountExpression;
	else {
		document.getElementById('txtamountExpression').value = "";
	}
	if (transactiontype.canSuspend != undefined)
		document.getElementById('chkcanSuspend').checked = transactiontype.canSuspend;
	else {
		document.getElementById('chkcanSuspend').checked = false;
	}
	if (transactiontype.chargeCommissionToTransaction != undefined)
		document.getElementById('chkchargeCommission').checked = transactiontype.chargeCommission;
	else {
		document.getElementById('chkchargeCommission').checked = false;
	}
	if (transactiontype.chargeCommissionToTransaction != undefined)
		document.getElementById('chkchargeCommissionToTransaction').checked = transactiontype.chargeCommissionToTransaction;
	else {
		document.getElementById('chkchargeCommissionToTransaction').checked = false;
	}
	if (transactiontype.chargeWho != undefined)
		document.getElementById('cbochargeWho').value = transactiontype.chargeWho;
	else {
		document.getElementById('cbochargeWho').value = "";
	}
	if (transactiontype.commComputationMethod != undefined)
		document.getElementById('cbocommComputationMethod').value = transactiontype.commComputationMethod;
	else {
		document.getElementById('cbocommComputationMethod').value = "";
	}
	if (transactiontype.commissionAmount != undefined)
		document.getElementById('txtcommissionAmount').value = transactiontype.commissionAmount;
	else {
		document.getElementById('txtcommissionAmount').value = "";
	}
	if (transactiontype.commissionAmountExpression != undefined)
		document.getElementById('txtcommissionAmountExpression').value = transactiontype.commissionAmountExpression;
	else {
		document.getElementById('txtcommissionAmountExpression').value = "";
	}
	if (transactiontype.commissionContraNarrative != undefined)
		document.getElementById('txtcommissionContraNarrative').value = transactiontype.commissionContraNarrative;
	else {
		document.getElementById('txtcommissionContraNarrative').value = "";
	}
	if (transactiontype.commissionCrAccount != undefined)
		document.getElementById('cbocommissionCrAccount').value = transactiontype.commissionCrAccount;
	else {
		document.getElementById('cbocommissionCrAccount').value = "";
	}
	if (transactiontype.commissionDrAccount != undefined)
		document.getElementById('cbocommissionDrAccount').value = transactiontype.commissionDrAccount;
	else {
		document.getElementById('cbocommissionDrAccount').value = "";
	}
	if (transactiontype.commissionDrAnotherAccount != undefined)
		document.getElementById('cbocommissionDrAnotherAccount').value = transactiontype.commissionDrAnotherAccount;
	else {
		document.getElementById('cbocommissionDrAnotherAccount').value = "";
	}
	if (transactiontype.commissionMainNarrative != undefined)
		document.getElementById('txtcommissionMainNarrative').value = transactiontype.commissionMainNarrative;
	else {
		document.getElementById('txtcommissionMainNarrative').value = "";
	}
	if (transactiontype.commissionNarrativeFlag != undefined)
		document.getElementById('cbocommissionNarrativeFlag').value = transactiontype.commissionNarrativeFlag;
	else {
		document.getElementById('cbocommissionNarrativeFlag').value = "";
	}
	if (transactiontype.commissionTransactionType != undefined)
		document.getElementById('cbocommissionTransactionType').value = transactiontype.commissionTransactionType;
	else {
		document.getElementById('cbocommissionTransactionType').value = "";
	}
	if (transactiontype.crCommCalcMethod != undefined)
		document.getElementById('cbocrCommCalcMethod').value = transactiontype.crCommCalcMethod;
	else {
		document.getElementById('cbocrCommCalcMethod').value = "";
	}
	if (transactiontype.debitCredit != undefined)
		document.getElementById('cbodebitCredit').value = transactiontype.debitCredit;
	else {
		document.getElementById('cbodebitCredit').value = "";
	}
	if (transactiontype.defaultAmount != undefined)
		document.getElementById('txtdefaultAmount').value = transactiontype.defaultAmount;
	else {
		document.getElementById('txtdefaultAmount').value = "";
	}
	if (transactiontype.defaultContraAccount != undefined)
		document.getElementById('cbodefaultContraAccount').value = transactiontype.defaultContraAccount;
	else {
		document.getElementById('cbodefaultContraAccount').value = "";
	}
	if (transactiontype.defaultContraNarrative != undefined)
		document.getElementById('txtdefaultContraNarrative').value = transactiontype.defaultContraNarrative;
	else {
		document.getElementById('txtdefaultContraNarrative').value = "";
	}
	if (transactiontype.defaultMainAccount != undefined)
		document.getElementById('cbodefaultMainAccount').value = transactiontype.defaultMainAccount;
	else {
		document.getElementById('cbodefaultMainAccount').value = "";
	}
	if (transactiontype.defaultMainNarrative != undefined)
		document.getElementById('txtdefaultMainNarrative').value = transactiontype.defaultMainNarrative;
	else {
		document.getElementById('txtdefaultMainNarrative').value = "";
	}
	if (transactiontype.description != undefined)
		document.getElementById('txtdescription').value = transactiontype.description;
	else {
		document.getElementById('txtdescription').value = "";
	}
	if (transactiontype.dialogFlag != undefined)
		document.getElementById('cbodialogFlag').value = transactiontype.dialogFlag;
	else {
		document.getElementById('cbodialogFlag').value = "";
	}
	if (transactiontype.drCommCalcMethod != undefined)
		document.getElementById('cbodrCommCalcMethod').value = transactiontype.drCommCalcMethod;
	else {
		document.getElementById('cbodrCommCalcMethod').value = "";
	}
	if (transactiontype.forcePost != undefined)
		document.getElementById('chkforcePost').checked = transactiontype.forcePost;
	else {
		document.getElementById('chkforcePost').checked = "";
	}
	if (transactiontype.narrativeFlag != undefined)
		document.getElementById('cbonarrativeFlag').value = transactiontype.narrativeFlag;
	else {
		document.getElementById('cbonarrativeFlag').value = "";
	}
	if (transactiontype.shortCode != undefined)
		document.getElementById('txtshortCode').value = transactiontype.shortCode;
	else {
		document.getElementById('txtshortCode').value = "";
	}
	if (transactiontype.statFlag != undefined)
		document.getElementById('cbostatFlag').value = transactiontype.statFlag;
	else {
		document.getElementById('cbostatFlag').value = "";
	}
	if (transactiontype.suspenseCrAccount != undefined)
		document.getElementById('cbosuspenseCrAccount').value = transactiontype.suspenseCrAccount;
	else {
		document.getElementById('cbosuspenseCrAccount').value = "";
	}
	if (transactiontype.suspenseDrAccount != undefined)
		document.getElementById('cbosuspenseDrAccount').value = transactiontype.suspenseDrAccount;
	else {
		document.getElementById('cbosuspenseDrAccount').value = "";
	}
	if (transactiontype.tieredTableId != undefined)
		document.getElementById('cbotieredTableId').value = transactiontype.tieredTableId;
	else {
		document.getElementById('cbotieredTableId').value = "";
	}
	if (transactiontype.txnClass != undefined)
		document.getElementById('cbotxnClass').value = transactiontype.txnClass;
	else {
		document.getElementById('cbotxnClass').value = "";
	}
	if (transactiontype.txnTypeView != undefined)
		document.getElementById('cbotxnTypeView').value = transactiontype.txnTypeView;
	else {
		document.getElementById('cbotxnTypeView').value = "";
	}
	if (transactiontype.valueDateOffset != undefined)
		document.getElementById('txtvalueDateOffset').value = transactiontype.valueDateOffset;
	else {
		document.getElementById('txtvalueDateOffset').value = "";
	}
};

/**
 * Initializes the application.
 * 
 * @param {string}
 *            apiRoot Root of the API's path.
 */
fanikiwa.transactiontypeendpoint.transactiontypedetails.init = function(apiRoot) {
	// Loads the APIs asynchronously, and triggers callback
	// when they have completed.
	var apisToLoad;
	var callback = function() {
		if (--apisToLoad == 0) {
			console
					.log('calling fanikiwa.transactiontypeendpoint.transactiontypedetails.initializeControls()');
			fanikiwa.transactiontypeendpoint.transactiontypedetails
					.initializeControls();
		}
	}

	apisToLoad = 1; // must match number of calls to gapi.client.load()
	console
			.log('calling gapi.client.load(transactiontypeendpoint, v1, null, apiRoot)');
	gapi.client.load('transactiontypeendpoint', 'v1', callback, apiRoot);

};

function ClearException() {
	$('#errorList').remove();
	$('#error-display-div').empty();
}