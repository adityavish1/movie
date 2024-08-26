// import { useEffect, useState } from "react";
// import { useContentStore } from "../store/content";
// import axios from "axios";

// const usegetMovieByRating = () => {
// 	const [ratedContent, setRatedContent] = useState(null);
// 	const { contentType } = useContentStore();

// 	useEffect(() => {
// 		const getRatedContent = async () => {
// 			const res = await axios.get(`/api/v1/${contentType}/rating`);
// 			setRatedContent(res.data.content);
// 		};

// 		getTrendingContent();
// 	}, [contentType]);

// 	return { ratedContent };
// };
// export default usegetMovieByRating;