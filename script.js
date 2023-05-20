var canvas = document.getElementById("expressionCanvas");
var ctx = canvas.getContext("2d");
var expression;
var eval;
var validInner = document.getElementById("valid").innerHTML;

// Textarea getting
let userInput = document.getElementById("input");
let lines = userInput.value.split("\n");

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function selectExpression() {
    document.getElementById("expressions").classList.toggle("show");
}
  
// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.btn')) {
        var dropdowns = document.getElementsByClassName("expressions");
        var i;
    for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
            }
        }
    }
};

// Expression FAs
function expression1() {
    expression = "expression1";
    
    //canvas drawing of the FA
    ctx.beginPath();
    ctx.arc(30, 40, 15, 0, 2 * Math.PI);
    ctx.stroke();
}

function expression2() {
    expression = "expression2";

    //canvas drawing of the FA
}

// Expression Evaluation
function eval() {
    switch (expression) {
        case "expression1":
            //enter expression validation logic
            break;
        case "expression2":
            //enter expression validation logic
            break;
        default:
            alert("Please enter expressions to be evaluated.");
    }
}

// Printing out of expressions and evaluation
function printOut(expression, status) {
    let final = [];

    // Button maker
    let btn = document.createElement("button");
    btn.innerHTML = "Simulate?";
    btn.onclick = simulate();
    btn.class = "btn";

    for (let i = 0; i < lines.length; i++) {
        final.push({
            Expression: "" + expression,
            Evaluation: "" + status,
            Simulate: ""
        });
    }

    // Code creating table using JS objects...
}

// Simulation Animations
function simulate() {
    // Enter code
}

// Arrow maker - used in FA diagram