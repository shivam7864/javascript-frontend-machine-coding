import React, { useEffect, useState } from "react";
import CurrencyDropDown from "./CurrencyDropDown";
import { HiArrowsRightLeft } from "react-icons/hi2";
//  https://api.frankfurter.app/currencies
// https://api.frankfurter.app/latest?amount=1&from=USD&to=INR
const CurrencyConvertor = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(2);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || ["INR", "EUR"]
  );

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();

      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
    convertCurrency();
  }, []);

  const convertCurrency = async () => {
    if (!amount) return;
    setConverting(true);
    try {
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      let data = await response.json();
      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
      setConverting(false);
    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

   const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleFavorite = (currency) => {
    let updatedFavorites = [...favorites];

    if (favorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((fav) => fav !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropDown
          favorites={favorites}
          currencies={currencies}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />
        {/* swap currency button */}
        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>
        <CurrencyDropDown
          favorites={favorites}
          currencies={currencies}
          currency={toCurrency}
          setCurrency={setToCurrency}
          title="To:"
          handleFavorite={handleFavorite}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          Converted Amount: {convertedAmount}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
