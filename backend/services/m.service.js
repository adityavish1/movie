import axios from "axios";
// import { ENV_VARS } from "../config/envVars.js";

// export const fetchStreamingAvailability = async (url) => {
// 	const options = {
// 		headers: {
// 			accept: "application/json",
// 			"x-rapidapi-key": "30be8f8a40msh72f24fcb3bcaa38p1c29c6jsnb94fbefe119c",
// 			"x-rapidapi-host": "streaming-availability.p.rapidapi.com",
// 		},
// 		params: {
// 			series_granularity: "episode",
// 			output_language: "en",
// 		},
// 	};

// 	const response = await axios.get(url, options);

// 	if (response.status !== 200) {
// 		throw new Error("Failed to fetch data from Streaming Availability API: " + response.statusText);
// 	}

// 	return response.data;
// };

export async function MovieMinniDatabase(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '30be8f8a40msh72f24fcb3bcaa38p1c29c6jsnb94fbefe119c',
            'x-rapidapi-host': 'moviesminidatabase.p.rapidapi.com'
          }
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error; // Re-throw the error after logging it
    }
}



export async function MovieDatabase(url) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '30be8f8a40msh72f24fcb3bcaa38p1c29c6jsnb94fbefe119c',
            'x-rapidapi-host': 'moviesdatabase.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.get(url, options);
        return response.data;
    } catch (error) {
        console.error('Error fetching movie details:', error);
        throw error; // Re-throw the error after logging it
    }
}


export async function fetchIMDBData(url) {
    const options = {
        headers: {
            'x-rapidapi-key': '30be8f8a40msh72f24fcb3bcaa38p1c29c6jsnb94fbefe119c',
            'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com' // Adjust if needed
        }
    };

    try {
        const response = await axios.get(url, options);
        console.log('Response Data:', response.data);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Fetch error:', error);
        throw error; // Re-throw the error after logging
    }
}



export const fetchOMDBDataById = async (id) => {
    const apiKey = 'a72dab4'; // Your API key
    try {
        const response = await axios.get('http://www.omdbapi.com/', {
            params: {
                i: id,
                apikey: apiKey
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};
