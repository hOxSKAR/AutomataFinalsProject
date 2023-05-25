var canvas = document.getElementById("expressionCanvas");
var ctx = canvas.getContext("2d");
var expression;
var eval;
var validInner = document.getElementById("valid").innerHTML;
const cfgbutton = document.getElementById('cfgbutton');
const cfgoverlay = document.getElementById('cfgoverlay');
const cfg1 = document.getElementById('cfg1');
const cfg2 = document.getElementById('cfg2');
const noexpCFG = document.getElementById('noexpCFG');
const pdabutton = document.getElementById('pdabutton');
const pdaoverlay = document.getElementById('pdaoverlay');
const pda1 = document.getElementById('pda1');
const pda2 = document.getElementById('pda2');
const noexpPDA = document.getElementById('noexpPDA');
const buttonContainer = document.getElementById('simbtn');
const resultDiv = document.getElementById("result");

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

// CFG
cfgbutton.addEventListener('click', function() {
    cfgoverlay.style.display = 'block'; 
    if (expression == "expression1") {
        cfg1.style.display = 'block';
    } else if (expression == "expression2") {
        cfg2.style.display = 'block';
    } else {
        noexpCFG.style.display = 'block';
    }

    // Calculate and set the height of cfgoverlay
    const visiblePopup = cfg1.style.display === "block"
    ? cfg1
    : cfg2.style.display === "block"
    ? cfg2
    : noexpCFG;
    const popupHeight = visiblePopup.offsetHeight;
    cfgoverlay.style.height = `${popupHeight + 20}px`;
});

document.addEventListener('click', function(event) {
    if (!cfgoverlay.contains(event.target) && event.target !== cfgbutton) {
        cfgoverlay.style.display = 'none';
        cfg1.style.display = 'none';
        cfg2.style.display = 'none';
        noexpCFG.style.display = 'none';
    }
});

// PDA
pdabutton.addEventListener('click', function() {
    pdaoverlay.style.display = 'block'; 
    if (expression == "expression1") {
        pda1.style.display = 'block';
    } else if (expression == "expression2") {
        pda2.style.display = 'block';
    } else {
        noexpPDA.style.display = 'block';
    }

    const visiblePopup = pda1.style.display === "block"
    ? pda1
    : pda2.style.display === "block"
    ? pda2
    : noexpPDA;
    const popupHeight = visiblePopup.offsetHeight;
    pdaoverlay.style.height = `${popupHeight + 20}px`;
    const popupWidth = visiblePopup.offsetWidth;
    pdaoverlay.style.width = `${popupWidth + 20}px`;
});

document.addEventListener('click', function(event) {
    if (!pdaoverlay.contains(event.target) && event.target !== pdabutton) {
        pdaoverlay.style.display = 'none';
        pda1.style.display = 'none';
        pda2.style.display = 'none';
        noexpPDA.style.display = 'none';
    }
});

// Expression FAs
function expression1() {
    expression = "expression1";

    //Clears Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the states of the FA
    const q0 = { x: 30, y: 100, starting: true };
    const q1 = { x: 100, y: 100 };
    const q2 = { x: 170, y: 100 };
    const q3 = { x: 240, y: 100 };
    const q4 = { x: 310, y: 100 };
    const q5 = { x: 310, y: 160 };
    const q6 = { x: 380, y: 100 };
    const q7 = { x: 450, y: 100 };
    const q8 = { x: 520, y: 100 };
    const q9 = { x: 450, y: 160 };
    const q10 = { x: 520, y: 160 };
    const q11 = { x: 520, y: 40 };
    const q12 = { x: 590, y: 100 };
    const q13 = { x: 590, y: 40 };
    const q14 = { x: 660, y: 40 };
    const q15 = { x: 590, y: 160 };
    const q16 = { x: 660, y: 160 };
    const q17 = { x: 660, y: 100, accepting: true };

    // Define the transitions of the FA
    const transitions = [
        { from: q0, to: q1, symbol: 'b' },
        { from: q1, to: q2, symbol: 'a,b' },
        { from: q2, to: q3, symbol: 'b' },
        { from: q3, to: q4, symbol: 'a' },
        { from: q3, to: q5, symbol: 'b' },
        { from: q5, to: q7, symbol: 'a' },
        { from: q5, to: q5, symbol: 'b' },
        { from: q4, to: q4, symbol: 'a' },
        { from: q4, to: q6, symbol: 'b' },
        { from: q6, to: q5, symbol: 'b' },
        { from: q6, to: q7, symbol: 'a' },
        { from: q7, to: q8, symbol: 'b' },
        { from: q7, to: q9, symbol: 'a' },
        { from: q9, to: q10, symbol: 'b' },
        { from: q10, to: q7, symbol: 'a' },
        { from: q8, to: q11, symbol: 'a' },
        { from: q11, to: q7, symbol: 'b' },
        { from: q8, to: q12, symbol: 'b' },
        { from: q12, to: q13, symbol: 'a' },
        { from: q12, to: q15, symbol: 'b' },
        { from: q15, to: q16, symbol: 'a' },
        { from: q16, to: q17, symbol: 'b' },
        { from: q13, to: q14, symbol: 'b' },
        { from: q17, to: q17, symbol: 'a,b' },
        { from: q14, to: q17, symbol: 'a' }
    ]

    // Draw the transitions on the canvas
    for (let i = 0; i < transitions.length; i++) {
        //Gets the postion at the edge of the circle
        const { from, to, symbol } = transitions[i];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const angle = Math.atan2(dy, dx);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const radius = 15;
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const arrowSize = 6;

        // draw the line
        ctx.beginPath();
        ctx.moveTo(from.x + radius * cos, from.y + radius * sin);

        ctx.font = "bold 16px Arial";
        if (from === to) {
            // draw a loop arrow
            const loopRadius = 11;
            const labelHeight = 2;
            const labelWidth = ctx.measureText(symbol).width;
            let loopX, loopY, labelX, labelY, loopEndAngle, loopStartAngle;
            let counterAngle = false;
            if (from.y == 100) { //if the state is above
                if (from.accepting) {
                    loopX = from.x - (loopRadius - 37);
                    loopY = from.y;
                    labelX = -labelWidth + 40;
                    labelY = labelHeight - 20;
                    loopEndAngle = 4;
                    loopStartAngle = 1 * Math.PI;
                    counterAngle = true;
                    // label the transition
                    ctx.save();
                    ctx.translate(midX, midY);
                    // Text shadow
                    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    // Text color
                    ctx.fillStyle = "blue";
                    ctx.fillText(symbol, labelX, labelY);
                    ctx.restore();
                } else {
                    loopY = from.y - (loopRadius + 10);
                    loopX = from.x;
                    labelX = -labelWidth / 2;
                    labelY = labelHeight - 45;
                    loopEndAngle = 0.75 * Math.PI;
                    loopStartAngle = 2 * Math.PI;
                    counterAngle = true;
                    // label the transition
                    ctx.save();
                    ctx.translate(midX, midY);
                    // Text shadow
                    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                    ctx.shadowBlur = 4;
                    ctx.shadowOffsetX = 2;
                    ctx.shadowOffsetY = 2;
                    // Text color
                    ctx.fillStyle = "blue";
                    ctx.fillText(symbol, labelX, labelY);
                    ctx.restore();
                }
            } else if (from.y == 160) { //if the state is below
                loopY = from.y + (loopRadius + 10);
                loopX = from.x;
                labelX = -labelWidth / 2;
                labelY = labelHeight + 50;
                loopEndAngle = 4;
                loopStartAngle = 0;
                // label the transition
                ctx.save();
                ctx.translate(midX, midY);
                // Text shadow
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                // Text color
                ctx.fillStyle = "blue";
                ctx.fillText(symbol, labelX, labelY);
                ctx.restore();
            }
            ctx.arc(loopX, loopY, loopRadius, loopStartAngle, loopEndAngle, counterAngle);
            ctx.stroke();

            const arrowAngle = loopEndAngle;

            // Draw an arrowhead at the end of the loop arrow

            const arrowX = loopX + loopRadius * Math.cos(arrowAngle);
            const arrowY = loopY + loopRadius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX + arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX + arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();

        } else {
            // Draw a regular line
            ctx.lineTo(to.x - radius * cos, to.y - radius * sin);
            ctx.stroke();

            const arrowAngle = Math.atan2(to.y - from.y, to.x - from.x);

            // Calculate the coordinates of the arrowhead
            const arrowX = to.x - radius * Math.cos(arrowAngle);
            const arrowY = to.y - radius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            // Draw the arrowhead
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();

            // Label the transition
            ctx.save();
            ctx.translate(midX, midY);
            const labelWidth = ctx.measureText(symbol).width;
            const labelHeight = 2;
            const labelX = -labelWidth / 2;
            const labelY = labelHeight / 2;
            // Text shadow
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            // Text color
            ctx.fillStyle = "blue";
            ctx.fillText(symbol, labelX, labelY);
            ctx.restore();
        }
    }


    // Draw the states on the canvas
    for (let state of
        [q0, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12, q13, q14, q15, q16, q17]) {
        // Circles   
        ctx.beginPath();
        ctx.arc(state.x, state.y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        if (state.starting) {
            // Draw a minus sign at the start state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.stroke();
        }
        else if (state.accepting) {
            // Draw a plus sign at the final state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.moveTo(state.x, state.y - 7);
            ctx.lineTo(state.x, state.y + 7);
            ctx.stroke();
        }
        else {
            ctx.font = "bold 16px Arial";
            const text = state === q16 ? "16" :
                state === q15 ? "15" :
                    state === q14 ? "14" :
                        state === q13 ? "13" :
                            state === q12 ? "12" :
                                state === q11 ? "11" :
                                    state === q10 ? "10" :
                                        state === q9 ? "9" :
                                            state === q8 ? "8" :
                                                state === q7 ? "7" :
                                                    state === q6 ? "6" :
                                                        state === q5 ? "5" :
                                                            state === q4 ? "4" :
                                                                state === q3 ? "3" :
                                                                    state === q2 ? "2" :
                                                                        state === q1 ? "1" :
                                                                            state === q0 ? "0" : "?";
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, state.x - textWidth / 2, state.y + 5);
        }
    }
}

function expression2() {
    expression = "expression2";

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define the states of the FA
    const q0 = { x: 30, y: 100, starting: true };
    const q1 = { x: 187.5, y: 100 };
    const q2 = { x: 187.5, y: 160 };
    const q3 = { x: 345, y: 100 };
    const q4 = { x: 345, y: 220 };
    const q5 = { x: 502.5, y: 100 };
    const q6 = { x: 502.5, y: 160 };
    const q7 = { x: 660, y: 100 };
    const q8 = { x: 660, y: 220, accepting: true };

    const transitions = [
        { from: q0, to: q1, symbol: '0' },
        { from: q0, to: q0, symbol: '1' },
        { from: q1, to: q2, symbol: '0' },
        { from: q2, to: q3, symbol: '0,1' },
        { from: q1, to: q3, symbol: '1' },
        { from: q3, to: q4, symbol: '0' },
        { from: q3, to: q5, symbol: '1' },
        { from: q5, to: q7, symbol: '1' },
        { from: q5, to: q6, symbol: '0' },
        { from: q6, to: q8, symbol: '0,1' },
        { from: q7, to: q8, symbol: '1' },
        { from: q7, to: q6, symbol: '0' },
        { from: q4, to: q8, symbol: '0' },
        { from: q8, to: q8, symbol: '1,0' },
    ]

    // Draw the transitions on the canvas
    for (let i = 0; i < transitions.length; i++) {
        //Gets the postion at the edge of the circle
        const { from, to, symbol } = transitions[i];
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const angle = Math.atan2(dy, dx);
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const radius = 15;
        const midX = (from.x + to.x) / 2;
        const midY = (from.y + to.y) / 2;
        const arrowSize = 6;

        // draw the line
        ctx.beginPath();
        ctx.moveTo(from.x + radius * cos, from.y + radius * sin);
        
        ctx.font = "bold 16px Arial";
        if (from === to) {
            const loopRadius = 11;
            const labelHeight = 2;
            const labelWidth = ctx.measureText(symbol).width;
            let loopX, loopY, labelX, labelY, loopEndAngle, loopStartAngle;
            let counterAngle = false;

            if (from.y == 100) {
                loopY = from.y - (loopRadius + 10);
                loopX = from.x;
                labelX = -labelWidth / 2;
                labelY = labelHeight - 45;
                loopEndAngle = 0.75 * Math.PI;
                loopStartAngle = 2 * Math.PI;
                counterAngle = true;
                // label the transition
                ctx.save();
                ctx.translate(midX, midY);
                // Text shadow
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;
                // Text color
                ctx.fillStyle = "blue";
                ctx.fillText(symbol, labelX, labelY);
                ctx.restore();
            } else { //if the state is below
                loopY = from.y + (loopRadius + 10);
                loopX = from.x;
                labelX = -labelWidth / 2;
                labelY = labelHeight + 50;
                loopEndAngle = 4;
                loopStartAngle = 0;
                // label the transition
                ctx.save();
                ctx.translate(midX, midY);
                // Text shadow
                ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
                ctx.shadowBlur = 4;
                ctx.shadowOffsetX = 2;
                ctx.shadowOffsetY = 2;

                // Text color
                ctx.fillStyle = "blue";
                ctx.fillText(symbol, labelX, labelY);
                ctx.restore();
            }
            ctx.arc(loopX, loopY, loopRadius, loopStartAngle, loopEndAngle, counterAngle);
            ctx.stroke();
            const arrowAngle = loopEndAngle;

            // Draw an arrowhead at the end of the loop arrow

            const arrowX = loopX + loopRadius * Math.cos(arrowAngle);
            const arrowY = loopY + loopRadius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX + arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX + arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();
        } else {
            // Draw a regular line
            ctx.lineTo(to.x - radius * cos, to.y - radius * sin);
            ctx.stroke();

            const arrowAngle = Math.atan2(to.y - from.y, to.x - from.x);

            // Calculate the coordinates of the arrowhead
            const arrowX = to.x - radius * Math.cos(arrowAngle);
            const arrowY = to.y - radius * Math.sin(arrowAngle);
            const arrowPoint1X = arrowX - arrowSize * Math.cos(arrowAngle - Math.PI / 6);
            const arrowPoint1Y = arrowY - arrowSize * Math.sin(arrowAngle - Math.PI / 6);
            const arrowPoint2X = arrowX - arrowSize * Math.cos(arrowAngle + Math.PI / 6);
            const arrowPoint2Y = arrowY - arrowSize * Math.sin(arrowAngle + Math.PI / 6);

            // Draw the arrowhead
            ctx.beginPath();
            ctx.moveTo(arrowX, arrowY);
            ctx.lineTo(arrowPoint1X, arrowPoint1Y);
            ctx.lineTo(arrowPoint2X, arrowPoint2Y);
            ctx.closePath();
            ctx.fill();

            // Label the transition
            ctx.save();
            ctx.translate(midX, midY);
            const labelWidth = ctx.measureText(symbol).width;
            const labelHeight = 2;
            const labelX = -labelWidth / 2;
            const labelY = labelHeight / 2;

            // Text shadow
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
            ctx.shadowBlur = 4;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;

            // Text color
            ctx.fillStyle = "blue";
            ctx.fillText(symbol, labelX, labelY);
            ctx.restore();
        }
    }


    // Draw the states on the canvas
    for (let state of
        [q0, q1, q2, q3, q4, q5, q6, q7, q8]) {
        // Circles    
        ctx.beginPath();
        ctx.arc(state.x, state.y, 15, 0, 2 * Math.PI);
        ctx.stroke();
        if (state.starting) {
            // Draw a minus sign at the start state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.stroke();
        }
        else if (state.accepting) {
            // Draw a plus sign at the final state
            ctx.moveTo(state.x - 7, state.y);
            ctx.lineTo(state.x + 7, state.y);
            ctx.moveTo(state.x, state.y - 7);
            ctx.lineTo(state.x, state.y + 7);
            ctx.stroke();
        }
        else {
            ctx.font = "bold 16px Arial";
            const text = state === q8 ? "8" :
                state === q7 ? "7" :
                    state === q6 ? "6" :
                        state === q5 ? "5" :
                            state === q4 ? "4" :
                                state === q3 ? "3" :
                                    state === q2 ? "2" :
                                        state === q1 ? "1" :
                                            state === q0 ? "0" : "?";
            const textWidth = ctx.measureText(text).width;
            ctx.fillText(text, state.x - textWidth / 2, state.y + 5);
        }
    }
}

function updateLineNumbers() {
    var codeInput = document.getElementById('input');
    var lineNumbers = document.querySelector('.linenum');
    
    var lines = codeInput.value.split('\n');
    var lineNumbersHTML = '';
    
    for (var i = 0; i < lines.length; i++) {
      lineNumbersHTML += i + 1 + '\n';
    }
    
    lineNumbers.textContent = lineNumbersHTML;
  }
  
  // Add event listener to the code input
  var codeInput = document.getElementById('input');
  codeInput.addEventListener('input', updateLineNumbers);
  
  // Initial update of line numbers
  updateLineNumbers();  

// Button generator
function generateButtons(lines) {
    for (let i = 0; i < lines.length; i++) {
      const button = document.createElement('button');
      button.textContent = 'Simulate String #' + (i + 1);
      button.classList.add('simbtn');
      button.addEventListener('click', () => simulateString(lines[i]));
  
      buttonContainer.appendChild(button);
    }
}

// Generate Results
function generateResult(results, resultDiv) {
    results.forEach(text => {
        const p = document.createElement('p');
        p.textContent = text;
        resultDiv.appendChild(p);
    })
}

function eval() {
    // Textarea getting
    let userInput = document.getElementById("input");
    let lines = userInput.value.split("\n");
    const expression1 = '(bab+bbb)(a*b*)(a*+b*)(ba)*(aba)(bab+aba)*bb(a+b)*(bab+aba)(a+b)*';
    const expression2 = '(1+0)*1*0*(101+01+000)(1+0)*(101+00)*(111+00+101)(1+0)*';
    var results = [];
    
    // Remove spaces from each line
    lines = lines.map(line => line.replace(/\s/g, ""));

    switch (expression) {
        case "expression1":
            // validate input
            for (let i = 0; i < lines.length; i++) {
                if (!/^[ab]*$/.test(lines[i])) {
                    alert("Expression 1 can only contain 'a' or 'b'");
                    return;
                }
                // validation code here
            }
            break;
        case "expression2":
            // validate input
            for (let i = 0; i < lines.length; i++) {
                if (!/^[01]*$/.test(lines[i])) {
                    alert("Expression 2 can only contain '0' or '1'");
                    return;
                }
                // validation code here
            }
            break;
        default:
            alert("Please enter expressions to be evaluated.");
    }
    buttonContainer.innerHTML = '';
    generateButtons(lines);
    generateResults(results, resultDiv);
}

// Simulate code
function simulateString(line) {
    // enter code here
}