import "./App.css";
import React from "react";
import update from "immutability-helper";
import * as math from "mathjs";
// math = require("/usr/local/lib/node_modules/mathjs");
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
    };
  }
  calculateOperations = () => {
    let result = this.state.operations.join("");
    if (result) {
      result = math.evaluate(result);
      result = math.format(result, { precision: 14 });
      result = String(result);
      this.setState({
        operations: [result],
      });
    }
  };
  handleClick = (e) => {
    const value = e.target.getAttribute("data-value");
    switch (value) {
      case "clear":
        this.setState({
          operations: [],
        });
        break;
      case "equal":
        this.calculateOperations();
        break;
      default:
        const newOperations = update(this.state.operations, {
          $push: [value],
        });
        this.setState({
          operations: newOperations,
        });
        break;
    }
  };
  render() {
    return (
      <div className="App">
        <Display data={this.state.operations} />
        <Buttons>
          <Button onClick={this.handleClick} value="clear" label="C" />
          <Button onClick={this.handleClick} value="7" label="7" />
          <Button onClick={this.handleClick} value="4" label="4" />
          <Button onClick={this.handleClick} value="1" label="1" />
          <Button onClick={this.handleClick} value="0" label="0" />
          <Button onClick={this.handleClick} value="/" label="/" />
          <Button onClick={this.handleClick} value="8" label="8" />
          <Button onClick={this.handleClick} value="5" label="5" />
          <Button onClick={this.handleClick} value="2" label="2" />
          <Button onClick={this.handleClick} value="." label="." />
          <Button onClick={this.handleClick} value="x" label="x" />
          <Button onClick={this.handleClick} value="9" label="9" />
          <Button onClick={this.handleClick} value="6" label="6" />
          <Button onClick={this.handleClick} value="3" label="3" />
          <Button value="null" label="" />
          <Button onClick={this.handleClick} value="-" label="-" />
          <Button onClick={this.handleClick} value="+" label="+" size="2" />
          <Button onClick={this.handleClick} value="equal" label="=" />
        </Buttons>
      </div>
    );
  }
}

class Display extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const string = this.props.data.join("");
    return <div className="Display">{string}</div>;
  }
}

class Buttons extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return <div className="Buttons">{this.props.children}</div>;
  }
}
class Button extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <div
        className="Button"
        onClick={this.props.onClick}
        data-size={this.props.size}
        data-value={this.props.value}
      >
        {this.props.label}
      </div>
    );
  }
}

export default App;
