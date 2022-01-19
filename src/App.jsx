import { Component } from 'react';
import './App.css';

const scaleNames = {
  'c': 'Celsius',
  'f': 'Fahrenheit'
}

const toCelsius = fahrenheit => (fahrenheit - 32) * 5 / 9;

const toFahrenheit = celsius => (celsius * 9 / 5) + 32;

const tryConvert = (temperature, convertor) => {
  const input = parseFloat(temperature);

  if (Number.isNaN(input)) return '';

  const output = convertor(input);

  const rounded = Math.round((output * 1000)) / 1000;

  return rounded.toString();
}

class BoilingVerdict extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    const isBounding = this.props.celsius >= 100;

    return (
      <>
        {isBounding && <p>boiling point!</p>}
      </>
    )
  }
}

class Temperature extends Component {
  constructor(props) {
    super(props);

    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler({target}) {
    this.props.onTemperatureChange(target.value);
  }

  render() {
    const scale = this.props.scale;
    const temperature = this.props.temperature;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input type="text" value={temperature} onChange={this.changeHandler}/>
      </fieldset>
    )
  }
}

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      temperature: '',
      scale: 'c'
    }

    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
  }

  handleCelsiusChange(temperature) {
    this.setState({
      temperature: temperature,
      scale: 'c'
    })
  }

  handleFahrenheitChange(temperature) {
    this.setState({
      temperature: temperature,
      scale: 'c'
    })
  }

  render() {
    const scale = this.state.scale;

    const temperature = this.state.temperature;

    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;

    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <>
        <Temperature scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <Temperature scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        <BoilingVerdict celsius={celsius}/>
      </>
    )
  }
}

function App() {
  return (
    <div className="App">
      <Calculator></Calculator>
    </div>
  )
}

export default App
