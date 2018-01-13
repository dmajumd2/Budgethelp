
//BUDGET CONTROLLER
var budgetController = (function() {
	
	var Expense = function(id, description, val){
			this.id = id;
			this.description = description;
			this.val = val;
	};
	
	var Income = function(id, description, val){
			this.id = id;
			this.description = description;
			this.val = val;
	};
	
	
	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		
		total: {
			exp: 0,
			inc: 0
		}
	}
	
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
		button: '.add__btn'
	};
	
	return {
		
		getInput: function(){
			return {
					type: document.querySelector(domStrings.inputType).value,
					description: document.querySelector(domStrings.inputDescription).value,
					value: document.querySelector(domStrings.inputValue).value
				};
			},
		
			getdomStrings: function(){
				return domStrings;
			}
		
		};
	
	})();




//GLOBAL APP CONTROLLER
var controller = (function(budCtrl, UICtrl){
	
	
	var setEvent =  function(){
		
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
	
	
	// function for below event listner
	var ctrlAddItem = function() {
		var input, newItem;
		//1. Get the field input Data
		input = UIController.getInput();
		
		//2. Add the item to the budget controller
		newItem = budCtrl.addItem(input.type, input.description, input.value);
		
		//3. Add the item to the UI
		
		//4. Calculate the budget
		
		//5. Display the budget to UI
		
	};
	
	return {
		init: function(){
			console.log('App has started');
			setEvent();
		}
	};
	
	
})(budgetController, UIController);




controller.init();