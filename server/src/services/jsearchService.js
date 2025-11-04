const axios = require("axios")
const URL = "https://jsearch.p.rapidapi.com/search";


const fetchJobsFromJsearch = async (query) => {

    const options = {
        method: "GET",
        url: URL,
        params: {
            query,
            page: "1",
            num_pages: "1",
            country: "in",
            language: "en"
        },
        headers: {
            "X-RapidAPI-Key": process.env.JSEARCH_API_KEY,
            "X-RapidAPI-Host": "jsearch.p.rapidapi.com"
        }
    };

    const response = await axios(options);
    return response.data;
}
module.exports = { fetchJobsFromJsearch }