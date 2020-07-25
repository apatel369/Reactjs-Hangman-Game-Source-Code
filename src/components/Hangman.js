import React, { Component } from 'react';
import './Hangman.css';
// import { randomWord } from './Words.js';
// import {Animated} from "react-animated-css";

import step0 from "./images/0.jpg";
import step1 from "./images/1.jpg";
import step2 from "./images/2.jpg";
import step3 from "./images/3.jpg";
import step4 from "./images/4.jpg";
import step5 from "./images/5.jpg";
import step6 from "./images/6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 5,
    images: [step0, step1, step2, step3, step4, step5, step6],
    word: {
      r1: ["popcorn", "ketchup", "lotus", "disappear", 
          "occurrence", "chemistry", "ireland", "zucchini",
          "electrician", "skateboard", "moustache", "microphone",
      "flashlight", "eradicate", "immigration", "industrial"
          ],
      r2: ["necessity/knows/no/law", "if/you/dont/succeed/just/try/again", "better/late/than/never", "no/pain/no/gain",
          "slow/but/steady/wins/the/race", "early/bird/gets/the/worm", "dont/judge/a/book/by/its/cover", "well/begun/is/half/done",
    "make/a/long/story/short", "prevention/is/better/than/cure", "the/ball/is/in/your/court", "action/speak/louder/than/words"],
      r3: ["escalade", "g/wagon", "Huracan", "telluride", "bronco", "pilot", "sienna", "canyon",
          "sentra", "mustang", "cruze", "nexon",
          "murcielago", "ecosport", "veyron", "vantage",
          ]
  }
  }
 
  constructor(props) {
    super(props);
    this.state = {
      mistake: 0,
      maxWrong: 5,
      guessed: new Set([]),
      currentRound: "r1",
      currentWord: 0,
      answer: "demo",
    }
  }
  
  handleGuess = e => {
    let letter = e.target.value;
    // this.state.answer.split("").map((letter, index) => {
    //   return (this.state.guessed.has(letter);
    // };
    this.setState(st => ({
      guessed: st.guessed.add(letter),
      mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1)
    }));
  }

  guessedWord() {
    return this.state.answer.split("").map((letter, index) => {
     return (this.state.guessed.has(letter) ? letter : " _ ")
    })
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz/".split("").map(letter => (
      <button
        className='btn btn-lg btn-primary m-2'
        key={letter}
        value={letter}
        data={this.checkCorrectGuess}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    ));
  }


  resetButton = () => {
    //show alert if max word reached
    
    this.setState({
      mistake: 0,
      guessed: new Set([]),
      currentWord: this.state.currentWord + 1,
      answer: this.props.word[`${this.state.currentRound}`][`${this.state.currentWord}`]
    });
  }

  changeRound(round){
    let maxWrong = round === "r2" ? 6 : 5;
    this.setState({currentWord: 0,
      currentRound: round,
    maxWrong: maxWrong});
  
  }

  render() {
    const gameOver = this.state.mistake >= this.state.maxWrong;
    const isWinner = this.guessedWord().join("") === this.state.answer;
    let gameStat = this.generateButtons();

    if (isWinner) {
      gameStat = <div className="alert alert-success">You Won!!!</div>
    }

    if (gameOver) {
      gameStat = <div className="alert alert-warning">Better luck next time!!!</div>
    }

    return (
      <div className="Hangman container">
        <h4 className='text-center sketch-font'>Save the man{console.log("current Round ", this.state.currentRound, " current Word ", this.state.answer)}</h4>
        <div className="float-right" style={{fontStyle: "italic"}}>Wrong Guesses: <span style={{color: "red"}}>{this.state.mistake}</span> of {this.state.maxWrong}</div>
        
    {/* <div className="float-right">{this.state.currentRound}</div> */}
        <div className="text-center" style={{display: "inline-block",
    width: "100%"}}>
          {(this.state.currentRound==="r1" || this.state.currentRound==="r3") && this.state.mistake===5 ? 
          <img src={this.props.images[this.state.mistake+1]} alt=""/> :
          <img src={this.props.images[this.state.mistake]} alt=""/>} 
          
        </div>
        <div className="text-center">
          {/* <p>Guess the Programming Language:</p> */}
          {/* <p className="my-20"> */}
          <div className="letter my-20">
            {!gameOver ? this.guessedWord() : this.state.answer}
          </div>
          {/* </p> */}
          <div className="text-bold mb-10">{gameStat}</div>
            {/* <Animated animationIn="swing" animationOut="fadeOutDownBig" animationInDuration={3000} animationOutDuration={3000} isVisible={false}>
            <img src={this.props.images[this.state.mistake]} alt=""/>
            </Animated>
          */}
          
          <button className='btn btn-warning mx-2 mt-5' onClick={this.resetButton}>Next Word</button>
          <button className='btn btn-warning mx-2 mt-5' onClick={() => this.changeRound("r1")}>Round 1</button>
          <button className='btn btn-warning mx-2 mt-5' onClick={() => this.changeRound("r2")}>Round 2</button>
          <button className='btn btn-warning mx-2 mt-5' onClick={() => this.changeRound("r3")}>Round 3</button>
        </div>
      </div>
    )
  }
}

export default Hangman;