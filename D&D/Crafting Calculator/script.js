$(document).ready(function () {	
	//========== Initalization ==========
	//Do things when the page loads before client interaction happens
	resetForum();
	var update = setInterval(updateOutput,250);
	//========== End of Initalization ==========
	
	//========== JQuery Calls ==========
	//JQuery functions which are activated by varius things such as clicking
	//that then activate other functions listed under Javascript Functions
	$("#resetButton").click(function(){
		resetForum();
	});
	//========== End of Jquery Calls ==========
	
	//========== Javascript Functions ==========
	//Things that do stuff
	
	function resetForum(){
		$("#rulesetPHB").prop("checked", true);
		$("#charCraftBonus").val("0");
		$("#charTakeTen").prop("checked", true);
		$("#charTakeTwenty").prop("checked", false);
		$("#charAddTen").prop("checked", false);
		$("#checkDaily").prop("checked", true);
		$("#itemCraftDC").val("1");
		$("#itemBasePrice").val("1");
		$("#basePriceGP").prop("checked", true);
		$("#itemIsMagical").prop("checked", false);
		$("#craftingCostGPOutput").text("0 GP");
		$("#craftingCostSPOutput").text("0 SP");
		$("#craftingCostCPOutput").text("0 CP");
		$("#craftingCostXPOutput").text("0 XP");
		$("#timeIdealOutputDays").text("0 Days");
		$("#timeIdealOutputHours").text("0 Hours");
		$("#timeIdealOutputMinutes").text("0 Minutes");
		$("#timeIdealOutputSeconds").text("0 Seconds");
		$("#timeApproxamateOutputDays").text("0 Days");
		$("#timeApproxamateOutputHours").text("0 Hours");
		$("#timeApproxamateOutputMinutes").text("0 Minutes");
		$("#timeApproxamateOutputSeconds").text("0 Seconds");
		$("#successRateOutput").text("100%");
		updateOutput();
	}
	
	function updateOutput(){
		if(document.getElementById("rulesetPHB").checked){
			calcRulesetPHB();
		}else if(document.getElementById("rulesetHB1").checked){
			calcRulesetHB1();
		}else if(document.getElementById("rulesetHB2").checked){
			calcRulesetHB2();
		}
	};
	
	function calcRulesetPHB(){
		var BPMod = 1;
		var BP = document.getElementById("itemBasePrice").value;
		var CSP = document.getElementById("basePriceSP").checked;
		var CCP = document.getElementById("basePriceCP").checked;
		var MI = document.getElementById("itemIsMagical").checked;
		var GP = 0;
		var SP = 0;
		var CP = 0;
		var XP = 0;
		var DC = document.getElementById("itemCraftDC").value;
		var ICT = 0;
		var ID = 0;
		var IH = 0;
		var IM = 0;
		var IS = 0;
		var CB = document.getElementById("charCraftBonus").value;
		var TTen = document.getElementById("charTakeTen").checked;
		var TTwenty = document.getElementById("charTakeTwenty").checked;
		var TB = 0
		var ATen = document.getElementById("charAddTen").checked;
		var WC = document.getElementById("checkWeekly").checked;
		var ACT = 0;
		var AD = 0;
		var AH = 0;
		var AM = 0;
		var AS = 0;
		var CSR = 100;
		if(CSP){BPMod = 10;}
		if(CCP){BPMod = 100;}
		var ICP = Math.floor((100 * BP)/(3 * BPMod)) / 100;
		$("#craftingCostGPOutput").text(Math.floor(ICP) + " GP");
		$("#craftingCostSPOutput").text(getDigit(ICP,-1) + " SP");
		$("#craftingCostCPOutput").text(getDigit(ICP,-2) + " CP");
		if(MI){
			$("#craftingCostXPOutput").text(Math.floor(BP/(25 * BPMod)) + " XP");
		}else{
			$("#craftingCostXPOutput").text("0 XP");
		}
		if(TTen){TB = 10;}
		if(TTwenty){TB = 20;}
		ICT = (ICP * 100) / (DC * (CB + TB));
		$("#timeIdealOutputDays").text(Math.floor(ICT) + " Days");
		ICT = (ICT - Math.floor(ICT)) * 8;
		$("#timeIdealOutputHours").text(Math.floor(ICT) + " Hours");
		ICT = (ICT - Math.floor(ICT)) * 60 + .0000000000001;
		$("#timeIdealOutputMinutes").text(Math.floor(ICT) + " Minutes");
		ICT = (ICT - Math.floor(ICT)) * 60;
		$("#timeIdealOutputSeconds").text(Math.floor(ICT) + " Seconds");
	}
	
	function calcRulesetHB1(){
		
	}
	
	function calcRulesetHB2(){
		
	}
	
	//returns the nth diget to the left. The one's digit is 1, the ten's 2, and decimal places start at -1.
	//Inputting 0 will result in an error.
	function getDigit(numb, digit){
		if(!isNaN(numb) && !isNaN(digit)){
			var ret = Number(numb.toString().charAt(Math.floor(numb).toString().length - digit));
			if(!isNaN(ret)){
				return ret;
			}else{
				console.error("Error! Digit given does not exist: " + numb + " | " + digit);
			}
		}else{
			console.error("Error! Inputs given were not numbers: " + numb + " | " + digit);
		}
		return 0;
	}
	
	//========== End of Javascript Functions ==========
});