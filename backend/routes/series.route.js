import express from "express";
import {
// 	getSimilarTvs,
	getTrendingSeries,
	getSeriesByCategory1,
// 	getTvDetails,
// 	getTvsByCategory,
getSeriesTrailers,
} from "../controllers/series.controller.js";

const router = express.Router();
// router.get("/:id/trailers", getTrailers);
router.get("/trending", getTrendingSeries);
router.get("/:id/trailers", getSeriesTrailers);
// router.get("/:id/details", getTvDetails);
// router.get("/:id/similar", getSimilarTvs);
// router.get("/:category", getTvsByCategory);
router.get("/category1", getSeriesByCategory1);

export default router;