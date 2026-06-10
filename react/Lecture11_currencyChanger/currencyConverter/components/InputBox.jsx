import React from 'react';

export default function InputBox({
    label,
    value,
    onValueChange,
    currencyOptions=[],
    selectCurrency,
    onCurrencyChange,
    amountDisabled=false
}){
    return(
        <>
        <div className="card">
            <div className="upper" style={{display:"flex",flexDirection:'row', justifyContent:"space-between" , paddingLeft:"3rem" , paddingRight:"3rem"}}>
                <p style={{color:"wheat"}}>{label}</p>
                <p style={{color:"wheat"}}>Currency Type</p>
            </div>

            <div className="lower"  style={{display:"flex",flexDirection:'row', justifyContent:"space-between" , paddingLeft:"3rem" , paddingRight:"3rem"}}>
                <input type="number" 
                    value={value}
                    onChange={(e)=>{

                        onValueChange && onValueChange(e.target.value)
                    }}
                    readOnly={amountDisabled}

                />
                <select name="" id=""  value={selectCurrency}  onChange={(e)=>{
                    onCurrencyChange && onCurrencyChange(e.target.value)
                }}>
                    <option value="select" disabled>--select--</option>
                    {currencyOptions.map((currency)=>{
                        return (
                            <option key={currency} value={currency}>{currency}</option>
                        )
                    })}
                    
                </select>
            </div>


        </div>
        </>
    )
}