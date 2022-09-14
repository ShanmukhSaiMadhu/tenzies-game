import React,{useState, useEffect} from 'react';
import {nanoid} from 'nanoid'
import './App.css';
import Die from './components/Die';
import Confetti from "react-confetti"


function App() {

  const allNewDice = () => {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(
        {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid()
        }
      )
    }
    return newDice
  }

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const sameValue = dice.every(die => die.value === firstValue)

    if(allHeld && sameValue) {
      setTenzies(true)
    }
  }, [dice]) 

  function holdDice(id) {
    setDice(oldDie => oldDie.map((x) => {
      return x.id === id ? {...x, isHeld: true} : x
    }))
  }

  const diceElements = dice.map(die => (
      <Die 
        key={die.id} 
        value={die.value} 
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    ))

  const rollDice = () => {
    setDice(oldDie => oldDie.map(die => {
      return die.isHeld ? 
        die : 
        {...die, value: Math.ceil(Math.random() * 6)}
    }))
  }

  const reset = () => {
    setDice(allNewDice())
    setTenzies(false)
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='inner-container'>
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        {tenzies ? <button onClick={reset} className='roll-dice'>New Game</button> : <button onClick={rollDice} className='roll-dice'>Roll</button>}
      </div>
    </main>
  );
}

export default App;
