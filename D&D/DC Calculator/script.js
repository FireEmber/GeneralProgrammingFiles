$(document).ready(function () {	
	//========== Initalization ==========
	//Do things when the page loads before client interaction happens
	resetForum();
	var update = setInterval(updateOutput,250);
	$("#specialMaterialsQualitiesContainer").hide();
	$("#partsContainer").hide();
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
		//Reset all the variables in the forum
		//Base DC
		$("#itemVolume").val("1");
		$("#volumeCubicFeet").prop("checked", true);
		
		//Object Complexity Modifiers
		$("#notYetCrafted").prop("checked", false);
		$("#fineDetails").prop("checked", false);
		$("#toolArmorWeapon").prop("checked", false);
		$("#parts").prop("checked", false);
		$("#masterwork").prop("checked", false);
		$("#movingBending").prop("checked", false);
		$("#specialMaterialsQualities").prop("checked", false);
		$("#specialMaterialsQualitiesContainer").slideUp();
		$("#specialMaterialsQualitiesAmount").val("1");
		$("#plantFlesh").prop("checked", false);
		$("#unknown").prop("checked", false);
		$("#animated").prop("checked", false);
		$("#intelligent").prop("checked", false);
		
		//Additional Spell Component Modifiers
		$("#cantrips").val("0");
		$("#spell1").val("0");
		$("#spell2").val("0");
		$("#spell3").val("0");
		$("#spell4").val("0");
		$("#spell5").val("0");
		$("#spell6").val("0");
		$("#spell7").val("0");
		$("#spell8").val("0");
		$("#spell9").val("0");
		
		//Outputs
		$("#outputDC").text("0");
		$("#outputCostDivider").text("x1");
		$("#outputTotalObjectsMultiplier").text("x1");
		
		updateOutput();
	}
	
	//Update the output DC
	function updateOutput(){
		//Slide down the Weapon Materials and Qualities tab when it is checked. Else, hide it.
		if(document.getElementById("specialMaterialsQualities").checked == true){
			$("#specialMaterialsQualitiesContainer").slideDown();
		}else{
			$("#specialMaterialsQualitiesContainer").slideUp();
			$("#specialMaterialsQualitiesAmount").val("1");
		}
		
		//Slide down the Parts tab when it is checked. Else, hide it.
		if(document.getElementById("parts").checked == true){
			$("#partsContainer").slideDown();
		}else{
			$("#partsContainer").slideUp();
			$("#partsAmount").val("2");
			$("#movingBending").prop("checked", false);
			$("#removePartsDC").prop("checked", false);
		}
		
		var DC = 0;
		
		//Base DC
		if(document.getElementById("volumeCubicFeet").checked){
			DC += Math.floor(3 * Math.log2(Number(document.getElementById("itemVolume").value))) + 8;
		}else{
			DC += Math.floor(8 / 8 * Number(document.getElementById("itemVolume").value));
		}
		
		//Object Complexity Modifiers
		var removePartsDCMod = document.getElementById("removePartsDC").checked;
		var partsMod = Number(document.getElementById("partsAmount").value);
		
		if(document.getElementById("notYetCrafted").checked){DC+=4;}
		if(document.getElementById("fineDetails").checked){DC+=3;}
		if(document.getElementById("toolArmorWeapon").checked){DC+=2;}
		if(document.getElementById("parts").checked && !removePartsDCMod){DC+=2;}
		if(document.getElementById("parts").checked && !removePartsDCMod){DC += Math.floor(Math.log2(partsMod));}
		if(document.getElementById("movingBending").checked && !removePartsDCMod){DC+=4;}
		if(document.getElementById("masterwork").checked){DC+=4;}
		if(document.getElementById("specialMaterialsQualities").checked){DC += 4*Number(document.getElementById("specialMaterialsQualitiesAmount").value);}
		if(document.getElementById("plantFlesh").checked){DC+=6;}
		if(document.getElementById("unknown").checked){DC+=8;}
		if(document.getElementById("animated").checked){DC+=8;}
		if(document.getElementById("intelligent").checked){DC+=10;}
		
		//Additional Spell Component Modifiers
		DC += 1 * Number(document.getElementById("cantrips").value);
		DC += 1 * Number(document.getElementById("spell1").value);
		DC += 1 * Number(document.getElementById("spell2").value);
		DC += 2 * Number(document.getElementById("spell3").value);
		DC += 2 * Number(document.getElementById("spell4").value);
		DC += 3 * Number(document.getElementById("spell5").value);
		DC += 3 * Number(document.getElementById("spell6").value);
		DC += 4 * Number(document.getElementById("spell7").value);
		DC += 4 * Number(document.getElementById("spell8").value);
		DC += 5 * Number(document.getElementById("spell9").value);
		
		
		//Outputs
		$("#outputDC").text(DC);
		if(removePartsDCMod){
			$("#outputCostDivider").text("x" + partsMod);
			$("#outputTotalObjectsMultiplier").text("x" + partsMod);
		}else{
			$("#outputCostDivider").text("x1");
			$("#outputTotalObjectsMultiplier").text("x1");
		}
		
		//Number(document.getElementById("id").value);
		//document.getElementById("id").checked;
	};
	
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
