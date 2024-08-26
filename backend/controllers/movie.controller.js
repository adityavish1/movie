// import { fetchOMDBDataById } from "../services/m.service.js";
import { MovieMinniDatabase, } from "../services/m.service.js";
import { fetchIMDBData } from "../services/m.service.js";
// export async function getTrendingMovie(req, res) {
// 	try {
// 		const data = await fetchStreamingAvailability("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
// 		const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

// 		res.json({ success: true, content: randomMovie });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

// export async function getMovieTrailers(req, res) {
// 	const { id } = req.params;
// 	try {
// 		const data = await fetchStreamingAvailability(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
// 		res.json({ success: true, trailers: data.results });
// 	} catch (error) {
// 		if (error.message.includes("404")) {
// 			return res.status(404).send(null);
// 		}

// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

const movieIds = [
    'tt7286456', // Joker (2019)
    'tt4154796', // Avengers: Endgame (2019)
    'tt6751668', // Parasite (2019)
    'tt8579674', // 1917 (2019)
    'tt4154756', // Avengers: Infinity War (2018)
    'tt2382320', // No Time to Die (2021)
    'tt6320628', // Spider-Man: Far from Home (2019)
    'tt1979376', // Toy Story 4 (2019)
    'tt4633694', // Spider-Man: Into the Spider-Verse (2018)
    'tt6105098', // The Lion King (2019)
    'tt9248972', // The Platform (2019)
    'tt1856101', // Blade Runner 2049 (2017)
    'tt0468569', // The Dark Knight (2008)
    'tt2380307', // Coco (2017)
    'tt5675620', // Upgrade (2018)
    'tt7131622', // Once Upon a Time in Hollywood (2019)
    'tt10648342', // Thor: Love and Thunder (2022)
    'tt9376612', // Shang-Chi and the Legend of the Ten Rings (2021)
    'tt1136608', // Inception (2010)
    'tt11138512', // The Falcon and the Winter Soldier (2021)
    'tt9419884', // Doctor Strange in the Multiverse of Madness (2022)
    'tt5013056', // Dunkirk (2017)
    'tt2250912', // Spider-Man: Homecoming (2017)
    'tt3748528', // Rogue One: A Star Wars Story (2016)
    'tt6146586', // John Wick: Chapter 3 - Parabellum (2019)
    'tt6806448', // Nerve (2016)
    'tt1187043', // 3 Idiots (2009)
    'tt7349662', // June (2019)
    'tt2381249', // Mission: Impossible - Fallout (2018)
    'tt4846232', // The Martian (2015)
    'tt3741700', // The Fate of the Furious (2017)
    'tt5607028', // Doctor Sleep (2019)
    'tt10676012', // Encanto (2021)
    'tt9639470', // The French Dispatch (2021)
    'tt7798634', // The Old Guard (2020)
    'tt0848228', // The Avengers (2012)
    'tt7784604', // Hereditary (2018)
    'tt4630562', // The Meg (2018)
    'tt0892769', // Watchmen (2009)
    'tt1375666', // Inception (2010)
    'tt0393567', // The Hunger Games (2012)
    'tt0486655', // The Avengers (2012)
    'tt0232500', // Finding Nemo (2003)
    'tt0093773', // The Untouchables (1987)
    'tt1838556', // Django Unchained (2012)
    'tt0978762', // The Wolf of Wall Street (2013)
    'tt0245429', // The Lord of the Rings: The Two Towers (2002)
    'tt0449088', // The Incredibles (2004)
    'tt0910970', // 500 Days of Summer (2009)
    'tt0120737', // The Matrix (1999)
    'tt0137523', // Fight Club (1999)
    'tt0109830', // Jurassic Park (1993)
    'tt0076759', // Star Wars (1977)
    'tt0120815', // Star Wars: Episode I - The Phantom Menace (1999)
    'tt0120689', // The Sixth Sense (1999)
    'tt0081505', // Raiders of the Lost Ark (1981)
    'tt0022100', // The Wizard of Oz (1939)
    'tt0078748', // Alien (1979)
    'tt0080684', // Star Wars: Episode IV - A New Hope (1977)
    'tt0107290', // Batman (1989)
    'tt0034583', // Casablanca (1942)
    'tt0133093', // The Matrix (1999)
    'tt0050083', // 12 Angry Men (1957)
    'tt0075314', // Taxi Driver (1976)
    'tt0060196', // The Good, the Bad and the Ugly (1966)
    'tt0068646', // The Godfather (1972)
    'tt0108052', // Schindler's List (1993)
    'tt0111161', // The Shawshank Redemption (1994)
    'tt0169547', // Fight Club (1999)
    'tt0034583', // Casablanca (1942)
    'tt0211915', // Requiem for a Dream (2000)
    'tt0090605', // Back to the Future (1985)
    'tt0482571', // The Dark Knight Rises (2012)
    'tt0317248', // Finding Nemo (2003)
    'tt0468569', // The Dark Knight (2008)
    'tt0082971', // A Clockwork Orange (1971)
    'tt0109830', // Jurassic Park (1993)
    'tt0034583', // Casablanca (1942)
    'tt0086190', // The Thing (1982)
    'tt0118799', // Heat (1995)
    'tt0103939', // The Silence of the Lambs (1991)
    'tt0053291', // Rear Window (1954)
    'tt0057115', // The Night of the Hunter (1955)
    'tt0077416', // The Godfather: Part II (1974)
    'tt0076729', // The Exorcist (1973)
    'tt0015324', // Sunrise: A Song of Two Humans (1927)
    'tt0060242', // Lawrence of Arabia (1962)
    'tt0103064', // The Usual Suspects (1995)
    'tt0031381', // Gone with the Wind (1939)
    'tt0046912', // On the Waterfront (1954)
    'tt0047478', // It’s a Wonderful Life (1946)
    'tt0049376', // The Third Man (1949)
    'tt0015864', // The Cabinet of Dr. Caligari (1920)
    'tt0101414', // The Lion King (1994)
    'tt0056801', // The Apartment (1960)
    'tt0055066', // The Bridge on the River Kwai (1957)
    'tt0071315', // The French Connection (1971)
    'tt0070034', // The Night of the Living Dead (1968)
    'tt0076257', // Rocky (1976)
    'tt0042876', // The Maltese Falcon (1931)
    'tt0017925',  // Battleship Potemkin (1925)
    'tt8936646',  // Extraction
    'tt1440129',  //Bttleship
    'tt2713180'
];



export async function getTrendingMovie(req, res) {
    const id = movieIds[Math.floor(Math.random() * movieIds.length)];
    try {
        const data = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`);
        if (!data || data.Response === 'False') {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


export async function getTrailers(req, res) {
    const { id } = req.params;
    console.log("ID",id)
    try {
        const data = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`);
        if (!data || data.Response === 'False') {
            return res.status(404).json({ success: false, message: 'Movie not found' });
        }
        res.status(200).json({ success: true, content: data });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}




// export async function getContentByCategory(req, res) {
//     const validMovieIds = [
//         "tt0111161", "tt0068646", "tt0071562", "tt0468569", "tt0050083",
//         "tt0108052", "tt0137523", "tt0109830", "tt0110912", "tt1375666",
//         "tt0099685", "tt0114369", "tt0073486", "tt0120737", "tt0133093",
//         "tt0118799", "tt0095016", "tt0076759", "tt0021749", "tt0034583",
//         "tt0080684"
//     ];

//     // Get a number of random movie IDs to fetch
//     const numberOfMovies = 5; // Adjust this number as needed
//     const randomMovieIds = Array.from({ length: numberOfMovies }, () => 
//         validMovieIds[Math.floor(Math.random() * validMovieIds.length)]
//     );

//     try {
//         // Fetch data for all movie IDs concurrently
//         const fetchPromises = randomMovieIds.map(id => 
//             MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`)
//         );
        
//         const results = await Promise.all(fetchPromises);
        
//         // Filter out any responses where the movie was not found
//         const validResults = results.filter(data => data && data.Response !== 'False');
        
//         if (validResults.length === 0) {
//             return res.status(404).json({ success: false, message: 'No movies found' });
//         }
        
//         res.status(200).json({ success: true, content: validResults });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// }


// export async function getContentByCategory(req, res) {
//     const {category } = req.params;
    
//     try {
//         const url = `https://moviesminidatabase.p.rapidapi.com/movie/order/${category}/`;
//         const data = await fetchOMDBDataById(url);
        
//         if (!data || data.Response === 'False') {
//             return res.status(404).json({ success: false, message: ` not found` });
//         }
//         console.log(data)
//         res.status(200).json({ success: true, content: data });
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ success: false, message: 'Internal Server Error' });
//     }
// }

// export async function getSimilarMovies(req, res) {
// 	const { id } = req.params;
// 	try {
// 		const data = await fetchStreamingAvailability(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);
// 		res.status(200).json({ success: true, similar: data.results });
// 	} catch (error) {
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

export async function getMoviesByCategory(req, res) {
	// const { category } = req.params; // Uncomment if you need to use category from request params
	try {
		// Fetch data from the IMDb API
		const data = await fetchIMDBData('https://imdb-top-100-movies.p.rapidapi.com/series/');
        
		// Check if the data is an array
		if (Array.isArray(data)) {
			res.status(200).json({ success: true, content: data });
		} else {
			res.status(500).json({ success: false, message: "Unexpected data format" });
		}
	} catch (error) {
		console.error('Error fetching data:', error); // Log the error for debugging
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}




// export async function getMoviesByCategory1(req, res) {
// 	// const { category } = req.params; // Uncomment if you need to use category from request params
// 	try {
// 		// Fetch data from the IMDb API
// 		const data = await MovieDatabase('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming');
        
// 		// Check if the data is an array
		
// 			res.status(200).json({ success: true, content: data });
// 		//  else {
// 		// 	res.status(500).json({ success: false, message: "Unexpected data format" });
// 		// }
// 	} catch (error) {
// 		console.error('Error fetching data:', error); // Log the error for debugging
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }




///////////////////////////////////////////


const movieIdds = [
    'tt5013056', // Dunkirk (2017)
    'tt0017925',  // Battleship Potemkin (1925)
    'tt8936646',  // Extraction
    'tt1440129',  //Bttleship
    'tt2713180', // Fury
    'tt0978762', 'tt0245429', 'tt0910970', 'tt0120737', 'tt0137523',
     'tt0120815', 'tt0060196', 'tt0075314', 'tt0068646','tt0017925',
    'tt0108052', 'tt0111161', 'tt0169547', 'tt0211915', 'tt0090605',
    'tt0482571', 'tt0317248', 'tt0082971', 'tt0034583', 'tt0086190',
    'tt0118799', 'tt0103939', 'tt0053291', 'tt0057115', 'tt0077416',
    'tt0076729', 'tt0015324', 'tt0060242', 'tt0103064', 'tt0031381',
    'tt0017925'
];

import axios from "axios";

const fetchMovieDetails = async (id) => {
    const response = await axios.get(`https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`, {
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

export async function getMoviesByCategory1(req, res) {
    try {
        // Shuffle the movie IDs
        const shuffledIds = shuffleArray([...movieIdds]);

        // Fetch movie details for the shuffled IDs
        const moviesArray = await Promise.all(
            shuffledIds.slice(0, 20).map((id) => fetchMovieDetails(id))
        );

        // Filter out any unsuccessful responses if necessary
        const validMovies = moviesArray.filter(movie => movie && movie.Response !== 'False');

        res.status(200).json({ success: true, content: validMovies });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}