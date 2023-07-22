let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetcontainer = false

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.getElementById('equalsBtn')
const clearButton = document.getElementById('clearBtn')
const deleteButton = document.getElementById('deleteBtn')
const pointButton = document.getElementById('pointBtn')
const lastOperationcontainer = document.getElementById('lastOperationcontainer')
const currentOperationcontainer = document.getElementById('currentOperationcontainer')

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
clearButton.addEventListener('click', clear)
deleteButton.addEventListener('click', deleteNumber)
pointButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (currentOperationcontainer.textContent === '0' || shouldResetcontainer)
    resetcontainer()
  currentOperationcontainer.textContent += number
}

function resetcontainer() {
  currentOperationcontainer.textContent = ''
  shouldResetcontainer = false
}

function clear() {
  currentOperationcontainer.textContent = '0'
  lastOperationcontainer.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetcontainer) resetcontainer()
  if (currentOperationcontainer.textContent === '')
    currentOperationcontainer.textContent = '0'
  if (currentOperationcontainer.textContent.includes('.')) return
  currentOperationcontainer.textContent += '.'
}

function deleteNumber() {
  currentOperationcontainer.textContent = currentOperationcontainer.textContent
    .toString()
    .slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate()
  firstOperand = currentOperationcontainer.textContent
  currentOperation = operator
  lastOperationcontainer.textContent = `${firstOperand} ${currentOperation}`
  shouldResetcontainer = true
}

function evaluate() {
  if (currentOperation === null || shouldResetcontainer) return
  if (currentOperation === '÷' && currentOperationcontainer.textContent === '0') {
    alert("You can't divide by 0!")
    return
  }
  secondOperand = currentOperationcontainer.textContent
  currentOperationcontainer.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )
  lastOperationcontainer.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`
  currentOperation = null
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function add(a, b) {
  return a + b
}

function substract(a, b) {
  return a - b
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
  return a / b
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b)
    case '−':
      return substract(a, b)
    case '×':
      return multiply(a, b)
    case '÷':
      if (b === 0) return null
      else return divide(a, b)
    default:
      return null
  }
}