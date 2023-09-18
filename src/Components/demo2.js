import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Demo2() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://www.universal-tutorial.com/api/getaccesstoken', {
          headers: {
            "Accept": "application/json",
            "api-token": "_6QhkbqS1xix_YwY8SlvaittqQgx1aUT5hkU5e22D5Juen2_298q4IOo-ttYU9g8Xco",
            "user-email": "narendranath.v@arkinfotec.com"
          }
        });
        setAccessToken(response.data.auth_token);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Access Token</h1>
      <p>{accessToken}</p>
    </div>
  );
}

export default Demo2;
