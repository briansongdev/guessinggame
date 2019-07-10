import React from "react";
import "./App.css";
import { runInThisContext } from "vm";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.checkNumber = this.checkNumber.bind(this);
    this.checkIfBlank = this.checkIfBlank.bind(this);
    this.state = {
      a: 0,
      number: 0,
      number1: 9999999,
      goodorbad: 0,
      isDisabled: true,
      value1: NaN,
      value2: NaN,
      output1: 0,
      output2: 0
    };
  }
  handleKeyPress = event => {
    if (event.key === "Enter") {
      document.getElementById("button").click();
    }
  };
  checkNumber() {
    const text = document.getElementById("yo").value;
    const text1 = document.getElementById("yoi");
    console.log(this.state.a);
    this.setState({
      number: this.state.number + 1,
      value2: this.state.value1,
      value1: text,
      output2: this.state.output1
    });
    if (text > this.state.a) {
      this.setState(
        { goodorbad: this.state.goodorbad + 1, output1: "high" },
        this.moveAnalyzer
      );
      text1.innerHTML = "Too High!";
    } else if (text < this.state.a) {
      this.setState(
        { goodorbad: this.state.goodorbad - 1, output1: "low" },
        this.moveAnalyzer
      );
      text1.innerHTML = "Too Low!";
    } else if (text == this.state.a) {
      this.setState(
        {
          a: Math.ceil(Math.random() * document.getElementById("inputt").value),
          number: 0,
          number1: Math.min(this.state.number, this.state.number1),
          goodorbad: 0
        },
        this.moveAnalyzer
      );
      text1.innerHTML = "Good job! You guessed it!";
      document.getElementById("h41").style.display = "block";
    }
  }
  moveAnalyzer() {
    let a1 = this.state.value2;
    console.log(this.state.goodorbad);
    if (this.state.goodorbad <= -1 && !Number.isNaN(a1)) {
      document.getElementById("yooi").innerHTML =
        "Going a bit low! Your previous two numbers were " +
        this.state.value1 +
        " and " +
        this.state.value2 +
        " with respective outputs of " +
        this.state.output1 +
        " and " +
        this.state.output2 +
        ", so try to make a better judgement!";
    } else if (this.state.goodorbad >= 1 && !Number.isNaN(a1)) {
      document.getElementById("yooi").innerHTML =
        "Going a bit high! Your previous two numbers were " +
        this.state.value1 +
        " and " +
        this.state.value2 +
        " with respective outputs of " +
        this.state.output1 +
        " and " +
        this.state.output2 +
        ", so try to make a better judgement!"; ////
    } else if (this.state.goodorbad == 0) {
      if (document.getElementById("yo").value == this.state.a) {
        document.getElementById("yooi").innerHTML = "Your guess was SPOT-ON! ";
        if (this.state.number >= document.getElementById("inputt").value / 20) {
          document.getElementById("yooi").innerHTML +=
            "However, it took you higher than the average amount of tries for your selected maximum number, which is " +
            document.getElementById("inputt").value / 20 -
            1 +
            ".";
        } else {
          document.getElementById("yooi").innerHTML +=
            "Wow! You nailed it in a very low amount of tries!";
        }
      }
    } else {
    }
  }
  checkANumber() {
    let executed = false;
    if (!executed) {
      executed = true;
      this.setState({
        a: Math.ceil(Math.random() * document.getElementById("inputt").value)
      });
    }
  }
  checkIfBlank() {
    if (
      document.getElementById("yo").value != "" &&
      document.getElementById("inputt").value != ""
    ) {
      this.setState({ isDisabled: false });
      this.checkANumber();
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    return (
      <div>
        <div id="second" className="App">
          <h2>
            Guess a number between 1 and {"    "}
            <input
              id="inputt"
              type="number"
              placeholder="a number of your choice..."
              onChange={this.checkIfBlank}
            />{" "}
          </h2>
          <input
            onKeyPress={this.handleKeyPress}
            id="yo"
            type="number"
            placeholder="Number"
            onChange={this.checkIfBlank}
          />
          <p> </p>
          <button
            id="button"
            disabled={this.state.isDisabled}
            onClick={this.checkNumber}
          >
            Check!
          </button>
          <h3 id="yoi" />
          <h4> Guesses so far: {this.state.number}</h4>
          <h4 id="h41" style={{ display: "none" }}>
            Beat your record of {this.state.number1}!
          </h4>
        </div>
        <div id="first" className="App">
          <h4>
            {" "}
            Move Analyzer: Gives you some hints on your current situation and
            where to go.{" "}
          </h4>
          <h3 id="yooi"> Start guessing! </h3>
        </div>
      </div>
    );
  }
}

export default App;
