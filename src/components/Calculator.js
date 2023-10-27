import * as React from 'react'
import {useEffect, useState} from 'react'
import { TextField } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
const Calculator = (props) => {
    const [price , setPrice] = useState(0)
    const [sellPrice, setSellPrice] = useState(0)
    const [expenses , setExpenses] = useState(0)
    const [type , setType] = useState("Long Term")
    const [capGain , setCapGain] = useState(0)
    const [discount , setDiscount] = useState(0)
    const [netGain , setNetGain] = useState(0)

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleSellPrice = (event) => {
        setSellPrice(event.target.value)
    }

    const handleExpenses = (event) => {
        setExpenses(event.target.value); 
    }

    useEffect(() => {
        if (sellPrice !== '' && price !== '' && expenses !== '') {
          const capGainValue = parseFloat(sellPrice) - parseFloat(price) - parseFloat(expenses);
          setCapGain(capGainValue);
        }
    }, [sellPrice, price, expenses]);
    
    useEffect(
        () => {
            if(capGain > 0 && type == "Long Term"){
                const discountValue = parseFloat(capGain*0.5)
                setDiscount(discountValue)
            }else{
                setDiscount(0)
            }
        } , [type, capGain]
    )

    const handleType = (event) => {
        setType(event.target.value)
    }


    const handleNetGain = (event) => {
        setNetGain(event.target.value)
    } 
    
    return (
        <div className='calculator'>
            <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
                shrink: true,
              }}
            value = {price}
            onChange = {handlePrice}
            />
            <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
                shrink: true,
              }}
            value = {sellPrice}
            onChange = {handleSellPrice}
            />
            <TextField
            id="outlined-number"
            label="Number"
            type="number"
            InputLabelProps={{
                shrink: true,
              }}
            value = {expenses}
            onChange = {handleExpenses}
            />
            <ToggleButtonGroup
            color="primary"
      value={type}
      exclusive
      onChange={handleType}
      aria-label="Investment Type">
                <ToggleButton value="Long Term">Long Term</ToggleButton>
                <ToggleButton value="Short Term">Short Term</ToggleButton>
            </ToggleButtonGroup>
            {/* <h2>cap gain : {capGain}</h2> */}
            {
                type === "Long Term" && capGain > 0 && (
                    <div>
                        <div>Capital Gain : {capGain}</div>
                        <div>Long Term Investment Discount : {discount}</div>
                    </div>
                )
            }
        </div>
    )
}

export default Calculator;