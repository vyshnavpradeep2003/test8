import React, { Component } from 'react';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      displayValue: '0',
      operand1: null,
      operator: null,
      waitingForOperand: false,
    };
  }

  inputDigit = (digit) => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false,
      });
    } else {
      this.setState({
        displayValue: displayValue === '0' ? String(digit) : displayValue + digit,
      });
    }
  };

  inputDecimal = () => {
    const { displayValue, waitingForOperand } = this.state;

    if (waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false,
      });
    } else if (displayValue.indexOf('.') === -1) {
      this.setState({
        displayValue: displayValue + '.',
      });
    }
  };

  inputOperator = (nextOperator) => {
    const { displayValue, operand1, operator } = this.state;
    const inputValue = parseFloat(displayValue);

    if (operand1 == null) {
      this.setState({
        operand1: inputValue,
        waitingForOperand: true,
        operator: nextOperator,
      });
    } else if (operator) {
      const result = this.performOperation();
      this.setState({
        displayValue: String(result),
        operand1: result,
        waitingForOperand: true,
        operator: nextOperator,
      });
    }
  };

  performOperation = () => {
    const { operand1, operator, displayValue } = this.state;
    const inputValue = parseFloat(displayValue);

    if (operator === '+') {
      return operand1 + inputValue;
    } else if (operator === '-') {
      return operand1 - inputValue;
    } else if (operator === 'x') {
      return operand1 * inputValue;
    } else if (operator === '/') {
      return operand1 / inputValue;
    }

    return inputValue;
  };

  handleEquals = () => {
    const { operator } = this.state;

    if (!operator) return;

    const result = this.performOperation();

    this.setState({
      displayValue: String(result),
      operand1: result,
      operator: null,
      waitingForOperand: true,
    });
  };
  handleBackspace = () => {
    const { displayValue } = this.state;
    const newValue = displayValue.slice(0, -1);
    this.setState({
      displayValue: newValue === '' ? '0' : newValue,
    });
  };
  render() {
    const { displayValue } = this.state;

    return (
      <div className="calculator">
        <div className="display">{displayValue}</div>
        <div className="buttons">
          <button onClick={this.handleBackspace}>Backspace</button>
          <br/>
          <button onClick={() => this.inputDigit(7)}>7</button>
          <button onClick={() => this.inputDigit(8)}>8</button>
          <button onClick={() => this.inputDigit(9)}>9</button>
          <button onClick={() => this.inputOperator('+')}>+</button>
          <br/>
          <button onClick={() => this.inputDigit(4)}>4</button>
          <button onClick={() => this.inputDigit(5)}>5</button>
          <button onClick={() => this.inputDigit(6)}>6</button>
          <button onClick={() => this.inputOperator('-')}>-</button>
          <br/>
          <button onClick={() => this.inputDigit(1)}>1</button>
          <button onClick={() => this.inputDigit(2)}>2</button>
          <button onClick={() => this.inputDigit(3)}>3</button>
          <button onClick={() => this.inputOperator('x')}>x</button>
          <br/>
          <button onClick={() => this.inputDigit(0)}>0</button>
          <button onClick={this.inputDecimal}>.</button>
          
          <button onClick={this.handleEquals}>=</button>
          <button onClick={() => this.inputOperator('/')}>/</button>
          
        </div>
      </div>
    );
  }
}

export default Calculator;
