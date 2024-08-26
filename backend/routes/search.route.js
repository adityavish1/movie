import express from "express";
import {
	getSearchHistory,
	removeItemFromSearchHistory,
	// searchMovie,
	getMovieTrailersID,
	getSeriesTrailersID
	// searchPerson,
	// searchTv,
} from "../controllers/search.controller.js";

const router = express.Router();

// router.get("/person/:query", searchPerson);
router.get("/movie/:query",getMovieTrailersID);
router.get("/series/:query",getSeriesTrailersID);
// router.get("/:query/movie", getTrailersID);
// router.get("/tv/:query", searchTv);

router.get("/history", getSearchHistory);
router.delete("/history/:id", removeItemFromSearchHistory);
// router.delete("/:id/history", removeItemFromSearchHistory);

export default router;