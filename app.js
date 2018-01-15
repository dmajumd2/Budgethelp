
//BUDGET CONTROLLER
var budgetController = (function() {
	
	var Expense = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value;
	};
	
	var Income = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value;
	};
	
	var calculateTotal = function(type){
		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum += cur.value;
		});
		
		data.total[type] = sum;
	};
	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		
		total: {
			exp: 0,
			inc: 0
		},
		
		budget: 0,
		percentage: -1	
	};
	
	return {
		addItem: function(type, des, val) {
			var newItem, ID;
			
			//CREATE NEW ID
			if(data.allItems[type].length < 0){
			ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}
			
			
			// Create new item based on 'inc' or 'exp' type
			if(type === 'exp'){
				newItem = new Expense(ID, des, val);
			} else if(type === 'inc') {
				newItem = new Income(ID, des, val);
			}
			
			// Push it into array data structure according to the type
			data.allItems[type].push(newItem);
			
			//Return the new element
			return newItem;
			
		},
		
		
		calculateBudget: function(){
			
			//1. calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			
			//2. Calculate the budget: income - expenses
			data.budget = data.total.inc - data.total.exp;
			
			//3. Calculate the percentage of income that we spent
			if(data.total.inc > 0){
			data.percentage = Math.round((data.total.exp / data.total.inc) * 100);
			} else {
				data.percentage = -1;
			}	
		},
		
		getBudget: function(){
			return {
				budget: data.budget,
				totalInc: data.total.inc,
				totalExp: data.total.exp,
				percentage: data.percentage
			};
		},
		
		
		testing : function(){
			console.log(data);
		}
	};
	
})();





//UI CONTROLLER
var UIController = (function(){
	
	var domStrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		button: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list'
	};
	
	// for getting the input from the user like (-) or (+), add description and value or the cost
	return {
		getInput: function(){
			return {
					type: document.querySelector(domStrings.inputType).value,
					description: document.querySelector(domStrings.inputDescription).value,
					value: parseFloat(document.querySelector(domStrings.inputValue).value)
				};
			},
		
		
	//function addListItem
		addListItem: function(obj, type){
			var html, newHTML, element;
			
			// Create HTML string with placeholder text
			if(type === 'inc'){
				element = domStrings.incomeContainer;
			html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			} else if(type === 'exp') {
				element = domStrings.expensesContainer;
			html =  '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			
			// Replace the placeholder text with some actual data
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', obj.value);
			console.log(newHTML);
			
			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);	
			
			},
		
		
	//function for clearing fields
			clearFields: function(){
				var fields, fieldArr;
				
				fields = document.querySelectorAll(domStrings.inputDescription + ', ' + domStrings.inputValue);
				
				fieldArr = Array.prototype.slice.call(fields);
				
				fieldArr.forEach(function(current, index, array) {
					current.value = "";
				});
				
				fieldArr[0].focus();
			},
			
	// function to return the type, description and value to the global app controller
			getdomStrings: function(){
				return domStrings;
			}
		
		};
	
	})();




//GLOBAL APP CONTROLLER
var controller = (function(budCtrl, UICtrl){
	
	
	var setEvent =  function(){
		
		// calling the UI controller getdomStrings funtion for type, description and value
		var dom = UIController.getdomStrings();
		
		// event listner for button click for tick mark
		document.querySelector(dom.button).addEventListener('click', ctrlAddItem);
	
	
		// event listner for enter key word
		document.addEventListener('keypress', function(event){
			if(event.keyCode === 13 || event.which === 13){
				ctrlAddItem();
			}
		});
	};
	
	
	
	var updateBudget =  function() {
		//1. Calculate the budget
		budCtrl.calculateBudget();
		
		
		//2. Return the budget
		var budget = budCtrl.getBudget();
		
		
		//3. Display the budget to UI
		console.log(budget);
	};
		
	
	
	
	// function for below event listner
	var ctrlAddItem = function() {
		var input, newItem;
		//1. Get the field input Data
		input = UIController.getInput();
		
		if(input.description !== "" && !isNaN(input.value) && input.value > 0){
			
			//2. Add the item to the budget controller
			newItem = budCtrl.addItem(input.type, input.description, input.value);

			//3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);

			//4. Clear the input fields
			UICtrl.clearFields();	

			//5. Calculate and update budget
			updateBudget();
		}
		
		
	};
	
	return {
		init: function(){
			console.log('App has started');
			setEvent();
		}
	};
	
	
})(budgetController, UIController);




controller.init();