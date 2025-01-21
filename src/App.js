import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState({ value: 'USD', label: 'USD' });
  const [toCurrency, setToCurrency] = useState({ value: 'EUR', label: 'EUR' });
  const [amount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [result, setResult] = useState(null);
  const API_KEY = '462bb1695373c413418f492e';

  // Fetch currency data when the component mounts and when currency changes
  useEffect(() => {
    fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency.value}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch exchange rates');
        }
        return response.json();
      })
      .then((data) => {
        const currencyOptions = Object.keys(data.conversion_rates).map((currency) => ({
          value: currency,
          label: currency,
        }));
        setCurrencies(currencyOptions);
        setExchangeRate(data.conversion_rates[toCurrency.value]);
      })
      .catch((error) => {
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
    <div className="App container py-4">
      <h2 className="text-center mb-4">Currency Converter</h2>

      <div className="converter card p-4 shadow-sm">
        <div className="row g-3 align-items-center">
          {/* Amount Input */}
          <div className="col-12 col-md-4">
            <input
              type="number"
              className="form-control"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
            />
          </div>

          {/* From Currency Dropdown */}
          <div className="col-12 col-md-3">
            <Select
              options={currencies}
              value={fromCurrency}
              onChange={(selectedOption) => setFromCurrency(selectedOption)}
              placeholder="From Currency"
            />
          </div>

          <div className="col-auto d-none d-md-block">to</div>

          {/* To Currency Dropdown */}
          <div className="col-12 col-md-3">
            <Select
              options={currencies}
              value={toCurrency}
              onChange={(selectedOption) => setToCurrency(selectedOption)}
              placeholder="To Currency"
            />
          </div>

          {/* Convert Button */}
          <div className="col-12 col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={convertCurrency}
            >
              Convert
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="result mt-4 text-center">
          <h3 className="text-success">
            {amount} {fromCurrency.value} = {result.toFixed(2)} {toCurrency.value}
          </h3>
        </div>
      )}

      {/* Footer */}
      <footer className="footer mt-5 text-center">
        <p className="text-muted">
          2024 | All Rights Reserved. Designed by{' '}
          <a
            href="https://www.facebook.com/smugsolutions/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Smug Solutions
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
