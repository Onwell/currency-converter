import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [result, setResult] = useState(null);
  const API_KEY = '462bb1695373c413418f492e';

  // Fetch currency data when the component mounts and when currency changes
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        return response.json();
      })
      .then(data => {
        setCurrencies([...Object.keys(data.conversion_rates)]);
        setExchangeRate(data.conversion_rates[toCurrency]);
      })
      .catch(error => {
        console.error('Error fetching exchange rates:', error);
      });
  }, [fromCurrency, toCurrency]);

  const convertCurrency = () => {
    setResult(amount * exchangeRate);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  return (
    <div className="App">
      <h2>Currency Converter</h2>
      
      <div className="converter">
        <input 
          type="number" 
          value={amount} 
          onChange={handleAmountChange} 
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

      {/* Footer */}
      <footer className="footer">
        <p>2024 | All Rights Reserved. Designed by <a href="https://www.facebook.com/smugsolutions/" target="_blank" rel="noopener noreferrer">Smug Solutions</a></p>
      </footer>
    </div>
  );
};

export default App;
