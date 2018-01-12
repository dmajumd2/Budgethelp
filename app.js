
//Budget Controller
var budgetController = (function() {
	
	var x = 20;
	
	var add =  function(a){
		return x + a;
	}
	
		return {
			publicTest: function(b){
				return add(b);
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
	
	var dom = UIController.getdomStrings();
	
	// function for below event listner
	var ctrlAddItem = function() {
		
		//1. Get the field input Data
		var input = UIController.getInput();
		console.log(input);
		
		//2. Add the item to the budget controller
		
		//3. Add the item to the UI
		
		//4. Calculate the budget
		
		//5. Display the budget to UI
		
	}
	
	// event listner for button click for tick mark
	document.querySelector(dom.button).addEventListener('click', ctrlAddItem);
	
	
	// event listner for enter key word
	document.addEventListener('keypress', function(event){
		
		if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
	});
	
	
})(budgetController, UIController);