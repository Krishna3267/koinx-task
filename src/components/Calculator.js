import * as React from 'react'
import {useEffect, useState} from 'react'
import { TextField } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import aus from '../assets/aus.png'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
const Calculator = (props) => {
    const [price , setPrice] = useState(0)
    const [sellPrice, setSellPrice] = useState(0)
    const [expenses , setExpenses] = useState(0)
    const [type , setType] = useState("Long Term")
    const [capGain , setCapGain] = useState(0)
    const [discount , setDiscount] = useState(0)
    const [netGain , setNetGain] = useState(0)
    const [incomeRange , setIncomeRange] = useState(0)
    const [tax , setTax] = useState(0)

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const handleSellPrice = (event) => {
        setSellPrice(event.target.value)
    }

    const handleExpenses = (event) => {
        setExpenses(event.target.value); 
    }

    const handleType = (event) => {
        setType(event.target.value)
    }
    
    const handleIncomeRange = (event) => {
        setIncomeRange(event.target.value)
    }
    //For capital gains
    useEffect(() => {
        if (sellPrice !== '' && price !== '' && expenses !== '') {
          const capGainValue = parseFloat(sellPrice) - parseFloat(price) - parseFloat(expenses);
          setCapGain(capGainValue);
        }else{
            setCapGain(0)
        }
    }, [sellPrice, price, expenses]);
    

    //For long term discount 
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
    
    //for netgains
    useEffect(
        () => {
            if(type == "Long Term"){
                const netGainVal = parseFloat(capGain - discount)
                setNetGain(netGainVal)
            }else{
                setNetGain(capGain);
            }
        } , [type, capGain, discount]
    )

    //for tax 

    useEffect(
        () => {
            switch (incomeRange) {
                case 0:
                    setTax(0)
                    break;
                case 1:
                    setTax(parseFloat(19*netGain/100.0))
                    break;
                case 2:
                    setTax(32.5*netGain/100.0)
                    break;
                case 3:
                    setTax(parseFloat(37*netGain/100.0))
                    break;
                case 4:
                    setTax(parseFloat(45*netGain/100.0))
                    break;
                default:
                    break;
            }
        } , [incomeRange , netGain]
    )
     

    return (
        <Box sx={{flexGrow:10}}>
            <Grid container spacing={2}>
                <Grid item xs = {5}>
                    <FormControl fullWidth disabled sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Financial Year</InputLabel>
                        <Select 
                        startAdornment={<InputAdornment position="start">FY</InputAdornment>}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={0}
                        label="Financial Year"
                        >
                            <MenuItem value = {0}>2023-2024</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs = {5}>
                    <FormControl fullWidth disabled sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel>Country</InputLabel>
                        <Select 
                        startAdornment={<InputAdornment position="start">
                            <img height={"20px"} src={aus} alt="AUS" />
                        </InputAdornment>}
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={0}
                        label="Country"
                        >
                            <MenuItem value = {0}>Australia</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            <Grid item xs={5}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Purchase Price</InputLabel>
                    <OutlinedInput
                    size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Purchase Price"
                        value = {price}
                        onChange = {handlePrice}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={5}>
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Sell Price</InputLabel>
                    <OutlinedInput
                    size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Sell Price"
                        value = {sellPrice}
                        onChange = {handleSellPrice}
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {5}>
                <FormControl sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Expenses</InputLabel>
                    <OutlinedInput
                    size='small'
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Expenses"
                        value = {expenses}
                        onChange = {handleExpenses}
                    />
                </FormControl>
            </Grid>
            <Grid item xs = {5}>
                <ToggleButtonGroup
                    size='small'
                        label="Type"
                        color="primary"
                        value={type}
                        exclusive
                        onChange={handleType}
                        aria-label="Investment Type">
                        <ToggleButton value="Long Term">Long Term</ToggleButton>
                        <ToggleButton value="Short Term">Short Term</ToggleButton>
                </ToggleButtonGroup>
            </Grid>
            
            <Grid item xs={5}>
                <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel id="demo-select-small-label">Income Range</InputLabel>
                    <Select 
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={incomeRange}
                    label="Income Range"
                    onChange={handleIncomeRange}>
                        <MenuItem value = {0}>$0 - $18,200</MenuItem>
                        <MenuItem value = {1}>$18,201 - $45,000</MenuItem>
                        <MenuItem value = {2}>$45,001 - $120,000</MenuItem>
                        <MenuItem value = {3}>$120,001 - $180,000</MenuItem>
                        <MenuItem value = {4}>$180,001+</MenuItem>
                    </Select>
                </FormControl>
            </Grid>    
            
            <Grid item xs={5}>
                <div>Tax Rate</div>
                {incomeRange === 0 && (
                    <div>0%</div>
                ) }
                {incomeRange === 1 && (
                    <div>Nil + 19% of excess over $18,200</div>
                ) }
                {incomeRange === 2 && (
                    <div>$5,092 + 32.5% of excess over $45,000</div>
                ) }
                {incomeRange === 3 && (
                    <div>$29,467 + 37% of excess over $120,000</div>
                ) }
                {incomeRange === 4 && (
                    <div>$51,667 + 45% of excess over $180,000</div>
                ) }
            </Grid>
                {
                    type === "Long Term" && capGain > 0 && (
                        <>
                            <Grid item xs={5}>
                                <div>Capital Gain : {capGain}</div>
                            </Grid>
                            <Grid item xs={5}>
                                <div>Discount : {discount}</div>
                            </Grid>
                        </>
                    )
                }
                <Grid item xs={5}>Net Gain : {netGain}</Grid>
                <Grid item xs={5}>Tax : {tax}</Grid>
            </Grid>
        </Box>
    )
}

export default Calculator;