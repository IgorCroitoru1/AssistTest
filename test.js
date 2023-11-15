const axios = require('axios');

async function fetchData() {
    try {
      const response = await axios.get('https://www.arbeitnow.com/api/job-board-api');
        const l = response.data.data.length
      console.log('Response:', response.data.data.map((i)=> {
        console.log(i.location)
      }));
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
  
  // Call the async function
  fetchData();