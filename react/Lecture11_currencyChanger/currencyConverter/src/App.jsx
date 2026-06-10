import { useState } from 'react'
import { InputBox } from '../components'

import './App.css'
import useCurrencyInfo from '../hooks/useCurrencyInfo'

function App() {
  let [amount,setAmount]=useState(0);
  let [from,setFrom]=useState("usd");
  const [convertedAmount,setConvertedAmount]=useState(0)
  let [to,setTo]=useState("inr");


  function handleSwap(){
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  }

  let currencyInfo=useCurrencyInfo(from);

  const options=Object.keys(currencyInfo);

  return (
    <><h1 style={{textAlign:'center',color:'black',fontSize:'3rem'}}>Currency Converter</h1>

    <div className="main">
      <div className="box">
        <InputBox className="from"
        label="from"
        value={amount}
        onValueChange={setAmount}
        
        currencyOptions={options}
        selectCurrency={from}
        onCurrencyChange={setFrom}
        amountDisabled={false}



        />
        <button onClick={handleSwap}>swap</button>
        <InputBox 
          className="to"
          label="to"
          
          value={convertedAmount}
         
          currencyOptions={options}
          selectCurrency={to}
          onCurrencyChange={setTo}
          amountDisabled={true}
        
         />
        <button onClick={()=>{
          setConvertedAmount((amount*currencyInfo[to]).toFixed(3))
        }}>Convert {from} to {to}</button>
      </div>
    </div>
    </>
  )
}

export default App
