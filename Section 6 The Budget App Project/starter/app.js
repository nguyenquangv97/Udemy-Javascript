// add Event handler
// get input values
// add the new item to our data structure
// add the new item to the UI
// calculate budget
// update the UI

// structuring our code with modules
// modules we should have
// create module for each of these units
// UI Module
// get input values
// add the new item to the UI
// update the UI
// Data Module
// add the new item to our data structure
// calcuate budget
// controller Module
// add event handler
// ------------------------------------------------
// 1. implement module pattern
// private and public data, encapsulation and separation of concerns.
// 2. Set up event listeners
// How to setup event listeners for keypress events;
// how to use event object.
// 3. A technique for adding big chunks of HTML into the DOM;
// how to replace parts of strings;
// how to do dome manipulation
// using the insertAdjacentHTML method
// 4. How to clear HTML fields;
// How to use querySelectorAll,
// How to convert a list to an array
// A better way to loop over an array
// than for loops: forEach.
// 5. How to convert field inputs to numbers
// How to prevent false inputs.
// 6. How and why to create simple, reusable functions 
// with only one purpose;
// how to sum all elements of an array using the forEach method
// 7. practice DOM manipulation by updating the budget and total values

//---------------------------------------------
/*
TO-DO LIST
Add event handler
Delete the item from our data structure
Delete the item from the UI
Re-calculate budget
Update the UI
*/

/*
Event Bubbling: When the event is fired on some DOM element, 
the exact same event will also be fired on the parent elements.
We say that the event bubbles up inside the DOM tree.
Target Element: Ex: clicking a button
The parent elements know ethe target element of the event. (where the event
    was first fired)
Event Delegation: Because we know that the event bubbles up in the DOM tree,
and we also know where the event was fired, we can attach the event handler
to the parent and wait for the event to bubble up.
*/

/**
 * use cases for event delegation:
 * 1. When we have an element with lots of child elements that we are interested in.
 * 
 * 2. When we want an event handler attached to an element that is not yet in the DOM when our page is loaded.
 */

 // 1. How to use event delegation in practice;
 // 2. how to use IDs in HTML to connect the UI with the data model;
 // 3. How to use the parentNode property for DOM traversing.

 // 4. Yet another method to loop over an array: map;
 // 5. How to remove elements from an array using the splice method.

 /*
 Part 3
 1. How to make our budget controller interact with the Expense prototype.
 2. How to use different String methods to manipulate strings.
 3. How and when to use 'change' event
 */

// ==================================================================
var budgetController = (function () {
    // secret of module pattern is to return all the objects
    // that we want to be public

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0)
            this.percentage = Math.round(this.value / totalIncome * 100);
        else
            this.percentage = -1;
    };

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    };
    

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var allExpenses = [];
    var allIncomes = [];
    var totalExpenses = 0;

    var calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach((cur) => {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
    };

    // public methods
    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            // create new ID
            if (data.allItems[type].length > 0)
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            else ID = 0;
            // create new item based on 'inc' or 'exp' type
            if (type === "exp") {
                newItem = new Expense(ID, des, val);
            } else if (type === "inc") {
                newItem = new Income(ID, des, val);
            }

            // push it into our data structure
            data.allItems[type].push(newItem);

            // return the new element
            return newItem;
        },

        deleteItem: function(type, id){
            var ids, index;
            ids = data.allItems[type].map(function(current, index, array){
                return current.id;    
            });

            index = ids.indexOf(id);

            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },


        calculateBudget: function () {
            // calculate total incomes and expenses
            calculateTotal('inc');
            calculateTotal('exp');

            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        calculatePercentages: function(){
            data.allItems.exp.forEach((current) => {
                current.calcPercentage(data.totals.inc);
            });
        },

        getPercentages: function(){
            return data.allItems.exp.map((current) => {
                return current.getPercentage();
            });
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },

        testing: function () {
            console.log(data);
        }
    };
})();


// ==================================================================


var UIController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        inputBtn: ".add__btn",
        incomeContainer: ".income__list",
        expensesContainer: ".expenses__list",
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'

        

    };

    var formatNumber =  function(num, type) { 
        var numSplit, int, dec;
        /**
         * + or - before a number
         * exactky 2 decimal points
         * comma separating the thousands
         * 
         * 2310.4567 -> + 2,210.43
         * 2000 -> + 2,000.00 
         */
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
       
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];
        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec; 
    };

    var nodeListForEach = function(list, callback){
        for(var i = 0; i < list.length; i++){
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            // create HTML string with placeholder text
            var html, newHtml, element;
            if (type === "inc") {
                element = DOMstrings.incomeContainer;
                html =
                    '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === "exp") {
                element = DOMstrings.expensesContainer;
                html =
                    '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with some actual data
            newHtml = html.replace("%id%", obj.id);
            newHtml = newHtml.replace("%description%", obj.description);
            newHtml = newHtml.replace("%value%", formatNumber(obj.value, type));
            // insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
        },

        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
        },

        clearField: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(
                `${DOMstrings.inputDescription}, ${DOMstrings.inputValue}`
            );

            fieldsArr = Array.prototype.slice.call(fields);
            fieldsArr.forEach((current, index, array) => {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';


            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc);
            document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.totalExp);


            if(obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

        },

        displayPercentages: function(percentages){
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);


            // ccll nodeListForEach function, passing in the list and callback
            // for each iteration of the for loop we execute the call back 
            nodeListForEach(fields, function(current, index){
                if(percentages[index])
                    current.textContent = percentages[index] + '%';
                else {
                    current.textContent = '---';
                }    
            });
        },

        displayMonth: function() {
            var now, year, month;

            now = new Date();
            // var chrismas = new Date(2016, 11, 25);
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;

        },

        changedType: function(){
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' + DOMstrings.inputDescription + ',' + DOMstrings.inputValue
            );
            nodeListForEach(fields, (cur) => {
                cur.classList.toggle('red-focus');
            });

            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },

        getDOMstrings: function () {
            return DOMstrings;
        }
    };
})();


// ==================================================================


var controller = (function (budgetCtrl, UICtrl) {
    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener("click", ctrlAddItem);
        document.addEventListener("keypress", function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

        document.querySelector(DOM.inputType).addEventListener('change',UICtrl.changedType);
    };

    var updateBudget = function () {
        // 1. calculate the budget
        budgetCtrl.calculateBudget();
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);

    };

    var updatePercentages = function() {
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        // 3. Update the UI with the new percentages.
        UICtrl.displayPercentages(percentages);

    };

    var ctrlAddItem = function () {
        var input, newItem;

        // 1. Get the filed input data
        input = UICtrl.getInput();

        if (input.description && !isNaN(input.value) && input.value > 0) {
            // 2. add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
            // 3. add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //4 Clear the fields
            UICtrl.clearField();

            // 5 calculate and update budget
            updateBudget();

            // 6 Calculate and update percentages
            updatePercentages();
        }
    };

    var ctrlDeleteItem = function(event){
        // need the event because we want to know what the target element is.
        var itemID, splitID, type, ID;
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            // inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. delete the item from the data structure.
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);

            // 3. Update and show the new budget
            updateBudget();

            // 4 Calculate and update percentages
            updatePercentages();
        }
    };

    return {
        init: function () {
            console.log("Application has started.");
            UICtrl.displayMonth();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, UIController);

controller.init();