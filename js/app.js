$('.pop-up').hide();

firstname=document.getElementById('firstname').value;
lastname=document.getElementById('lastname').value;
salary=document.getElementById('salary').value;
position=document.getElementById('position').value;

list = document.getElementById('employeeList');
li = list.getElementsByTagName('li');

function getEmpty() {
	var myform=document.getElementById('myform');
	myform.reset();
}

function addingEmployee() {
	var newEmployeeList = document.createElement('li');

	var fotoSpan = document.createElement('span');
	fotoSpan.classList.add('employeeUserIcon');
	newEmployeeList.appendChild(fotoSpan);

	var fnSpan = document.createElement('span');
	var fnText = document.createTextNode(firstname);
	fnSpan.appendChild(fnText); 
	fnSpan.classList.add('employeeFirstName','fixing-f-n'); 
	newEmployeeList.appendChild(fnSpan);

	var lnSpan = document.createElement('span');
	var lnText = document.createTextNode(" "+lastname); 
	lnSpan.appendChild(lnText); 
	lnSpan.classList.add('employeeLastName','fixing-l-n');
	newEmployeeList.appendChild(lnSpan); 

	var salSpan = document.createElement('span');
	var salText = document.createTextNode('$ '+salary); 
	salSpan.appendChild(salText); 
	salSpan.classList.add('employeeSalary','fixing-sal'); 
	newEmployeeList.appendChild(salSpan); 

	var posSpan = document.createElement('span');
	var posText = document.createTextNode(position); 
	posSpan.appendChild(posText);
	posSpan.classList.add('employeePosition','fixing-pos'); 
	newEmployeeList.appendChild(posSpan); 

	var delSpan = document.createElement('span');
	delSpan.classList.add('employeeDelete','fixing-del');
	var iFa = document.createElement('i');
	iFa.classList.add("fa","fa-times");
	iFa.setAttribute("aria-hidden","true")
	delSpan.appendChild(iFa);
	newEmployeeList.appendChild(delSpan); 

	list.appendChild(newEmployeeList);
}

function showNumbersOfEmployees() {
	var inSystem = document.getElementById('inSystem');
	inSystem.textContent = "Employees in system: "+ li.length;
}
showNumbersOfEmployees();

function showAverageSalary() {
    var getSalary=document.querySelectorAll('.employeeSalary');
    var matchSalaryArr=[];
    for (var i = 0; i < getSalary.length; i++) {
    	var textSalary=getSalary[i].textContent;
    	var matchSalary = textSalary.match(/\d/g);
    	var matchSalaryJoin = matchSalary.join('');
    	matchSalaryArr.push(matchSalaryJoin);
    	for (var j = 0; j< matchSalaryArr.length; j++) {
    		var average = eval(matchSalaryArr.join('+')) / matchSalaryArr.length;
    	}
    }
	if(li.length==0) {
		average=0;
		averageSalary.textContent = "Average salary:  "+"$ "+average.toFixed(2);
	}
	averageSalary.textContent = "Average salary:  "+"$ "+ average.toFixed(2);
	return average;
}
showAverageSalary();

// function checkDublicatesAnothers() {
// 	var getFirstName=document.getElementsByClassName("fixing-f-n");
// 	var getLastName=document.getElementsByClassName("fixing-l-n");
// 	for (var i = 0; i < getFirstName.length; i++) {
// 		var valueFn=getFirstName[i].textContent;
// 	}
// 	for (var j = 0; j < getLastName.length; j++) {
// 		var valueLn=getLastName[j].textContent;
// 	}
// 	return valueFn+ " "+valueLn;
// }

$('.addEmployee').click(function (e) {
	$('.pop-up').toggle(1000);
});

$('#delete').click(function (e) {
	$('.pop-up').fadeOut(700);
});

$('.button').click(function (e) {
	firstname=document.getElementById('firstname').value;
	lastname=document.getElementById('lastname').value;
	salary=document.getElementById('salary').value;
	position=document.getElementById('position').value;
    limit=document.getElementById('limit').value;

	var average=showAverageSalary(); 

	var checkdubl=checkDublicates(firstname,lastname);
	// var checkdublAnothers=checkDublicatesAnothers();
	
	var maxLength = 14;
	var maxLengthSalary = 10;

	checkIfLetters=/^[a-zA-Z]+$/;

	if((firstname==='') && (lastname==='') && (position==='') && (salary==='')){
      alert("You entering nothing. Fix this. ");
    }
    else if((firstname==='') || (lastname==='') || (position==='') || (salary==='')){
      if(firstname==='') {
      	alert("You forget entering First Name. Fix this. ");
      }
      if(lastname==='') {
      	alert("You forget entering Last Name. Fix this. ");
      }
      if(salary==='') {
      	alert("You forget entering Salary. Fix this. ");
      }
      if(position==='') {
      	alert("You forget entering Position. Fix this. ");
      }
    }
	else if((!firstname.match(checkIfLetters)) || (!lastname.match(checkIfLetters)) || (!position.match(checkIfLetters))){
      alert("Ivalid data! Are you entering First Name,Last Name and Position correctly(not numbers!? only letters?! IN ENGLISH?!) ?");
    }
    else if(salary==0) {
    	alert("Salary can't be zero. Fix this. ");
    }
    else if(salary<0) {
      	alert("Salary can't be negative. Fix this. ");
    }

    else if(~salary.indexOf("e")) {
    	alert("Salary can't be writing in exponent. Fix this. ");
    }
    else if((firstname.length>maxLength) || (lastname.length>maxLength) || (position.length>maxLength) || (salary.length>maxLengthSalary)){
      if(firstname.length>maxLength) {
      	alert("First Name is too big. Please write shortly. Max length 13. ");
      }
      if(lastname.length>maxLength) {
      	alert("Last Name is too big. Please write shortly. Max length 13.");
      }
      if(salary.length>maxLengthSalary) {
      	alert("Salary is too big. Please write shortly. Max length 10. ");
      }
      if(position.length>maxLength) {
      	alert("Position is too big. Please write shortly. Max length 13. ");
      }
    }
    else if((average>2000) || (li.length==limit) || (checkdubl)){
    	if(average>2000) {
    		alert("Oops... Average Salary is more than $2000 We can't add new employees!");
    	}
    	if(li.length==limit) {
    		alert("Oops... Limit is: "+limit+". We can't add new employees!");
    	}
    	if(checkdubl) {
    		alert("Oops.. <"+firstname+" "+lastname+ "> already ecxist in our system. Plese,enter another name!");
    	}
    }
    else {
    	$('.pop-up').fadeOut(700);
    	addingEmployee();
    	removeEmployee();
    	showNumbersOfEmployees();
    	showAverageSalary();
    	checkDublicates(firstname,lastname);
    	getEmpty();
    } 
  });

function checkDublicates(fname,lname) {
	var getFirstName=document.querySelectorAll(".employeeFirstName");
	var getLastName=document.querySelectorAll(".employeeLastName");
	// firstname=document.getElementById('firstname').value;
	// lastname=document.getElementById('lastname').value;
	//debugger;
	//var enterdubl=fName+" "+lName;
	for (var i = 0; i < getFirstName.length; i++) {
			if((getFirstName[i].textContent.toLowerCase()==fname.toLowerCase()) &&  (getLastName[i].textContent.toLowerCase()==lname.toLowerCase())){
				return true;
			}
	}
	return false;
}
function removeEmployee() {
	button=document.querySelectorAll('.employeeDelete');
	for (i = 0; i < button.length; i++) {
		button[i].onclick= (function () {
			var $item = $(this.parentNode);
			this.style.display='none';
			$item.hide('slow', function() { 
				$item.remove(); 
				showNumbersOfEmployees(); 
				showAverageSalary();
			});
		});
	}
}
removeEmployee();