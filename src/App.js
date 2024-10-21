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
    if (fromCurrency && toCurrency) {
      fetch(`https://v6.exchangerate-api.com/v6/462bb1695373c413418f492e/latest/${fromCurrency}`)
        .then(response => response.json())
        .then(data => {
          // Check if data and rates are defined
          if (data && data.rates) {
            setCurrencies([...Object.keys(data.rates)]);
            setExchangeRate(data.rates[toCurrency]);
          } else {
            console.error('Error fetching data:', data);
          }
        })
        .catch(error => {
          console.error('Error with the API request:', error);
        });
    }
  }, [fromCurrency, toCurrency]);

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
          onChange={(e) => setAmount(Number(e.target.value))} 
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

      {result !== null && (
        <div className="result">
          <h3>{amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}</h3>
        </div>
      )}
    </div>
  );
};

export default App;
