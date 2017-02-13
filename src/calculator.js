document.addEventListener("DOMContentLoaded", function(event) {

    var buttons = document.getElementById('allButtons')
    buttons.addEventListener('click', clickButton)
    document.addEventListener('keypress', clickButton)

  });

function pressKey( key ){
  var button = document.getElementById('equals')
  
}

function clickButton ( event ) {
  var target = event.target
  var key = event.key || null

  if( key !== null ){
    pressKey(key)
  }

  if( target.matches('#equals') || key === '=' || key === 'Enter' ){
    c1.doEquals()
    return
  } else if(
    target.matches('.calculator-button-operator')
    || key === '+'
    || key === '-'
    || key === '*'
    || key === '/'){

      if( key === null ){
        c1.handleOperator(target.id)
      } else {
        c1.handleOperator(key)
      }
      return
  } else if( target.matches('#sign') || key === 's' || key === 'S'){
    c1.flipSign()
    return
  } else if( target.matches('#percent') || key === '%' ){
    c1.percentize()
    return
  } else if( target.matches('#dot') || key === '.'){
    c1.decimal()
    return
  } else if( target.matches('#clear') || key === 'c' || key === 'C' ){
    c1.clear()
    return
  } else {
    if ( key === null ){
      c1.enterNumber(target.innerText)
    } else {
      if ( /[0-9]/.test(key))
      c1.enterNumber(key)
    }
  }
}

function Calculator() {
  this.displayValue = '0'
}

Calculator.prototype = {

  currentOperator: null,
  currentOperand: null,
  currentTotal: null,
  hasDecimal: false,
  overwrite: false,
  saveOp: false,

  enterNumber: function( digit ){
    if( this.displayValue === '0' || this.overwrite ){
      this.overwrite = false
      this.displayValue = digit==='.' ? '0' : ''
    }
    this.displayValue += digit
    this.updateDisplay()
  },

  flipSign: function(){
    this.displayValue = this.displayValue * -1
    this.currentOperand = this.displayValue
    this.enableOverwrite()
    this.updateDisplay()
  },

  percentize: function(){
    //TODO Make this work for real
    this.displayValue = this.displayValue/100
    this.enableOverwrite()
    this.updateDisplay()
  },

  decimal: function(){
    if( !this.hasDecimal ){
      this.hasDecimal = true
      this.enterNumber('.')
    }
  },

  handleOperator: function( op ){
    this.currentOperator = op
    if ( !this.overwrite ){
      this.saveOp = true
      this.resolveEquation()
    }
    this.currentTotal = this.displayValue
    this.currentOperand = this.displayValue
    this.enableOverwrite()
    this.saveOp = true
  },

  resolveEquation: function(){
    if ( this.saveOp && !this.overwrite ){
      this.currentOperand = this.displayValue
      this.saveOp = false
    }
    if( this.currentTotal !== null ){
      this.currentTotal = this.selectOperation( parseFloat(this.currentTotal), parseFloat(this.currentOperand) || null, this.currentOperator )
      this.displayValue = this.currentTotal
    }
    this.enableOverwrite()
    this.updateDisplay()
  },

  selectOperation( x, y, op ){
    let operations = {
      '+': function(x,y) { return x + y },
      '-': function(x,y) { return x - y },
      '*': function(x,y) { return x * y },
      '/': function(x,y) { return x / y }
    }
    return operations[op]( x, y )
  },

  doEquals: function(){
    // if( !this.overwrite ){
    //   this.currentOperand = this.displayValue
    // }
    this.resolveEquation()
  },

  clear: function(){
    this.displayValue = '0'
    this.hasDecimal = false
    this.currentOperand = null
    this.currentOperator = null
    this.currentTotal = null
    this.updateDisplay()
  },

  enableOverwrite(){
    this.overwrite = true
    this.hasDecimal = false
  },

  updateDisplay: function() {
    document.getElementById('results').innerText = this.displayValue
  }

}

var c1 = new Calculator()
