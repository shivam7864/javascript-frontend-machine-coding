import React, { useEffect, useRef, useState } from "react";
const CHECKOUT_STEPS = [
  {
    name: "Customer Info",
    Component: () => <div>Provide your contact details.</div>,
  },
  {
    name: "Shipping Info",
    Component: () => <div>Enter your shipping address.</div>,
  },
  {
    name: "Payment",
    Component: () => <div>Complete payment for your order.</div>,
  },
  {
    name: "Delivered",
    Component: () => <div> Your order has been delivered.</div>,
  },
];

const Stepper = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isComplete, setIsComplete] = useState(false);
  const [margins, setMargins] = useState({
    marginLeft: 0,
    marginRight: 0,
  });

  const stepRef = useRef([]);

   useEffect(() => {
    setMargins({
      marginLeft: stepRef.current[0].offsetWidth / 2,
      marginRight: stepRef.current[CHECKOUT_STEPS.length - 1].offsetWidth / 2,
    });
  }, [stepRef, CHECKOUT_STEPS.length]);


  const handleNext = () => {
    setCurrentStep((prevStep) => {
      if (prevStep === CHECKOUT_STEPS.length) {
        setIsComplete(true);
        return prevStep;
      } else {
        return prevStep + 1;
      }
    });
  };

  const calculateProgressBarWidth = () => {
    return ((currentStep - 1) / (CHECKOUT_STEPS.length - 1)) * 100;
  };

  const ActiveComponent = CHECKOUT_STEPS[currentStep - 1]?.Component;
  return (
    <>
      <div className="stepper">
        {CHECKOUT_STEPS.map((step, index) => {
          return (
            <div
              key={step.name}
                ref={(el) => (stepRef.current[index] = el)}
              className={`step ${
                currentStep > index + 1 || isComplete ? "complete" : ""
              } ${currentStep === index + 1 ? "active" : ""} `}
            >
              <div className="step-number">
                {currentStep > index + 1 || isComplete ? (
                  <span>&#10003;</span>
                ) : (
                  index + 1
                )}
              </div>
              <div className="step-name">{step.name}</div>
            </div>
          );
        })}
        <div
          className="progress-bar"
          style={
            {
              width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
              marginLeft: margins.marginLeft,
              marginRight: margins.marginRight,
            }
          }
        >
          <div
            className="progress"
            style={{ width: `${calculateProgressBarWidth()}%` }}
          ></div>
        </div>
      </div>

      <ActiveComponent />

      {!isComplete && (
        <button onClick={handleNext}>
          {" "}
          {currentStep === CHECKOUT_STEPS.length ? "Finish" : "Next"}{" "}
        </button>
      )}
    </>
  );
};

export default Stepper;
