import express from "express";
import {
	// getMovieDetails,
	// getContentByCategory,
	// getMoviesByCategory,
	   getTrailers,
	// getSimilarMovies,
	getMoviesByCategory,
	getMoviesByCategory1,
	getTrendingMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie);
// router.get("/rating", getMovieByRating);
router.get("/:id/trailers", getTrailers);
// router.get("/:id/details", getMovieDetails);
// router.get("/:id/similar", getSimilarMovies);
// router.get("/:category", getContentByCategory);
router.get("/category", getMoviesByCategory);
router.get("/category1", getMoviesByCategory1);




export default router;