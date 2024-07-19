import './App.css'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRuler, faWeight, faVenusMars } from '@fortawesome/free-solid-svg-icons';

       
       
const App = () => {
  const [activate, setActivate] = useState(false);
  const [ready, setReady] = useState([false,false,false,false])
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [weight, setWeight] = useState("");
    
  const [gender, setGender] = useState('');
  const [bmi, setBmi] = useState("");
  const [remarks, setRemarks] = useState("");
  const [clicked, setClicked] = useState(false)


  const handleFeet = (e) => {
    
    const value = e.target.value === "" ? "" : parseInt(e.target.value)
    if(value !== ""){
      setReady([true,ready[1],ready[2],ready[3]])
    }else{
      setReady([false,ready[1],ready[2],ready[3]])
    }

    if(value < 10){
      setFeet(prevFeet => value)
    }
  }
  const handleInch = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value)
    if(value !== ""){
      setReady([ready[0],true,ready[2],ready[3]])
    }else{
      setReady([ready[0],false,ready[2],ready[3]])
    }
    if(value < 11){
      setInches(prevInch => value)
    }
  }
  const handleWeight = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value)
    if(value !== ""){
      setReady([ready[0], ready[1], true,ready[3]])
    }else{
      setReady([ready[0], ready[1], false,ready[3]])
    }
    if(value < 600){
      setWeight(prevWeight => value)
    }
  }
  
  const handleGender = (e) => {
    if(e.target.value !== ""){
      setReady([ready[0],ready[1],ready[2],true])   
    }else{
      setReady([ready[0],ready[1],ready[2],false])  
    }
 
   setGender(e.target.value)
  }


  const check = () => {
    if(feet == "" || weight == ""){
      alert("Fill up all sections")
      return
    }
    if(feet == 0 || weight == 0){
      alert("Height or weight can't be Zero!")
    }
    const newheight = (feet * 12) + inches
    const meter = newheight / 39.37
    const newweight = (weight / 2.205)
    const bmi = newweight / (meter ** 2)
    
    setBmi(bmi.toFixed(2))
    if(bmi < 18.5){
      setRemarks("You are Underweight!")
    }else if(bmi >= 18.5 && bmi <= 24.9){
      setRemarks("You are good to go!")
    }else if(bmi >= 25 && bmi <= 29.9){
      setRemarks("You are Overweight!")
    }else if(bmi >= 30){
      setRemarks("You are Obese!")
    }
    setClicked(true)
  

}
  

  const clear = () => {
    setClicked(false)
    setFeet("");
    setInches("");
    setWeight("");
    setGender("male");
    setBmi("");
    setRemarks("");
    setReady([false,false,false,false])
    setActivate(false)
  }
  useEffect(() => {
    if(ready[0] && ready[1] && ready[2]){
      setActivate(true)
    
    }
    if(ready[0] == false || ready[1] == false || ready[2] == false){
        setActivate(false)
    }
    return() => {
      if(ready[0] == false || ready[1] == false || ready[2] == false){
        setActivate(false)
      }
    }
  },[ready])
  
  return (
    <>
     <header>
       <img style={{borderRadius: '50%', marginLeft: '10px'}} src="logo.png" alt="logo" width="45" height="45" />
       <h1 className="headerText">Heldy</h1>
       <small style={{margin: '10px 0 0 5px'}}>Body Max Index</small>
     </header>

    <div className="blockDiv">
       <h3 style={{textDecoration: 'underline'}}>BMI CLASSIFICATION - ADULT</h3>
        <h4>Ideal Weight: <span style={{fontSize: '1.1rem', fontFamily: 'monospace'}}>128.8 lb</span></h4>
        
  
      <h4>Body Fat: <span style={{fontSize: '1.1rem', fontFamily: 'monospace'}}>28.7%</span></h4>
      <h4>Ideal BMI: <span style={{fontSize: '1.1rem', fontFamily: 'monospace'}}>18.5 - 24</span></h4>   
      <h3 style={{textDecoration: 'underline'}}>RESULT CLASSIFICATION </h3>
      <h4 style={{backgroundColor: 'orange'}}>Underweight BMI: <span style={{fontSize: '1.1rem', fontFamily: 'monospace'}}> &lt; 18.5</span></h4>

      <h4 style={{backgroundColor: 'green'}}>Normal BMI: <span style={{fontSize: '1.1rem', fontFamily: 'monospace'}}> 18.5 - 24 </span></h4>
      <h4 style={{backgroundColor: 'red'}}>Overweight BMI: <span style={{fontSize: '1.1rem', fontFamily: 'monospace'}}> 25 - 29.9 </span></h4>
    </div>
      <hr style={{marginTop: '30px'}}/>
       <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
        
      <div className='happen' style={{height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '30px'}}>
        
              <div className="secDiv">
                <h3><FontAwesomeIcon icon={faRuler} style={{marginRight: '10px'}} /> Height:</h3>
                <input onChange={handleFeet} value={feet} type="number" placeholder="ft" />
                <input onChange={handleInch} value={inches} type="number" placeholder="inch" />
              </div>

              <div className="secDiv">
                <h3><FontAwesomeIcon icon={faWeight} style={{marginRight: '10px'}} /> Weight(lb):</h3>
                <input type="number" placeholder="lb" value={weight} onChange={handleWeight} />
              </div>

              <div className="secDiv">
                <h3><FontAwesomeIcon icon={faVenusMars} style={{marginRight: '10px'}} /> Gender:</h3>
                <select value={gender} onChange={handleGender}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

        <div style={{marginTop: '25px', marginBottom: '45px'}} className="secDiv">
          <button className="check" onClick={check} style={{pointerEvents: activate ? 'auto' : 'none', backgroundColor: activate ? 'green' : 'gray'}}>Check BMI</button>
        <button className="reset" onClick={clear}>Reset</button>
        </div>
      <div style={{display: clicked ? 'block' : 'none'}} className="remarks">
        <h4 style={{marginTop: '5px'}}>BMI SCORE: <span style={{fontSize: '1.1rem', fontFamily: 'monospace', color: 'green'}}> {bmi} </span></h4>
        <h4 style={{marginTop: '15px'}}>Remarks: <span style={{fontSize: '0.9rem', fontFamily: 'monospace'}}> {remarks}</span></h4>
      
      </div>
    </div>
              </div>
      <footer>
        AlivexemTech, 2024. All rights reserved.
      </footer>
      
    </>
  )
}

export default App
