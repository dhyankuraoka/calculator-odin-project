//functions to be used by calculator

function add(number1, number2) {
	return number1+number2;
}

function subtract(number1, number2) {
	return number1-number2;
}

function multiply(number1, number2) {
	return number1*number2;
}

function divide(number1, number2) {
	return number1/number2;
}


//function to execute the operations, once both numbers and type of operation is given
function operator(operation, number1, number2) {
	switch(operation){
		case 'addition':
			return add(number1,number2);
			break;

		case 'subtraction':
			return subtract(number1,number2);
			break;

		case 'multiplication':
			return multiply(number1,number2);
			break;

		case 'division': 
			return divide(number1,number2);
			break;
	}
}

//select all buttons
const btns = document.querySelectorAll('.regularButton,.btn');



//add to the buttons response once is cliked
for(let i=0; i<btns.length; i++) {
	btns[i].addEventListener('click', addToStack);
};

for(let i=0; i<btns.length; i++) {
	btns[i].addEventListener('mousedown', event =>{
		event.target.style.filter = 'brightness(1.75)';
		setTimeout(function() {
	    		event.target.style.filter = 'brightness(1)';
	  				}, 100)
	});
};



const justNumbers = ['1','2','3','4','5','6','7','8','9','0','.'];
let onScreen = '0';
let atScreen = document.getElementById('screen');
let operation ='';
let memory='0';

atScreen.textContent = onScreen;

function addToStack(event) {

	btnCode = event.target.id;
	//first check if the screen maximum siize was reacheded, if yes it is possible to clear the screen
	if(onScreen.toString().length<30 || btnCode=='clearButton'){

		if(onScreen=='0' && justNumbers.includes(btnCode)){
				if(btnCode=='.' ){
					onScreen ='0.'
					atScreen.textContent = onScreen;	
				}
				else{
					onScreen = btnCode;
					atScreen.textContent = onScreen;
				}
		}
		
		
		else if(justNumbers.includes(btnCode)){
			if(btnCode=='.' && !Number.isInteger(onScreen)){		
				
			}
			else{
				onScreen = onScreen+btnCode;
				atScreen.textContent = onScreen;
			}

		}

		else if(btnCode=='clearButton'){
			onScreen='0';
			operation = '';
			atScreen.textContent = onScreen;
		}

		else if(btnCode=='deleteButton'){
			if(onScreen==0){
				onScreen='0';
			}
			if(!onScreen=='' )
				onScreen=onScreen.toString().slice(0,-1)
			if(onScreen==''){
				onScreen='0';	
			}
			atScreen.textContent = onScreen;	
		}

		else if(btnCode=='equal'){
			if(!memory=='' && !operation=='' && !onScreen==''){
				onScreen = operator(operation,parseFloat(memory),parseFloat(onScreen));
				atScreen.textContent = onScreen;
				memory= onScreen;
				operation='';
			}
		}

		else if(!justNumbers.includes(btnCode)) {
			if(operation == '') {
				operation = btnCode;
				memory = onScreen;
				onScreen = '0';
			}

			else if(operation!='' && memory!=='') {
				onScreen = operator(operation,parseFloat(memory),parseFloat(onScreen));
				atScreen.textContent = onScreen;
				operation = btnCode;
				memory= onScreen;
				onScreen = '0';
			}	
		}


	}
	else{
		atScreen.textContent='ERROR';
	}
}
	

/*
else if(!justNumbers.includes(btnCode)) {
		console.log('hi');
		switch(btnCode) {
			case 'addition':
				if(operation == '') {
					operation = btnCode;
					memory = onScreen;
					onScreen = '0';
				}

				else if(!operation=='' && !memory=='') {
					onScreen = operator(operation,parseInt(memory),parseInt(onScreen));
					atScreen.textContent = onScreen;
					operation = btnCode;
					memory= onScreen;
					onScreen = '0';
				}
				
				break;
			case subtraction:

			case multiplication:

			case division:
		}

		
	}*/