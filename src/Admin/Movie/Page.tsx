import { useEffect, useState } from "react";
import Modal from "../../Component/Modal";
import AddMovie from "./Add";
import { deleteMovie, fetchMovies } from "../../Services/MovieService";
import { toast } from "react-toastify";
import Spinner from "../../Component/Spinner";
import { Movie } from "../../Services/interface";
import UpdateMovie from "./Update";

const AdminMovie = () => {
    const [isShowModal, setIsShowModal] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [isShowEditModal, setIsShowEditModal] = useState(false);
    const [movieEditId, setMovieEditId] = useState('');
    useEffect(() => {
        getAllMovies();
    }, [])

    const getAllMovies = async () => {
        try {
            setIsLoading(true);
            const res = await fetchMovies();
            setMovies(res)
        } catch (err) {
            toast.error("Fetch Movies Error");
        } finally {
            setIsLoading(false);
        }
    }

    const handleCloseModal = () => {
        setIsShowModal(false);
    }

    const handleCloseUpdateModal = () => {
        setIsShowEditModal(false)
    }

    const handelEditCategory = (movie: Movie) => {
        alert(">>>>>>>>>>>Check")
        setMovieEditId(movie.id);
        setIsShowEditModal(true);
    }

    const handleDeleteCategory = async (movie: Movie) => {
        if (window.confirm(`You want to delete ${movie.title}`)) {
            await deleteMovie(movie.id)
        }
    }
    return (<>
        <div className="mt-4 flex justify-between items-center">
            <h1 className="text-2xl text-gray-200 font-semibold"><i className="fa-solid fa-film"></i> Admin Movie</h1>
            <button onClick={() => setIsShowModal(true)} data-modal-target="default-modal" data-modal-toggle="default-modal" className="my-5 text-white bg-orange-500  rounded-sm box-border border border-transparent hover:bg-orange-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
                Add new movie
            </button>
        </div>
        <table className="table-fixed w-full text-center text-gray-200">
            <thead>
                <tr className="bg-gray-900 ">
                    <th className="py-3 w-7">#</th>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            {isLoading && <Spinner width={5} />
            }
            <tbody>
                {movies.map((movie, index) => (
                    <tr key={"movie-" + movie.id} className=" hover:bg-gray-700 ">
                        <td className="py-5">{index + 1}</td>
                        <td>{movie.title}</td>
                        <td>
                            <button type="button" className="text-white px-5 py-2 rounded-sm bg-blue-600 mr-4 hover:bg-blue-700" onClick={() => handelEditCategory(movie)}>Edit</button>
                            <button type="button" className="text-white px-5 py-2 rounded-sm bg-red-500 hover:bg-red-600" onClick={() => handleDeleteCategory(movie)}>Delete</button>
                        </td>
                    </tr>

                ))}
            </tbody>
        </table>
        {isShowModal && <Modal title="Add Movie" children={<AddMovie />} handleCloseModal={handleCloseModal} />}
        {isShowEditModal && <Modal title="Update Movie" children={<UpdateMovie movieId={movieEditId} />} handleCloseModal={handleCloseUpdateModal} />}

    </>)
}

export default AdminMovie;