
//BUDGET CONTROLLER
var budgetController = (function() {
	
	var Expense = function(id, description, value){
			this.id = id;
			this.description = description;
			this.value = value;
			this.percentage = -1;
	};
	
	Expense.prototype.calcPercentage = function(totalIncome){
		if(totalIncome > 0){
			this.percentage = Math.round((this.value / totalIncome) * 100);
		} else {
			this.percentage = -1;
		}
	};
	
	Expense.prototype.getPercentage =  function(){
		return this.percentage;
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
		
		
		deleteItem: function(type, id){
			var ids, index;
			
			ids = data.allItems[type].map(function(current){
					return current.id;
			});
			
			index = ids.indexOf(id);
			
			if(index !== -1){
				data.allItems[type].splice(index, 1);
			}
		},
		
		// calculate the individual percentages for each expenses
		calculatePercentages: function(){
			
			data.allItems.exp.forEach(function(cur){
				cur.calcPercentage(data.total.inc);
			});
		},
		
		getPercentages: function(){
			var per = data.allItems.exp.map(function(cur){
				return cur.getPercentage();
			});
			
			return per;
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
		expensesContainer: '.expenses__list',
		budget: '.budget__value',
		totalIncome: '.budget__income--value',
		totalExpenses: '.budget__expenses--value',
		percentage: '.budget__expenses--percentage',
		container: '.container',
		itemPercentages: '.item__percentage',
		dateLable: '.budget__title--month'
	};
	
	
	
	var formatNumber = function(num, type){
			
		var numSplit, int, dec;
		
		num =  Math.abs(num);
		num = num.toFixed(2);
		
		numSplit = num.split('.');
		int = numSplit[0];
		
		if(int.length > 3){
			int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
		}
		
		dec = numSplit[1];
		
		return(type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
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
			html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			} else if(type === 'exp') {
				element = domStrings.expensesContainer;
			html =  '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			
			// Replace the placeholder text with some actual data
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', formatNumber(obj.value, type));
			//console.log(newHTML);
			
			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);	
			
			},
	
		
			deleteListItem: function(selectID){
				var el = document.getElementById(selectID);
				el.parentNode.removeChild(el);
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
		
	//function to display the budget, income, expenses and percentage to the UI	
		displayToUI: function(obj){
			var type;
			
			obj.budget > 0 ? type = 'inc' : type = 'exp';
			
			document.querySelector(domStrings.budget).textContent = formatNumber(obj.budget, type);
			document.querySelector(domStrings.totalIncome).textContent = formatNumber(obj.totalInc, 'inc');
			document.querySelector(domStrings.totalExpenses).textContent = formatNumber(obj.totalExp, 'exp');
			
			if(obj.percentage > 0){
				document.querySelector(domStrings.percentage).textContent = obj.percentage + '%';
			} else {
				document.querySelector(domStrings.percentage).textContent = '---';
			}
		},
			
		
	// function to display the expenses percentages in UI
		displayPercentages: function(percentages){
			var fields = document.querySelectorAll(domStrings.itemPercentages);
			var nodeListForEach =  function(list, callback){
				for(var i = 0; i< list.length; i++){
					callback(list[i], i);
				}
			};
			
			nodeListForEach(fields, function(current, index){
				if(percentages[index] > 0) {
				current.textContent = percentages[index] + '%';
				} else {
					current.textContent = '---';
				}
			});
		},
		
	// function to display the current date in UI
		displayDate: function(){
			var now, year, month, months;
			now =  new Date();
			months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
			month = now.getMonth();
			year = now.getFullYear();
			document.querySelector(domStrings.dateLable).textContent = months[month] + ' ' + year;
		
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
		
		// event happen each time when someone clicks on this container
		document.querySelector(dom.container).addEventListener('click', ctrlDeleteItem);
	};
	
	
	var updateBudget =  function() {
		//1. Calculate the budget
		budCtrl.calculateBudget();
		
		//2. Return the budget
		var budget = budCtrl.getBudget();
		
		//3. Display the budget to UI
		UICtrl.displayToUI(budget);
	};
		
	
	var updatePercentages = function() {
		//1. Calculate percemtage
		budCtrl.calculatePercentages();
		
		//2. Read percentages from the budget controller
		var percentages = budCtrl.getPercentages();
		
		//3. Update the UI with new percentages
		UICtrl.displayPercentages(percentages);
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
			
			//6. Calculate the update percentages
			updatePercentages();
		}
	};
	
	
	var ctrlDeleteItem = function(event){
		var itemID, splitID, type, id;
		
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
		
		if(itemID){
			
			//inc-1
			splitID = itemID.split('-');
			type = splitID[0];
			id = parseInt(splitID[1]);
			
			//1. delete the itme from data structure
			budCtrl.deleteItem(type, id);
			
			//2. delete the item from UI
			UICtrl.deleteListItem(itemID);
			
			//3. update and show the new budget
			updateBudget();
			
			//4. Calculate the update percentages
			updatePercentages();
		}
	};
	
	
	return {
		init: function(){
			console.log('App has started');
			UICtrl.displayDate();   // calling display date during the initialization of the web app
			UICtrl.displayToUI({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setEvent();
		}
	};
	
	
})(budgetController, UIController);


controller.init();