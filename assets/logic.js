
    const url = `https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}`;
    const options = {
      method: 'GET',
      headers: {
          'x-rapidapi-key': '25b9d2b2c38027aae95ac20ad2c8fc20',
          'x-rapidapi-host': 'https://home.openweathermap.org/api_keys'
      }
    };