import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Fetch currency data when the component mounts
    fetch('https://api.exchangerate-api.com/v4/latest/USD')
      .then(response => response.json())
      .then(data => {
        setCurrencies([...Object.keys(data.rates)]);
        setExchangeRate(data.rates[toCurrency]);
      });
  }, [toCurrency]);

  const convertCurrency = () => {
    setResult(amount * exchangeRate);
  };

  return (
    <div className="App">
      <h2>Currency Converter</h2>
      
      <div className="converter">
        <input 
          type="number" 
          value={amount} 
          onChange={(e) => setAmount(e.target.value)} 
        />
        
        <select 
          value={fromCurrency} 
          onChange={(e) => setFromCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        
        <span>to</span>
        
        <select 
          value={toCurrency} 
          onChange={(e) => setToCurrency(e.target.value)}
        >
          {currencies.map(currency => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
        
        <button onClick={convertCurrency}>
          Convert
        </button>
      </div>

      {result && (
        <div className="result">
          <h3>{amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
