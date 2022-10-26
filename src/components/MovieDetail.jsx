import StarRatings from "react-star-ratings";

export default function MovieDetail({movie}) {
    return (
        <div className="rounded overflow-hidden">
            <div className="w-full h-96 relative">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="w-full h-full object-cover object-top" />
            </div>
            <div className="grid grid-cols-3 p-8 ">
                <div className="col-span-2">
                    <StarRatings
                        rating={movie.vote_average / 2}
                        starRatedColor="yellow"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                    />
                    ({movie.vote_count})
                    <div>{movie.release_date.split('-')[0]}</div>
                    <div className="text-white text-2xl font-bold pb-0">{movie.title}</div>
                    <div className="">
                        {movie.overview}
                    </div>
                </div>
                <div>
                    <div className="flex gap-2">
                        <div>Genre: </div>
                        <div className="font-light">
                            {movie.genres.map((genre) => genre.name).join(', ')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}