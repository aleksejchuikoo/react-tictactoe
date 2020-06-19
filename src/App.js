import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      count: 0,
      win: false,
      draw: false
    }

    this.winnerLine = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]

    this.symb = ''
  }

  handlerClick = event => {
    let data = event.target.getAttribute("data")
    let currentSquares = this.state.squares;

    if (this.state.win === true || this.state.draw === true) {
      return currentSquares;
    }

    if (currentSquares[data] === null) {
      currentSquares[data] = this.state.count % 2 === 0 ? 'X' : 'O';
      this.setState({
        squares: currentSquares,
        count: this.state.count + 1
      })
    } else {
      return currentSquares;
    }

    this.isWinner();
  }

  isWinner() {
    this.symb = this.state.count % 2 === 0 ? 'X' : 'O';

    for (let i = 0; i < this.winnerLine.length; i++) {
      let line = this.winnerLine[i];

      if (this.state.squares[line[0]] === this.symb &&
          this.state.squares[line[1]] === this.symb &&
          this.state.squares[line[2]] === this.symb) {
            this.setState({
              win: true,
              draw: false
            })
          return;
        }

      if (this.state.count === 8 && this.state.win === false){
          this.setState({
            draw: true
        })
      }
    }
  }

  handlerReset = () => {
    this.setState({
      squares: Array(9).fill(null),
      count: 0,
      win: false,
      draw: false,
    })
  }

  render() {
    return (
      <div className="container">
        <button className="btn-reset" onClick={this.handlerReset}>Reset</button>
        <h1>{this.state.count % 2 === 0 ? 'Walks X' : 'Walks O'}</h1>
        <div className="grid" >
          {this.state.squares.map( (s, i) => 
             <div className="square" onClick={this.handlerClick} key={i} data={i}>{this.state.squares[i]}</div>
          )}
          <h1 style={{color: 'red'}}>{this.state.win ? `Winner ${this.symb}` : ''}</h1>
          <h1 style={{color: 'blue'}}>{this.state.draw ? `DRAW!` : ''}</h1>
        </div>
      </div>
    );
  }
}

export default App;