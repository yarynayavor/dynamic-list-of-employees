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
}
showAverageSalary();

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

    else {
    	$('.pop-up').fadeOut(700);
    	addingEmployee();
    	removeEmployee();
    	showNumbersOfEmployees();
    	showAverageSalary();
    	getEmpty();
    } 
  });

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