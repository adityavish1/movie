// import { fetchFromTMDB } from "../services/tmdb.service.js";
import { MovieMinniDatabase } from "../services/m.service.js";

// export async function getTrendingTv(req, res) {
// 	try {
// 		const data = await fetchStreamingAvailability("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
// 		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

// 		res.json({ success: true, content: randomMovie });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function getTvTrailers(req, res) {
// 	const { id } = req.params;
// 	try {
// 		const data = await fetchStreamingAvailability(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
// 		res.json({ success: true, trailers: data.results });
// 	} catch (error) {
// 		if (error.message.includes("404")) {
// 			return res.status(404).send(null);
// 		}

// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function getTvDetails(req, res) {
// 	const { id } = req.params;
// 	try {
// 		const data = await fetchStreamingAvailability(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
// 		res.status(200).json({ success: true, content: data });
// 	} catch (error) {
// 		if (error.message.includes("404")) {
// 			return res.status(404).send(null);
// 		}

// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function getSimilarTvs(req, res) {
// 	const { id } = req.params;
// 	try {
// 		const data = await fetchStreamingAvailability(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
// 		res.status(200).json({ success: true, similar: data.results });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function getTvsByCategory(req, res) {
// 	const { category } = req.params;
// 	try {
// 		const data = await fetchStreamingAvailability(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
// 		res.status(200).json({ success: true, content: data.results });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

const seriesIds = [
    'tt0944947', // Game of Thrones (2011–2019)
    'tt1475582', // Sherlock (2010–2017)
    'tt9140554', // Loki (2021– )
    'tt2442560', // Peaky Blinders (2013–2022)
    'tt2306299', // Vikings (2013–2020)
    'tt7335184', // You (2018– )
    'tt10986410', // Ted Lasso (2020– )
    'tt11311302', // The Queen's Gambit (2020)
    'tt5180504', // The Witcher (2019– )
    'tt8111088', // The Boys (2019– )
    'tt1043813', // Stranger Things (2016– )
    'tt2560140', // Attack on Titan (2013–2023)
    'tt7366338', // Chernobyl (2019)
    'tt1375666', // Inception (2010)
    'tt11558894', // The Witcher (2019– )
    'tt6528116', // His Dark Materials (2019– )
    'tt8440254', // The Outsider (2020)
    'tt9389998', // The Undoing (2020)
    'tt1158636', // The Mandalorian (2019– )
    'tt7660850', // Succession (2018– )
    'tt8166926', // The New Pope (2020)
    'tt8440254', // The Outsider (2020)
    'tt6763664', // The Deuce (2017–2019)
    'tt12191950', // Ginny & Georgia (2021– )
    'tt8016116', // Chilling Adventures of Sabrina (2018–2020)
    'tt10647368', // The Queen's Gambit (2020)
    'tt0988824', // Penny Dreadful (2014–2016)
    'tt8335184', // Modern Love (2019– )
    'tt10793634', // Night Stalker: The Hunt for a Serial Killer (2021)
    'tt0988824', // Penny Dreadful (2014–2016)
    'tt0991168', // The Expanse (2015– )
    'tt8228288', // The Good Lord Bird (2020)
    'tt10457134', // Away (2020)
    'tt7335184', // You (2018– )
    'tt10048342', // The Umbrella Academy (2019– )
];


export async function getTrendingSeries(req, res) {
    const id = seriesIds[Math.floor(Math.random() * seriesIds.length)];
    try {
        const data = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/series/id/${id}/`);
        if (!data || data.Response === 'False') {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}




import axios from "axios";

const fetchMovieDetails = async (id) => {
    const response = await axios.get(`https://moviesminidatabase.p.rapidapi.com/series/id/${id}/`, {
        headers: {
            'x-rapidapi-key': '30be8f8a40msh72f24fcb3bcaa38p1c29c6jsnb94fbefe119c',
            'x-rapidapi-host': 'moviesminidatabase.p.rapidapi.com'
          }
    });
    return response.data;
};


// const shuffleArray = (array) => {
//     let currentIndex = array.length, randomIndex;
    
//     while (currentIndex !== 0) {
//         randomIndex = Math.floor(Math.random() * currentIndex);
//         currentIndex--;
//         [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
//     }
    
//     return array;
// };






function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function getSeriesByCategory1(req, res) {
    try {
        // Shuffle the movie IDs
        const shuffledIds = shuffleArray([...seriesIds]);

        // Fetch movie details for the shuffled IDs
        const moviesArray = await Promise.all(
           seriesIds.slice(0, 20).map((id) => fetchMovieDetails(id))
        );

        // Filter out any unsuccessful responses if necessary
        const validMovies = moviesArray.filter(movie => movie && movie.Response !== 'False');

        res.status(200).json({ success: true, content: validMovies });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}



// export async function getSeriesTrailers(req, res) {
//     const id = req.params;
//     try {
//         const data = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/series/id/${id}/`);
//         if (!data || data.Response === 'False') {
//             return res.status(404).json({ success: false, message: 'Movie not found' });
//         }
//         res.status(200).json({ success: true, content: data });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// }

export async function getSeriesTrailers(req, res) {
    const { id } = req.params;
    console.log("ID",id)
    try {
        const data = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/series/id/${id}/`);
        if (!data || data.Response === 'False') {
            return res.status(404).json({ success: false, message: 'Series not found' });
        }
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}
