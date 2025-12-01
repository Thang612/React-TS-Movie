import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { updateCategory } from "../../Services/MovieService";
import { toast } from "react-toastify";

type Props = {
    categoryId: string,
    categoryName: string
}

const UpdateCategory = ({ categoryId, categoryName }: Props) => {
    const [newCategory, setNewCategory] = useState(categoryName)
    const [loading, setLoading] = useState(false);

    const auth = getAuth();
      useEffect(()=>{
            console.log(">>>Check props: ",categoryId, categoryName)
        },[])

    const handleUpdateCategory = async () => {
        if (!auth.currentUser) {
            alert("You must be logged in to add a category");
            return;
        }

        if (!categoryName.trim()) return;


      

        setLoading(true);
        try {
            await updateCategory({ id: categoryId, name: newCategory });
            toast.success("Update category successful")
        } catch (err) {
            console.error(err);
            toast.error("Update category error")
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 text-gray-300 ">
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    className="flex-1 border p-2 rounded text-gray-700"
                    placeholder="Category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                />
                <button
                    onClick={handleUpdateCategory}
                    className={`bg-orange-600 text-white px-4 rounded ${loading ? "opacity-50" : ""}`}
                    disabled={loading || categoryName === ""}>
                    Update
                </button>
            </div>
        </div>
    );
};

export default UpdateCategory;
