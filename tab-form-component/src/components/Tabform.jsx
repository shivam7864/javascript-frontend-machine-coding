import React, { useState } from "react";
import Profile from "./profile";
import Interest from "./interest";
import Settings from "./settings";

const Tabform = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const [values, setValues] = useState({
    name: "",
    age: "",
    email: "",
    cricket: false,
    badminton: false,
    coding: false,
    vollyball: false,
    settings: "",
  });

  const [errors, setError] = useState({
    name: null,
    age: null,
    email: null,
  });

  const handleSubmitForm = () => {
    const newErrors = {
      name: null,
      age: null,
      email: null,
    };

    let hasError = false;

    if (values?.name?.length < 5) {
      newErrors.name = "Name should be at least 5 characters.";
      hasError = true;
    }

    if (parseInt(values?.age) < 18) {
      newErrors.age = "Age should be at least 18 years.";
      hasError = true;
    }

    // (Optional) Add email format check
    if (!/\S+@\S+\.\S+/.test(values?.email)) {
      newErrors.email = "Please enter a valid email address.";
      hasError = true;
    }

    setError(newErrors);

    // Show the first error if any
    if (newErrors.name) {
      alert(newErrors.name);
      return;
    } else if (newErrors.age) {
      alert(newErrors.age);
      return;
    } else if (newErrors.email) {
      alert(newErrors.email);
      return;
    }

    // ✅ If no error, submit
    console.log("Submitted values:", values);
    setValues({
      name: "",
      age: "",
      email: "",
      cricket: false,
      badminton: false,
      volleyball: false,
      setting: "",
    });
    setError({
      name: null,
      age: null,
      email: null,
    });
  };

  const handleReset = () => {
    setValues({
      name: "",
      age: "",
      email: "",
      cricket: false,
      badminton: false,
      volleyball: false,
      setting: "",
    });
    setError({
      name: null,
      age: null,
      email: null,
    });
  };

  const handleChange = (value, key) => {
    console.log(typeof key);
    const val = key;
    setValues({
      ...values,
      [key]: value,
    });
    console.log(key);
  };

  const tabs = [
    {
      name: "Profile",
      component: (
        <Profile
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          errors={errors}
        />
      ),
      isActive: activeTab === "Profile",
    },
    {
      name: "Interest",
      component: (
        <Interest
          handleChange={handleChange}
          values={values}
          setValues={setValues}
        />
      ),
      isActive: activeTab === "Interest",
    },
    {
      name: "Settings",
      component: (
        <Settings
          handleChange={handleChange}
          values={values}
          setValues={setValues}
          errors={errors}
          handleSubmitForm={handleSubmitForm}
          handleReset={handleReset}
        />
      ),
      isActive: activeTab === "Settings",
    },
  ];

  return (
    <div className="tab-container">
      <div className="heading-container">
        {tabs.map((item) => (
          <>
            <h6 className="heading" onClick={() => setActiveTab(item?.name)}>
              {item?.name}
            </h6>
          </>
        ))}
      </div>
      {tabs.map((item) => (
        <>{item?.isActive && item?.component}</>
      ))}
    </div>
  );
};

export default Tabform;
