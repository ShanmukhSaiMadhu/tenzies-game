import React,{useState} from 'react';
import {nanoid} from 'nanoid'
import './App.css';
import Die from './components/Die';

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

  const diceElements = dice.map(die => <Die key={die.id} value={die.value} />)

  const rollDice = () => {
    setDice(allNewDice())
  }

  return (
    <main>
      <h1>Tenzies</h1>
      <div className='inner-container'>
        
        <div className='dice-container'>
          {diceElements}
        </div>
        <button onClick={rollDice} className='roll-dice'>Roll</button>
      </div>
      
    </main>
  );
}

export default App;
