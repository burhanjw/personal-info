import React, { useState, useEffect } from 'react';
import './App.css';
import ContactDetails from './components/ContactDetails'

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer); // Clear the timer on component unmount
    };
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="container">
      <h1>{getGreeting()}!</h1>
      <ContactDetails />
    </div>
  );
}

export default App;
