import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Demo() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.universal-tutorial.com/api/states/india', {
          headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYXJlbmRyYW5hdGgudkBhcmtpbmZvdGVjLmNvbSIsImFwaV90b2tlbiI6Il82UWhrYnFTMXhpeF9Zd1k4U2x2YWl0dHFRZ3gxYVVUNWhrVTVlMjJENUp1ZW4yXzI5OHE0SU9vLXR0WVU5ZzhYY28ifSwiZXhwIjoxNjk0NjA5MzI0fQ.FV8Emj6ESq2Pd6ns2UREBDsgA9q8nPacz6R1wvxULNg",
            "Accept": "application/json"
          }
        });
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Country List</h1>
      <ul>
        {countries.map(country => (
          <li key={country.state_name}>{country.state_name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Demo;
