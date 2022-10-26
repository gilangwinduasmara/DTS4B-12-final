import { AppShell, Button, Header, Navbar } from "@mantine/core";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import '@splidejs/react-splide/css';
import MenuBar from "../components/MenuBar";
import MovieCard from "../components/MovieCard";
import { moviesAsync, selectMoviesByGenre, selectPopularMovies, selectSpotLight } from "../reducers/movieSlice";
import MovieDetail from "../components/MovieDetail";
import { openModal } from "@mantine/modals";


export default function BrowsePage() {
    const dispatch = useDispatch();
    const spotLight = useSelector(selectSpotLight);
    const populars = useSelector(selectPopularMovies);
    const moviesByGenre = useSelector(selectMoviesByGenre);
    const openDetail = () => openModal({
        children: <MovieDetail movie={spotLight} />,
        withCloseButton: false,
        className: 'p-0',
        padding: 0,
        size: 'xl',
    });
    useEffect(() => {
        dispatch(moviesAsync())
    }, []);
    return (
        <AppShell
            header={<MenuBar />}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0], padding: 0 },
            })}
        >
            <div className="min-h-screen w-screen relative">
                {
                    spotLight && (
                        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-80 z-10">
                            <div className="flex flex-col items-center justify-center h-full">
                                <div className="flex flex-col items-center justify-center">
                                    <img src={`https://image.tmdb.org/t/p/original${spotLight.backdrop_path}`} alt="" className="w-screen h-screen object-cover opacity-75" />
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="absolute bottom-0 z-10 w-[32rem] p-8 space-y-2">
                    <div className="text-white text-2xl font-bold">{spotLight?.title}</div>
                    <div>{spotLight?.overview}</div>
                    <div className="flex gap-4">
                        <Button className="bg-white text-black">Play</Button>
                        <Button onClick={openDetail}>More Info</Button>
                    </div>
                </div>
            </div>
            <div
                className="text-white text-2xl font-bold p-8 pb-0"
            >
                Popular
            </div>
            {
                populars?.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                        <Splide
                            options={{
                                type: "loop",
                                perPage: 8,
                                autoplay: true
                            }}
                        >
                            {
                                populars.map((movie) => (
                                    <SplideSlide key={movie.id}>
                                        <MovieCard movie={movie} />
                                    </SplideSlide>
                                ))
                            }
                        </Splide>
                    </div>
                )
            }
            {
                moviesByGenre !== null && (
                    <div className="flex flex-col gap-4 p-8">
                        {
                            Object.keys(moviesByGenre).map((genreKey) => (
                                <div key={genreKey}>
                                    <div className="text-white text-2xl font-bold">{genreKey}</div>

                                    <div className="flex flex-wrap gap-4">
                                        <Splide
                                            options={{
                                                type: "loop",
                                                perPage: 8,
                                                autoplay: true
                                            }}
                                        >
                                            {
                                                moviesByGenre[genreKey].map((movie) => (
                                                    <SplideSlide key={movie.id}>
                                                        <MovieCard key={movie.id} movie={movie} />
                                                    </SplideSlide>
                                                ))
                                            }
                                        </Splide>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </AppShell>
    )
}