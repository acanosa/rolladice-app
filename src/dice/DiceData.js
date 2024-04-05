import React from 'react'

export default function DiceData({numberOfDice, setDiceStatus}) {

    var dice = {
        "name": "",
        "faces": 0
    }

    const setDiceName = (e) => {
        dice.name = e.target.value;
        setDiceStatus(dice, numberOfDice);
    }

    const setDiceFaces = (e) => {
        dice.faces = e.target.value;
        setDiceStatus(dice, numberOfDice);
    }

  return (
    <div className="container d-inline-flex justify-content-center ">
        <div className="d-flex flex-row align-items-top">
            <div className="p-2">
                <input type="text" placeholder="Name (optional)" className="form-control"
                    name="dice-name" id={"diceName" + numberOfDice} aria-describedby="nameHelp"
                    onChange={setDiceName}/>
            </div>
            <div className="p-2">
                <input type="number" placeholder="Faces" className="form-control" name="dice-faces"
                     id={"diceFaces" + numberOfDice} aria-describedby="facesHelp" 
                     onChange={setDiceFaces}/>
                <div id="facesHelp" className="form-text">Example: for d6, write 6</div>
            </div>
        </div>
    </div>
  )
}
