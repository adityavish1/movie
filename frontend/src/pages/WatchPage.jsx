import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useContentStore } from "../store/content";
import axios from "axios";
import Navbar from "../components/Navbar";
// import { ArrowLeft } from "lucide-react";
import ReactPlayer from "react-player";
// import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
// import { formatReleaseDate } from "../utils/dateFunction";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {

	////////////////////////
	const [viewport, setViewport] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setViewport(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	let playerHeight;
	if (viewport < 640) { // sm breakpoint
		playerHeight = '40vh';
	} else if (viewport < 768) { // md breakpoint
		playerHeight = '50vh';
	} else {
		playerHeight = '70vh'; // Default for larger screens
	}
	/////////////////////////////

	////BACK TO HOME
	const navigate = useNavigate();

	const handleBackClick = () => {
		navigate('/'); // Navigates to the Home page
	};
/////////////////////////////////////////////////////





	const { id } = useParams();
	const [trailers, setTrailers] = useState([]);
	// const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
	const [loading, setLoading] = useState(true);
	// const [content, setContent] = useState({});
	// const [similarContent, setSimilarContent] = useState([]);
	const { contentType } = useContentStore();

	// const sliderRef = useRef(null);

	useEffect(() => {
		const getTrailers = async () => {
			try {
				console.log("id:", id)
				const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
				console.log("Data", res.data.content)
				setTrailers(res.data.content);
				console.log("Res:", res);
			} catch (error) {
				console.error('Error fetching data:', error);
			}finally {
			setLoading(false);
			}


		};

		getTrailers();
	}, [contentType, id]);
	console.log("GetTrailers:", trailers);

	// useEffect(() => {
	// 	const getSimilarContent = async () => {
	// 		try {
	// 			const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
	// 			setSimilarContent(res.data.similar);
	// 		} catch (error) {
	// 			if (error.message.includes("404")) {
	// 				setSimilarContent([]);
	// 			}
	// 		}
	// 	};

	// 	getSimilarContent();
	// }, [contentType, id]);

	// useEffect(() => {
	// 	const getContentDetails = async () => {
	// 		try {
	// 			const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
	// 			setContent(res.data.content);
	// 		} catch (error) {
	// 			if (error.message.includes("404")) {
	// 				setContent(null);
	// 			}
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	getContentDetails();
	// }, [contentType, id]);

	// const handleNext = () => {
	// 	if (currentTrailerIdx < trailers.length - 1) setCurrentTrailerIdx(currentTrailerIdx + 1);
	// };
	// const handlePrev = () => {
	// 	if (currentTrailerIdx > 0) setCurrentTrailerIdx(currentTrailerIdx - 1);
	// };

	// const scrollLeft = () => {
	// 	if (sliderRef.current) sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
	// };
	// const scrollRight = () => {
	// 	if (sliderRef.current) sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	// };

	if (loading)
		return (
			<div className='min-h-screen bg-black p-10'>
				<WatchPageSkeleton />
			</div>
		);

	if (!trailers) {
		return (
			<div className='bg-black text-white h-screen'>
				<div className='max-w-6xl mx-auto'>
					<Navbar />
					<div className='text-center mx-auto px-4 py-8 h-full mt-40'>
						<h2 className='text-2xl sm:text-5xl font-bold text-balance'>Content not found 😥</h2>
					</div>
				</div>
			</div>
		);
	}

	// if (!trailers.results) return null;


	return (

		<div>
			{/* Your Watch Page content */}
			<div className='bg-black min-h-screen text-white'>
				<div className='mx-auto container px-4 py-8 h-full'>
					<Navbar />
					<div className="rounded w-24">
						<button onClick={handleBackClick} className="bg-blue-500 text-white px-2 py-1 text-sm rounded hover:bg-blue-700">
							Back
						</button>
					</div>

					{/* {trailers.results.movie_length > 0 && (
					 <div className='flex justify-between items-center mb-4'>
						<button
							className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
								currentTrailerIdx === 0 ? "opacity-50 cursor-not-allowed " : ""
							}}
							`}
							disabled={currentTrailerIdx === 0}
							onClick={handlePrev}
						>
							<ChevronLeft size={24} />
						</button>

						<button
							className={`
							bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${
								currentTrailerIdx === trailers.results.movie_length - 1 ? "opacity-50 cursor-not-allowed " : ""
							}}
							`}
							disabled={currentTrailerIdx === trailers.results.movie_length - 1}
							onClick={handleNext}
						>
							<ChevronRight size={24} />
						</button>
					</div>
				)}  */}
					
					<div className='aspect-video mb-8 lg:-mb-40 p-4 sm:px-10 md:px-32'>
						{trailers.results.movie_length > 0 && (
							<ReactPlayer
								controls={true}
								width={"100%"}
								height={playerHeight}
								className='mx-auto overflow-hidden rounded-lg'
								url={trailers.results.trailer}
							// playing={true}
							/>
						)}

						{trailers.results.movie_length === 0 && (
							<h2 className='text-xl text-center mt-5'>
								No trailers available for{" "}
								<span className='font-bold text-red-600'>{trailers.results.title}</span> 😥
							</h2>
						)}
					</div>

					{/* movie details */}
					<div
						className='flex flex-col md:flex-row items-center justify-between gap-20 
				max-w-6xl mx-auto '
					>
						<div className='mb-4 md:mb-0'>
							<h2 className='text-5xl font-bold text-balance'>{trailers.results.title}</h2>

							<p className='mt-2 text-lg'>
								{trailers.results.release} |{" "}
								{trailers.results?.content_rating ? (
									<span className='text-red-600'>18+</span>
								) : (
									<span className='text-green-600'>PG-13</span>
								)} {" "}|{" "}<strong >Rating:</strong >{" "} <span className="text-red-600">{trailers.results.rating}</span> {" "}
							</p>
							<p className='mt-4 text-lg'><strong className="text-red-600">Plot: </strong>{trailers.results.plot}</p>
							<p className='mt-4 text-lg'><strong className="text-red-600">Description: </strong>{trailers.results.description}</p>
						</div>
						<img
							src={trailers.results.banner}
							alt='Poster image'
							className='max-h-[600px] rounded-md'
						/>
					</div>

					

					{/* {similarContent.length > 0 && (
					<div className='mt-12 max-w-5xl mx-auto relative'>
						<h3 className='text-3xl font-bold mb-4'>Similar Movies/Tv Show</h3>

						<div className='flex overflow-x-scroll scrollbar-hide gap-4 pb-4 group' ref={sliderRef}>
							{similarContent.map((content) => {
								if (content.poster_path === null) return null;
								return (
									<Link key={trailers.results.id} to={`/watch/${trailers.results.id}`} className='w-52 flex-none'>
										<img
											src={trailers.results}
											alt='Poster path'
											className='w-full h-auto rounded-md'
										/>
										<h4 className='mt-2 text-lg font-semibold'>{trailers.results.title || trailers.results.name}</h4>
									</Link>
								);
							})}

							<ChevronRight
								className='absolute top-1/2 -translate-y-1/2 right-2 w-8 h-8
										opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer
										 bg-red-600 text-white rounded-full'
								onClick={scrollRight}
							/>
							<ChevronLeft
								className='absolute top-1/2 -translate-y-1/2 left-2 w-8 h-8 opacity-0 
								group-hover:opacity-100 transition-all duration-300 cursor-pointer bg-red-600 
								text-white rounded-full'
								onClick={scrollLeft}
							/>
						</div>
					</div>
				)} */}

				</div>
			</div>



		</div>

	);
};
export default WatchPage;