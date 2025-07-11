import React, { useState } from "react";
import PasswordStrengthIndicator from "./StrengthChecker";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [isPassGenerated, setIsPassGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState("");
  const [copied, setCopied] = useState(false);

  const createPassword = (characters, passwordLength) => {
    let result = "";
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const generatePasswordString = (passwordLength) => {
    let characterList = "";

    const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowerCaseChars = "abcdefghijklmnopqrstuvwxyz";
    const digitChars = "0123456789";
    const specialChars = "!@#$%^&*()_+";

    if (lowerCase) characterList += lowerCaseChars;
    if (upperCase) characterList += upperCaseChars;
    if (numbers) characterList += digitChars;
    if (symbols) characterList += specialChars;

    if (characterList === "") {
      alert("Please select at least one character type.");
      return;
    }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const resetPassword = () => {
    setPassword("");
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
    setPasswordLength(0);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="password">
      <h2>Password Generator</h2>

      <label>
        <input
          type="checkbox"
          checked={lowerCase}
          onChange={() => setLowerCase(!lowerCase)}
        />
        Lowercase
      </label>

      <label>
        <input
          type="checkbox"
          checked={upperCase}
          onChange={() => setUpperCase(!upperCase)}
        />
        Uppercase
      </label>

      <label>
        <input
          type="checkbox"
          checked={numbers}
          onChange={() => setNumbers(!numbers)}
        />
        Numbers
      </label>

      <label>
        <input
          type="checkbox"
          checked={symbols}
          onChange={() => setSymbols(!symbols)}
        />
        Symbols
      </label>

      <label>
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(e.target.value)}
        />
        Password Length
      </label>
      <button
        className="generateBtn"
        disabled={passwordLength < 1}
        onClick={() => generatePasswordString(passwordLength)}
      >
        Generate Password
      </button>
      <button
        className="resetbtn"
        disabled={passwordLength < 1}
        onClick={resetPassword}
      >
        Reset Password
      </button>

      {isPassGenerated && password.length > 0 && (
        <div>
          <p>
            <strong>Generated Password:</strong> {password}
          </p>
          <button onClick={handleCopy}>{copied ? "Copied" : "copy"}</button>
        </div>
      )}
      {passwordLength > 0 && <PasswordStrengthIndicator password={password}/>}
    </div>
  );
};

export default PasswordGenerator;
