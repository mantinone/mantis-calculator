document.addEventListener("DOMContentLoaded", function(event) {

    var buttons = document.getElementById('allButtons')
    buttons.addEventListener('click', clickButton, false)

  });

  function Calculator() {
    this.displayValue = 0
  }

var c1 = new Calculator()
console.log('CALCULATE', c1.displayValue);

function clickButton ( event ) {
  if( event.target.matches('.calculator-button-operator')){
    handleOperator(event.target.id)
    return
  } else if( event.target.matches('#sign')){
    flipSign()
    return
  } else if( event.target.matches('#percent')){
    percentize()
    return
  } else if( event.target.matches('#dot')){
    decimal()
    return
  } else if( event.target.matches('#clear')){
    clear()
    return
  } else {
    enterNumber(event.target.innerText)
  }
  updateDisplay(event.target.innerText)
}

function enterNumber(op){
  console.log('NUMBER', op);
  updateDisplay(op)
}

function flipSign(){
  console.log('FLIP SIGN')
}

function percentize(){
  console.log('PERCENTAGE');
}

function decimal(){
  console.log('DECIMAL');
}

function handleOperator ( op ){
  console.log('OPERATOR', op);
}

function clear(){
  console.log('CLEAR');
}

function updateDisplay ( info ) {
  document.getElementById('results').innerText = info
}
