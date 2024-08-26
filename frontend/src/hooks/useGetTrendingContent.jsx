import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";

const useGetTrendingContent = () => {
	const [trendingContent, setTrendingContent] = useState(null);
	const { contentType } = useContentStore();

	useEffect(() => {
		const getTrendingContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/trending`);
			// console.log("Trends",res)
			setTrendingContent(res.data.content);
		};

		getTrendingContent();
	}, [contentType]);
	// console.log("trenPPPpage:",trendingContent)
	return { trendingContent };
};
export default useGetTrendingContent;