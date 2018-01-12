
//Budget Controller
var budgetController = (function() {
	
	var Expense = function(type, description, val){
			this.type = type;
			this.description = type;
			this.val = val;
	};
	
	var Income = function(type, description, val){
			this.type = type;
			this.description = type;
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
	
	
	
})();


//UI Controller
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

//GLobal app controller
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
		
		//1. Get the field input Data
		var input = UIController.getInput();
		//console.log(input);
		
		//2. Add the item to the budget controller
		
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


//controller.init();