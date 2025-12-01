import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addACategory } from "../../Services/MovieService";
import { toast } from "react-toastify";


const AddCategory = () => {
  
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const handleAddCategory = async () => {
    if (!auth.currentUser) {
      alert("You must be logged in to add a category");
      return;
    }

    if (!categoryName.trim()) return;

    setLoading(true);
    try {
        await addACategory({name:categoryName });
        toast.success("Add category successful")   
    } catch (err) {
      console.error(err);
      toast.error("Add category error")
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
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <button
          onClick={handleAddCategory}
          className={`bg-orange-600 text-white px-4 rounded ${loading ? "opacity-50" : ""}`}
          disabled={loading || categoryName===""}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddCategory;
