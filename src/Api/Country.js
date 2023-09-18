import React, { useState, useEffect } from 'react';
import axios from 'axios';
const Country = ({ apiLink }) => {
    const [countries, setCountries] = useState([]);
    useEffect(() => {
        axios.get(apiLink, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJuYXJlbmRyYW5hdGgudkBhcmtpbmZvdGVjLmNvbSIsImFwaV90b2tlbiI6Il82UWhrYnFTMXhpeF9Zd1k4U2x2YWl0dHFRZ3gxYVVUNWhrVTVlMjJENUp1ZW4yXzI5OHE0SU9vLXR0WVU5ZzhYY28ifSwiZXhwIjoxNjk1MDk3Nzk4fQ._zBearsxx7-6oP0h7H6kczZhWiiZG43fYniGVP6LjLM",
                "Accept": "application/json"
            }
        })
        .then(response => {
            console.log("hii",response)
            const countryNames = response.data.map(country => country.country_name);

            setCountries(countryNames);
        })
        .catch(error => console.error('Error fetching countries:', error));
    }, [apiLink]);
    return (
        <datalist id="datalistOptions">
            {countries.map((country, index) => (
                <option key={index} value={country} />
            ))}
        </datalist>
    );
};
export default Country;
