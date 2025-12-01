import { useState } from "react";
import ListCategories from "./List"
import Modal from "../../Component/Modal";
import AddCategory from "./Add";

const PageCategory = () => {
    const [isShowModal, setIsShowModal] = useState(false);

    const handleCloseModal = ()=>{
        console.log("dsad")
        setIsShowModal(false);
    }

    return (<>
        <h1 className="my-4 font-semibold text-2xl text-gray-200"> <i className="fa-regular fa-folder-open"></i> Categories</h1>
        <button onClick={()=>setIsShowModal(true)} data-modal-target="default-modal" data-modal-toggle="default-modal" className="my-5 text-white bg-orange-500  rounded-sm box-border border border-transparent hover:bg-orange-600 focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" type="button">
            Add new category
        </button>
        <ListCategories />
        {isShowModal && <Modal title="Add Category" children={<AddCategory/>} handleCloseModal={handleCloseModal}/>}
    </>)
}
export default PageCategory;