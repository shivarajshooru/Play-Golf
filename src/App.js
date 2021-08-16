import React, { Component, useState } from "react";
import "./styles.css";

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: 0, x: 0, y: 0, started: false };
    this.timerInt = null;
    this.gameStart = this.gameStart.bind(this);
    this.keyListener = this.keyListener.bind(this);
  }

  gameStart() {
    this.setState({
      started: true
    });
    this.timerInt = setInterval(
      () => this.setState({ time: this.state.time + 1 }),
      1 * 1000
    );
    document.addEventListener("keydown", this.keyListener);
  }

  keyListener(evt) {
    if (this.state.started) {
      if (evt.keyCode === 37) {
        this.setState({ x: this.state.x - 5 });
      } else if (evt.keyCode === 38) {
        this.setState({ y: this.state.y - 5 });
      } else if (evt.keyCode === 39) {
        this.setState({ x: this.state.x + 5 });
      } else if (evt.keyCode === 40) {
        this.setState({ y: this.state.y + 5 });
      }
    }
  }

  componentDidMount() {}

  componentDidUpdate() {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.timerInt);
      document.removeEventListener("keydown", this.keyListener);
      const p = document.createElement("p");
      p.innerHTML = "you won the game";
      document.body.appendChild(p);
    }
  }

  componentWillUnmount() {}

  render() {
    return (
      <>
        {!this.state.started ? (
          <button className="start" onClick={this.gameStart}>
            start
          </button>
        ) : (
          <>
            <div
              className="ball"
              style={{ left: this.state.x + "px", top: this.state.y + "px" }}
            ></div>
          </>
        )}
        <div className="hole" style={{ left: "250px", top: "250px" }}></div>
        <div className="heading-timer">{this.state.time}</div>
      </>
    );
  }
}

export default Timer;
