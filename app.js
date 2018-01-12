
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
var UIController = function(){
	
	
	
}();

//GLobal app controller
var controller = function(budCtrl, UICtrl){
	
	
	// function for below event listner
	var ctrlAddItem = function() {
		
		//1. Get the field input Data
		
		//2. Add the item to the budget controller
		
		//3. Add the item to the UI
		
		//4. Calculate the budget
		
		//5. Display the budget to UI
		
		console.log('Working');
		
	}
	
	// event listner for button click for tick mark
	document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);
	
	
	// event listner for enter key word
	document.addEventListener('keypress', function(event){
		
		if(event.keyCode === 13 || event.which === 13){
			ctrlAddItem();
		}
	});
	
	
}(budgetController, UIController);