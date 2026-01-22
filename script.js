// variables
const display = document.querySelector("#display");
const equalBtn = document.querySelector("#equal-btn");
const clearBtn = document.querySelector("#clear-btn");
const numBtn = document.querySelectorAll(".num-btn");
const opBtn = document.querySelectorAll(".op-btn");
const pointBtn = document.querySelector("#floating-point");
const negativeBtn = document.querySelector("#negative");

/* OPERATION VARIABLES */
let leftNumber = "";
let rightNumber = "";
let operator = "";
/* ---------------- */

// math functions
const add = (a, b) => Number(a) + Number(b);
const sub = (a, b) => Number(a) - Number(b);
const mult = (a, b) => Number(a) * Number(b);
const div = (a, b) => (Number(b) === 0 ? "Error" : Number(a) / Number(b));

// calculation function
const operate = (num1, num2, op) => {
    if (op === "+") return add(num1, num2);
    if (op === "-") return sub(num1, num2);
    if (op === "x") return mult(num1, num2);
    if (op === "/") return div(num1, num2);
};

// functions
const checkError = () => {
    if (display.textContent === "Error") clearVars();
};

const roundingFunc = num => {
    if (num === "Error") return num;
    if (num === parseInt(num)) return num;
    return num.toFixed(2);
};

const updateNumbers = digit => {
    checkError();
    if (!operator) {
        leftNumber += digit;
        display.textContent = leftNumber;
    } else {
        rightNumber += digit;
        display.textContent = rightNumber;
    }
};

const updateOperator = sign => {
    checkError();
    if (/\d/.test(display.textContent) && !leftNumber) {
        leftNumber = display.textContent;
        operator = sign;
        return;
    }
    if (!leftNumber) return;
    if (display.textContent === "." || display.textContent === "-") return;
    if (operator && !rightNumber) return;
    if (operator && rightNumber) {
        updateResult(getResult(leftNumber, rightNumber, operator));
        leftNumber = display.textContent;
        rightNumber = "";
        operator = sign;
    } else {
        operator = sign;
    }
};

const equalFunc = () => {
    checkError();
    if (!leftNumber || !operator || !rightNumber) return;
    updateResult(getResult(leftNumber, rightNumber, operator));
    clearVars();
};

const decPointFunc = () => {
    if (display.textContent.includes(".")) return;
    updateNumbers(".");
};

const negativeNumber = num => (num[0] === "-" ? num.slice(1) : "-" + num);

const negativeFunc = () => {
    if (display.textContent === "Error") clearVars();
    if (!operator) {
        leftNumber = negativeNumber(leftNumber);
        display.textContent = leftNumber;
    } else {
        rightNumber = negativeNumber(rightNumber);
        display.textContent = rightNumber;
    }
};

const getResult = (num1, num2, op) => roundingFunc(operate(num1, num2, op));

const updateResult = res => {
    display.textContent = res;
};

const clearFunc = () => {
    clearVars();
    display.textContent = "";
};

const clearVars = () => {
    leftNumber = "";
    rightNumber = "";
    operator = "";
};

// event listeners
numBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        updateNumbers(btn.textContent);
    });
});

opBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        updateOperator(btn.textContent);
    });
});

equalBtn.addEventListener("click", equalFunc);
pointBtn.addEventListener("click", decPointFunc);
negativeBtn.addEventListener("click", negativeFunc);
clearBtn.addEventListener("click", clearFunc);

// key buttons
window.addEventListener("keydown", e => {
    if (e.key === "c") {
        clearFunc();
    } else if (e.key === "Enter") {
        equalFunc();
    } else if (/\d/.test(e.key)) {
        updateNumbers(e.key);
    } else if (["+", "-", "/"].includes(e.key)) {
        updateOperator(e.key);
    } else if (e.key === "*") {
        updateOperator("x");
    } else if (e.key === ".") {
        decPointFunc();
    } else if (e.key === "_") {
        negativeFunc();
    }
});
