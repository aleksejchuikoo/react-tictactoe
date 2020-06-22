import React, {Component} from 'react';
import './App.css';
import Modal from './components/Modal'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(''),
      history: [],
      count: 0,
      win: false,
      draw: false,
      isOpen: false
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

  handlerClick = data => {
    let {history, count, squares, win, draw} = this.state
    let currentSquares = squares;

    if (win === true || draw === true) {
      return currentSquares;
    }

    if (!history.length) {
      currentSquares[data] = count % 2 === 0 ? 'X' : 'O';
      this.setState({
        squares: currentSquares,
        history: [...history, [...currentSquares]],
        count: ++count,
      })      
    }

    for (let i = 0; i < history.length; i++) {
      if (history[i][data] !== '') {
        continue;
      } else if (currentSquares[data] === ''){
        currentSquares[data] = count % 2 === 0 ? 'X' : 'O';
        this.setState({
          squares: currentSquares,
          history: [...history.slice(0, count), [...currentSquares]],
          count: ++count
        }) 
        console.log(count, history);
      }
    }

    this.isWinner();
  }

  isWinner() {
    let {count, squares, win} = this.state
    let {winnerLine} = this;

    this.symb = count % 2 === 0 ? 'X' : 'O';

    for (let i = 0; i < winnerLine.length; i++) {
      let line = winnerLine[i];

      if (squares[line[0]] === this.symb &&
          squares[line[1]] === this.symb &&
          squares[line[2]] === this.symb) {
            this.setState({
              win: true,
              draw: false,
              isOpen: true
            })
          return;
        }

      if (count === 8 && win === false){
          this.setState({
            draw: true,
            isOpen: true
        })
      }
    }
  }

  handlerReset = () => {
    this.setState({
      squares: Array(9).fill(''),
      history: [],
      count: 0,
      win: false,
      draw: false,
    })
  }

  handlerUndo = () => {
    let {history, count, win, draw, squares} = this.state;

    if (win === true || draw === true) {
      return squares;
    }

    if (count > 1) {
      this.setState({
        squares: history[count-2],
        count: --count
      })
      console.log(count, history);
    }
  }

  handlerRedo = () => {
    let {history, count, win, draw, squares} = this.state;

    if (win === true || draw === true) {
      return squares;
    }

    if (count <= history.length - 1) {
      this.setState({
        squares: history[count],
        count: ++count
      })
      console.log(count, history);
    }
  }

  handlerClose = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    let {handlerClick, handlerRedo, handlerReset, handlerUndo, symb, handlerClose} = this;
    let {win, draw, squares, count, isOpen} = this.state;

    return (
      <div className="container">
        <h1 className={win || draw ? 'line-through' : ''}>{count % 2 === 0 ? 'Walks X' : 'Walks O'}</h1>
        <div className="grid" >
          {squares.map( (s, i) => 
             <div className="square" onClick={() => handlerClick(i)} key={i}>{squares[i]}</div>
          )}
        </div>
        <div className="btns">
          <button className="btn btn-undo" onClick={handlerUndo}>Undo</button>
          <button className="btn btn-reset" onClick={handlerReset}>Reset</button>
          <button className="btn btn-redo" onClick={handlerRedo}>Redo</button>
        </div>

        <Modal win={win} draw={draw} isOpen={isOpen} symb={symb} handlerClose={handlerClose}/>
      </div>
    );
  }
}

export default App;