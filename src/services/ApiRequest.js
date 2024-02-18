import axios from "axios";

const requestOptions = {
  method: 'GET',
  url: 'https://youtube-mp36.p.rapidapi.com/dl',
  params: {id: 'UxxajLWwzqY'},
  headers: {
    'X-RapidAPI-Key': 'd838425bc8msh385ab6694392c53p1005c4jsnb4b53fd8dac6',
    'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
  }
};

const fetch = async (id) => {
    requestOptions.params = { id };
    const response = await axios.request(requestOptions);
    return response;
  }
  
  export { fetch };