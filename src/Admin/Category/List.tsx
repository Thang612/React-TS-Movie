import { ChangeEvent, useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../../Services/MovieService";
import { toast } from "react-toastify";
import Spinner from "../../Component/Spinner";
import Modal from "../../Component/Modal";
import UpdateCategory from "./Update";
import { Category } from "../../Services/interface";

const ListCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [searchCategories, setSearchCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowEditModal, setIsShowModal] = useState(false);
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('')
    const [search, setSearch] = useState('');

    useEffect(() => {
        addAllCategories();
    }, []);

    const addAllCategories = async () => {
        try {
            setIsLoading(true);
            const res = await fetchCategories();
            setCategories(res);
        } catch (err) {
            toast.error("Error fetch category");
        } finally {
            setIsLoading(false);
        }
    }

    const handleDeleteCategory = async (cat: Category) => {
        try {
            const isConfirm = window.confirm(`Delete category: ${cat.name}?`);
            if (!isConfirm) return;

            await deleteCategory(cat.id);
            toast.success("Delete Category Successfully");

            setCategories(prev => prev.filter(item => item.id !== cat.id));
        } catch (err) {
            toast.error("Fail delete category");
        }
    };


    const handelEditCategory = (cat: Category) => {
        setIsShowModal(true);
        setCategoryId(cat.id);
        setCategoryName(cat.name);
    }
    const handleCloseModal = async () => {
        setIsShowModal(false);
        await addAllCategories();
    }

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        setSearchCategories(categories.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        ));
    }

    return (
        <>
            <div className="mb-2">
                <form className="max-w-md ">
                    <label htmlFor="search" className="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" /></svg>
                        </div>
                        <input type="search" id="search" value={search} onChange={(e) => handleSearch(e)} className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
                    </div>
                </form>
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
                    {searchCategories.length > 0 && search.trim() !== ""? searchCategories.map((cat, index) => (
                        <tr key={"category-" + cat.id} className=" hover:bg-gray-700 ">
                            <td className="py-5">{index + 1}</td>
                            <td>{cat.name}</td>
                            <td>
                                <button type="button" className="text-white px-5 py-2 rounded-sm bg-blue-600 mr-4 hover:bg-blue-700" onClick={() => handelEditCategory(cat)}>Edit</button>
                                <button type="button" className="text-white px-5 py-2 rounded-sm bg-red-500 hover:bg-red-600" onClick={() => handleDeleteCategory(cat)}>Delete</button>
                            </td>
                        </tr>

                    )) :
                        categories.map((cat, index) => (
                            <tr key={"category-" + cat.id} className=" hover:bg-gray-700 ">
                                <td className="py-5">{index + 1}</td>
                                <td>{cat.name}</td>
                                <td>
                                    <button type="button" className="text-white px-5 py-2 rounded-sm bg-blue-600 mr-4 hover:bg-blue-700" onClick={() => handelEditCategory(cat)}>Edit</button>
                                    <button type="button" className="text-white px-5 py-2 rounded-sm bg-red-500 hover:bg-red-600" onClick={() => handleDeleteCategory(cat)}>Delete</button>
                                </td>
                            </tr>

                        ))}
                </tbody>
            </table>
            {isShowEditModal && <Modal title="Update Category" handleCloseModal={handleCloseModal} children={<UpdateCategory categoryId={categoryId} categoryName={categoryName} />} />}
        </>
    )
}
export default ListCategories;
