import { ReactNode } from "react";

type Props = {
    children: ReactNode;
    title: string;
    handleCloseModal: () => void;
};

const Modal = ({ children, title, handleCloseModal }: Props) => {
    return (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-gray-800 bg-opacity-45">
            <div className="flex justify-center items-center min-h-screen">
                <div className="max-h-screen overflow-y-auto animate__animated animate__fadeInDown  bg-gray-800 rounded-lg p-4 shadow-sm shadow-gray-400 relative">
                    <h2 className="text-xl text-center text-white">{title}</h2>

                    <div className="mt-2 text-black">
                        {children}
                    </div>

                    <button
                        className="w-6 h-6  bg-slate-300 absolute top-0 right-0  text-white rounded"
                        onClick={handleCloseModal}
                    >
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
