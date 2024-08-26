import { User } from "../models/user.model.js";
import { MovieMinniDatabase } from "../services/m.service.js";

// export async function searchPerson(req, res) {
// 	const { query } = req.params;
// 	try {
// 		const response = await fetchStreamingAvailability(
// 			`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
// 		);

// 		if (response.results.length === 0) {
// 			return res.status(404).send(null);
// 		}

// 		await User.findByIdAndUpdate(req.user._id, {
// 			$push: {
// 				searchHistory: {
// 					id: response.results[0].id,
// 					image: response.results[0].profile_path,
// 					title: response.results[0].name,
// 					searchType: "person",
// 					createdAt: new Date(),
// 				},
// 			},
// 		});

// 		res.status(200).json({ success: true, content: response.results });
// 	} catch (error) {
// 		console.log("Error in searchPerson controller: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }


// Adjust the import based on your file structure

export async function getMovieTrailersID(req, res) {
    const { query } = req.params;
    const user = req.user; // Ensure this is set by your authentication middleware
    console.log("Query:", query);
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    try {
        // Fetch movie data by title
        const movieData = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/movie/imdb_id/byTitle/${encodeURIComponent(query)}/`);
        
        if (!movieData || movieData.Response === 'False' || !movieData.results || movieData.results.length === 0) {
            return res.status(404).json({ success: false, message: 'Movies not found' });
        }

        // Extract IMDb IDs from the fetched data
        const imdbIDs = movieData.results.map(movie => movie.imdb_id);

        // Fetch additional data for each IMDb ID using searchMovie
        const dataPromises = imdbIDs.slice(0, 12).map(id => searchMovie(id, user ,"movie"));
        const additionalData = await Promise.all(dataPromises);

        // Return the combined response
        res.status(200).json({ success: true, content: additionalData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


///////////////////////////////////

export async function getSeriesTrailersID(req, res) {
    const { query } = req.params;
    const user = req.user; // Ensure this is set by your authentication middleware
    console.log("Query:", query);
    
    if (!user) {
        return res.status(401).json({ success: false, message: 'User not authenticated' });
    }

    try {
        // Fetch movie data by title
        const movieData = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/series/idbyTitle/${encodeURIComponent(query)}/`);
        
        if (!movieData || movieData.Response === 'False' || !movieData.results || movieData.results.length === 0) {
            return res.status(404).json({ success: false, message: 'Movies not found' });
        }

        // Extract IMDb IDs from the fetched data
        const imdbIDs = movieData.results.slice(0, 12).map(movie => movie.imdb_id);

        // Fetch additional data for each IMDb ID using searchMovie
        const dataPromises = imdbIDs.map(id => searchMovie(id, user ,"series"));
        const additionalData = await Promise.all(dataPromises);

        // Return the combined response
        res.status(200).json({ success: true, content: additionalData });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}





// export async function searchMovie(req, res) {
//     // const { query } = req.params; // Assuming query is in the query string

//     try {
//         const response = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/movie/id/${id}/`);

//         if (!response || response.Response === 'False') {
//             return res.status(404).json({ success: false, message: 'Movie not found' });
//         }

//         const movie = {
//             id: response.imdbID,
//             image: response.Poster,
//             title: response.Title,
//             searchType: "movie",
//             createdAt: new Date(),
//         };

//         await User.findByIdAndUpdate(req.user._id, {
//             $push: {
//                 searchHistory: movie,
//             },
//         });

//         res.status(200).json({ success: true, content: response });
//     } catch (error) {
//         console.error("Error in searchMovie controller: ", error.message);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// }
/////////////////////////////////////////////////////////////////////////////////////////////////
export async function searchMovie(imdbID, user, category) {
    if (!user || !user._id) {
        throw new Error('User or User ID is not provided');
    }

    try {
        // Fetch movie data using the IMDb ID
        const response = await MovieMinniDatabase(`https://moviesminidatabase.p.rapidapi.com/${category}/id/${imdbID}/`);

        if (!response || response.Response === 'False') {
            return null; // or handle as needed
        }

        // Create movie object with the necessary details
        const movie = {
            id: response.results.imdb_id,
            image: response.results.banner,
            title: response.results.title,
            searchType: category,
            createdAt: new Date(),
        };

        // Push search history to the database
        await User.findByIdAndUpdate(user._id, {
            $push: {
                searchHistory: movie,
            },
        });

        return response; // Return the full response for further use
    } catch (error) {
        console.error("Error in searchMovie function:", error.message);
        return null; // or handle as needed
    }
}


/////////////////////////////////////////////////////////////////////////////////////////

// export async function searchTv(req, res) {
// 	const { query } = req.params;

// 	try {
// 		const response = await fetchStreamingAvailability(
// 			`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
// 		);

// 		if (response.results.length === 0) {
// 			return res.status(404).send(null);
// 		}

// 		await User.findByIdAndUpdate(req.user._id, {
// 			$push: {
// 				searchHistory: {
// 					id: response.results[0].id,
// 					image: response.results[0].poster_path,
// 					title: response.results[0].name,
// 					searchType: "tv",
// 					createdAt: new Date(),
// 				},
// 			},
// 		});
// 		res.json({ success: true, content: response.results });
// 	} catch (error) {
// 		console.log("Error in searchTv controller: ", error.message);
// 		res.status(500).json({ success: false, message: "Internal Server Error" });
// 	}
// }

export async function getSearchHistory(req, res) {
	try {
		res.status(200).json({ success: true, content: req.user.searchHistory });
	} catch (error) {
		res.status(500).json({ success: false, message: "Internal Server Error" });
	}
}

export async function removeItemFromSearchHistory(req, res) {
    let { id } = req.params;
    
    // Ensure id is treated as a string if necessary for your data model
    // Adjust parsing based on how IDs are stored in searchHistory
    id = String(id);

    try {
        const result = await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id },
            },
        });

        // Check if the update was successful
        if (result.nModified === 0) {
            return res.status(404).json({ success: false, message: 'Item not found in search history' });
        }

        res.status(200).json({ success: true, message: 'Item removed from search history' });
    } catch (error) {
        console.error('Error in removeItemFromSearchHistory controller:', error.message);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}