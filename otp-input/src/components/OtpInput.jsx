import React, { useEffect, useRef, useState } from "react";

const OtpInput = () => {
  const OTP_length = 5;
  const [inputArr, setInputArr] = useState(new Array(OTP_length).fill(""));

  const refArr = useRef([]);

  useEffect(() => {
    refArr.current[0]?.focus();
  }, []);

  const handleOnChange = (value, index) => {
    const newValue = value.trim();
    if (newValue === "") return;
    if (isNaN(newValue)) return;
    const newArr = [...inputArr];
    // newArr[index]=value%10;
    newArr[index] = newValue.slice(-1);

    setInputArr(newArr);
    refArr.current[index + 1]?.focus();
  };

  const handleKeyDown = (e, index) => {
    // if (e.key === "Backspace") {
    //   refArr.current[index - 1]?.focus(); //This will delete the previous box value as it will first focus on the previous input box  and performs backspace
    // }

    if (e.key === "Backspace") {
      const newArr = [...inputArr];
      newArr[index] = "";
      setInputArr(newArr);
      refArr.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    const digits = pastedData.replace(/\D/g, "").slice(0, OTP_length);
    const newArr = [...inputArr];
    for (let i = 0; i < digits.length; i++) {
      newArr[i] = digits[i];
      refArr.current[i].value = digits[i];
    }
    setInputArr(newArr);
    const nextIndex =
      digits.length < OTP_length ? digits.length : OTP_length - 1;
    refArr.current[nextIndex]?.focus();
  };
  return (
    <div className="container">
      <h1>OTP Input Box</h1>
      {inputArr?.map((digit, index) => (
        <input
          key={index}
          className="otp-input"
          type="text"
          value={inputArr[index]}
          ref={(input) => {
            refArr.current[index] = input;
          }}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onChange={(e) => handleOnChange(e.target.value, index)}
          onPaste={(e) => handlePaste(e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
