import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Play, Info, X } from 'lucide-react';
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import { MOVIE_CATEGORIES, SERIES_CATEGORIES } from "../../utils/constants";
import { useContentStore } from "../../store/content";
// import MovieSlider from "../../components/MovieSlider";
import MovieSliderOne from "../../components/MovieSliderOne";
import { useState,useEffect } from "react";
import ReactPlayer from "react-player";

const HomeScreen = () => {

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



	const [playing, setPlaying] = useState(false);
	const [showInfo, setShowInfo] = useState(false);

	const handlePlayClick = () => {
		setPlaying(true);
	};

	const handleCloseClick = () => {
		setPlaying(false);
	};

	const handleMoreInfoClick = (e) => {
		e.preventDefault();
		setShowInfo(!showInfo); // Toggle info visibility
		setPlaying(false); // Ensure video stops if info is opened
	};

	const { trendingContent } = useGetTrendingContent();
	console.log("Trending Content:", trendingContent)
	const { contentType } = useContentStore();
	const [imgLoading, setImgLoading] = useState(true);

	if (!trendingContent)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);

		if(!trendingContent.results) return null;

	return (
		<>
			<div className='relative h-screen text-white '>
				<Navbar />
				
				{/* COOL OPTIMIZATION HACK FOR IMAGES */}
				{imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}

				<img
					src={trendingContent?.results.banner}
					alt='Hero img'
					className='absolute top-0 left-0 w-full h-full object-cover -z-50'
					onLoad={() => {
						setImgLoading(false);
					}}
				/>

				<div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
					<div
						className='bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10'
					/>

					<div className='max-w-2xl'>
						<h1 className='mt-4 text-6xl font-extrabold text-balance'>
							{trendingContent?.results.title}
						</h1>
						<p className='mt-2 text-lg'>
							{trendingContent?.results.release}{" "}
							| {trendingContent?.results.content_rating ? "" : "PG-13"}
						</p>

						<p className='mt-4 text-lg'>
							{trendingContent?.Runtime}
						</p>
					</div>

					<div className='flex flex-col mt-8'>
			<div className='flex '>
				{!playing && !showInfo && (
					<>
						<Link
							to={''}
							onClick={handlePlayClick}
							className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex items-center'
						>
							<Play className='size-6 mr-2 fill-black' />
							Play
						</Link>
						<Link
							to={''} // Prevents navigation, triggers state change instead
							onClick={handleMoreInfoClick}
							className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
						>
							<Info className='size-6 mr-2' />
							More Info
						</Link>
					</>
				)}

				{playing && (
					<div className='relative w-full'>
						<ReactPlayer
							controls={true}
							width={'100%'}
							height={playerHeight}
							className='mx-auto overflow-hidden rounded-lg'
							url={trendingContent?.results.trailer}
							playing={true}
						/>
						<button
							onClick={handleCloseClick}
							className='absolute top-0 right-0 mt-2 mr-2 bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded-full flex items-center'
						>
							<X className='size-6 fill-black' />
						</button>
					</div>
				)}
			</div>

			{showInfo && (
					
				<div className='mt-4 bg-transparent p-4 rounded-lg text-white'>
					<h2 className='text-xl font-bold mb-2'>{trendingContent?.results.title}</h2>
					<p className='mb-2'><strong className="">Plot:</strong> {trendingContent?.results.plot}</p>
					<p className='mb-2'><strong>Description:</strong>{trendingContent?.results.description}</p>
					{/* Add more details as needed */}
					<p className='mb-2'><strong>Release Date:</strong> {trendingContent?.results.release}</p>
					<p className='mb-2'><strong>Rating:</strong> {trendingContent?.results.rating}</p>
					{/* You can add any other relevant data here */}
					<button
						onClick={() => setShowInfo(false)}
						className='mt-2 bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded flex items-center'
					>
						<X className='size-6 mr-2 fill-black' />
						Close Info
					</button>
				</div>
				
			)}
		</div>
				</div>
			</div>

			<div className='flex flex-col gap-10 bg-black py-10'>
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSliderOne key={category} category={category} />)
					: SERIES_CATEGORIES.map((category) => <MovieSliderOne key={category} category={category} />)}
			</div>
		</>
	);
};
export default HomeScreen;
