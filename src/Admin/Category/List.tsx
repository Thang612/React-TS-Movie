import { useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../../Services/MovieService";
import { toast } from "react-toastify";
import Spinner from "../../Component/Spinner";
import Modal from "../../Component/Modal";
import UpdateCategory from "./Update";

interface Category {
    id: string;
    name: string;
}

const ListCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowEditModal, setIsShowModal] = useState(false); 
    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('')

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


    const handelEditCategory = (cat : Category)=>{
        setIsShowModal(true);
        setCategoryId(cat.id);
        setCategoryName(cat.name);
    }
    const handleCloseModal =async ()=>{
        setIsShowModal(false);
        await addAllCategories();
    }

    return (
        <>
            <table className="table-fixed w-full text-center text-gray-200">
                <thead>
                    <tr className="bg-gray-900 ">
                        <th className="py-3 w-7">#</th>
                        <th>Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && <Spinner width={5} />
                    }
                    {categories.map((cat, index) => (
                        <tr key={"category-" + cat.id} className=" hover:bg-gray-700 ">
                            <td className="py-5">{index +1}</td>
                            <td>{cat.name}</td>
                            <td>
                                <button type="button" className="text-white px-5 py-2 rounded-sm bg-blue-600 mr-4 hover:bg-blue-700" onClick={()=>handelEditCategory(cat)}>Edit</button>
                                <button type="button" className="text-white px-5 py-2 rounded-sm bg-red-500 hover:bg-red-600" onClick={()=>handleDeleteCategory(cat)}>Delete</button>
                            </td>
                        </tr>
                 
                    ))}
                </tbody>
            </table>
            {isShowEditModal && <Modal title="Update Category" handleCloseModal={handleCloseModal} children={<UpdateCategory categoryId={categoryId} categoryName={categoryName}/>}/>}
        </>
    )
}
export default ListCategories;
