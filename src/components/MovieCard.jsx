import { Text } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import StarRatings from "react-star-ratings";
import MovieDetail from "./MovieDetail";

export default function MovieCard({ movie }) {
    const openDetail = () => openModal({
        children: <MovieDetail movie={movie}/>,
        withCloseButton: false,
        className: 'p-0',
        padding: 0,
        size: 'xl',
    });
    return (
        <div className="w-full relative py-8" onClick={openDetail}>
            <div className="w-full hover:z-10">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" className="w-full h-full object-cover" />
            </div>
        </div>
    )
}