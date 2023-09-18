import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Cities = ({ apiLink }) => {
    const [states, setStates] = useState([]);
    useEffect(() => {
        axios.get(apiLink, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYXJlbmRyYW5hdGgudkBhcmtpbmZvdGVjLmNvbSIsImFwaV90b2tlbiI6Il82UWhrYnFTMXhpeF9Zd1k4U2x2YWl0dHFRZ3gxYVVUNWhrVTVlMjJENUp1ZW4yXzI5OHE0SU9vLXR0WVU5ZzhYY28ifSwiZXhwIjoxNjk1MDk3Nzk4fQ._zBearsxx7-6oP0h7H6kczZhWiiZG43fYniGVP6LjLM",
                "Accept": "application/json"
            }
        })
            .then(response => {
                const stateNames = response.data.map(states => states.city_name);// geting the city list
                console.log(apiLink)
                setStates(stateNames);
            })
            .catch(error => console.error('Error fetching countries:', error));
    }, [apiLink]);
    return (
        <datalist id="Citylist">
            {states.map((states, index) => (
                <option key={index} value={states} />
            ))}
        </datalist>
    );
};
export default Cities;
