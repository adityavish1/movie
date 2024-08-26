import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";
import { Link } from "react-router-dom";
// import usegetMovieByRating from "../hooks/usegetMovieByRating";
import ReactPlayer from 'react-player';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';


const MovieSlider = ({ category }) => {

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
	const [selectedTrailer, setSelectedTrailer] = useState(null);


	const handlePlayClick = (trailerUrl) => {
		setSelectedTrailer(trailerUrl);
		setPlaying(true);
	};

	const handleCloseClick = () => {
		setPlaying(false);
		setSelectedTrailer(null);
	};

    // const { ratedContent } = usegetMovieByRating();
	const { contentType } = useContentStore();
	const [content, setContent] = useState([]);
	const [showArrows, setShowArrows] = useState(false);

	const sliderRef = useRef(null);

	// const formattedCategoryName =
	// 	category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "SERIES";

	useEffect(() => {
        const getContent = async () => {
            try {
                // const res = await axios.get(`/api/v1/${contentType}/category`);
                const res1 = await axios.get(`/api/v1/${contentType}/category1`);
                console.log(res1)
                // const fetchedContent = res.data.content;
                const fetchedContent1 = res1.data.content;
                console.log("fetchContent",fetchedContent1)

                // Ensure fetchedContent is an array
                if (Array.isArray(fetchedContent1)) {
                    setContent(fetchedContent1);
                } else {
                    console.error('Fetched content is not an array:', fetchedContent1);
                    setContent([]); // Set to an empty array if not an array
                }
            } catch (error) {
                console.error('Error fetching content:', error);
                setContent([]); // Handle error and set to an empty array
            }
        };

        getContent();
    }, [contentType]);
    
    //  console.log(category)
	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	return (
		<div
			className='bg-black text-white relative px-5 md:px-20'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{category} {formattedContentType}
			</h2>

			{!playing && (
				<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
					{content.map((item) => {
						if(item.results.length === 0) return null;
						return (
							<Link
								to={''} // Prevents navigation, triggers play
								className='min-w-[250px] relative group'
								key={item.id}
								onClick={() => handlePlayClick(item.results.trailer)}
							>
								<div className='rounded-lg overflow-hidden'>
									<img
										src={item.results.banner}
										alt='Movie image'
										className='transition-transform duration-300 ease-in-out group-hover:scale-125'
									/>
								</div>
								<p className='mt-2 text-center'>{item.results.title || item.name}</p>
							</Link>
						)
					})}
				</div>
			)}

			{playing && selectedTrailer && (
				<div className='relative w-full mt-8'>
					<ReactPlayer
						controls={true}
						width={'100%'}
						height={playerHeight}
						className='mx-auto overflow-hidden rounded-lg'
						url={selectedTrailer}
						playing={true}
					/>
					<button
						onClick={handleCloseClick}
						className='absolute top-0 right-0 mt-2 mr-2 bg-transparent hover:bg-white/80 text-black font-bold py-2 px-4 rounded-full flex items-center'
					>
						<X className='size-6 fill-black' />
					</button>
				</div>
			)}

			{showArrows && !playing && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10'
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};
export default MovieSlider;