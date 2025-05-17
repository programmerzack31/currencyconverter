import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [toCurrency, setToCurrency] = useState('EUR');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState({});
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);
  const [error, setError] = useState(null); // To handle error

  const apiKey = `5e81415a79883fcde213ac4d`;

  useEffect(() => {
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;

    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before making a request
      try {
        const response = await axios.get(apiUrl);
        const rates = response.data.conversion_rates;
        setCurrencies(Object.keys(rates));
        setExchangeRate(rates[toCurrency]);
      } catch (error) {
        setError("Something went wrong. Please try again later.");
        console.error("Error fetching currency data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromCurrency, toCurrency]);

  const convertedAmount = (amount * (exchangeRate || 0)).toFixed(2);

  return (
    <div className='app'>
     <h1>Currency Converter</h1>
      
      <input 
        placeholder='Enter Amount you want to convert' 
        onChange={(e) => setAmount(e.target.value)} 
        type='number' 
      /> 
      <div className='selectbox'>
        <label>Select Currencies </label><br/>
      <span>From:     </span><select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select> <span>     </span>

      <span>To:     </span> <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      </div>

      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}

      
      {!loading && !error && (
        <h2>
          {amount} {fromCurrency} = {convertedAmount} {toCurrency}
        </h2>
      )}
       <h1> hello </h1>
    </div>
  );
};

export default App;
