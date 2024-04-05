import axios from 'axios';
import { assertValidExecutionArguments } from 'graphql/execution/execute';
import React, { useEffect, useState } from 'react'
import DiceData from './DiceData'

export default function DiceRoll() {

    const[diceDataList, setDiceDataList] = useState([{"name": "", "faces": 0}]);
    const[results, setResults] = useState([]);

    const addDiceRow = (e) => {
        e.preventDefault();

        setDiceDataList(diceDataList.concat({"name": "", "faces": 0}));
    }

    const rollTheDices = (e) => {
        const url = "http://localhost:3001/roll"
        e.preventDefault();
        console.log(JSON.stringify(diceDataList));

        axios.post(url, diceDataList)
        .then((response) => {
            console.log(JSON.stringify(response.data.results));
            setResults([...response.data.results]);
        })
        .catch( (error) => {
            console.log(error);
        })

    }

  return (
    <div className="container">
        <div className="container text-center mt-3">
            <h4>Roll a dice!</h4>
        </div>
        <div className="container">
        <form>
            <div className="container text-center">
                <div className="p-2">
                    <button type="submit" onClick={addDiceRow} className="btn btn-primary">Add another dice</button>
                </div>
            </div>
            {diceDataList.map( (dice, index) => (
                <div className="container d-inline-flex justify-content-center ">
                    <div className="d-flex flex-row align-items-top">
                        <div className="p-2">
                            <input type="text" placeholder="Name (optional)" className="form-control"
                                name="dice-name" id={"diceName" + (index + 1)} aria-describedby="nameHelp"
                                onInput={(e) => setDiceDataList( (prevState) => {
                                  const result = [...prevState];
                                  result[index].name = e.target.value;  
                                  return result;
                                })}/>
                        </div>
                        <div className="p-2">
                            <input type="number" placeholder="Faces" className="form-control" name="dice-faces"
                                id={"diceFaces" + (index + 1)} aria-describedby="facesHelp" 
                                onInput={(e) => setDiceDataList( (prevState) => {
                                    const result = [...prevState];
                                    result[index].faces = Number(e.target.value);  
                                    return result;
                                  })}/>
                            <div id="facesHelp" className="form-text">Example: for d6, write 6</div>
                        </div>
                    </div>
                </div>

            ))}
             {  results.length > 0 && (
                <div className='container'>
                        <div className="container">
                            <h5>Results</h5>
                            <ul>
                        { results.map( (e) => (
                                <li>{e.name} rolled a {e.result}</li>
                        ))}
                            </ul>
                        </div>

                </div>            
            )}
            <div className="container text-center">
                <button type="submit" onClick={rollTheDices} className="btn btn-warning">Roll!</button>
            </div>
        </form>

        </div>
    </div>
  )
}
