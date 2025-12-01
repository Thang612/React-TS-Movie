import { useState } from "react";
import { toast } from "react-toastify";
import { addAMovie } from "../../Services/MovieService";
import CloudinaryUploadWidget from "../../Component/CloudinaryUploadWidget";
import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
import { Cloudinary } from "@cloudinary/url-gen";
import { Resize } from "@cloudinary/url-gen/actions";

const AddMovie = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [banner, setBanner] = useState("")
      // Configuration
    const cloudName = 'dsdtprmq5'


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            // 2. Save vào Firestore
            await addAMovie({
                title,
                description: desc,
                bannerUrl: banner,
                trailer: youtubeUrl,
            });

            toast.success("Movie added successfully!");

            // reset form
            setTitle("");
            setDesc("");
            setBanner("");
            setYoutubeUrl("");


        } catch (err) {
            toast.error("Failed to upload movie!");
            console.error(err);
        }

        setLoading(false);
    };

    // Cloudinary configuration
    const cld = new Cloudinary({
        cloud: {
            cloudName,
        },
    });


    return (
        <div className="w-full h-screen overflow-y-auto mx-auto p-6 rounded-lg shadow-md text-gray-200">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

                {/* Title */}
                <div>
                    <label className="block font-semibold mb-1">Title</label>
                    <input
                        type="text"
                        className="border rounded-md w-full px-3 py-2 text-gray-900"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block font-semibold mb-1">Description</label>
                    <textarea
                        className="border rounded-md w-full px-3 py-2 h-28 text-gray-900"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        required
                    />
                </div>

                {/* Banner Upload */}
                <div>
                    <label className="block font-semibold mb-1">Banner Image</label>
                    <CloudinaryUploadWidget
                        cloudName="dsdtprmq5"
                        uploadPreset="React-Ts-Movies"
                        onUpload={(info) => setBanner(info.public_id)}
                    />

                    {banner && (
                        <AdvancedImage
                            style={{ maxWidth: '270px' }}   
                            cldImg={cld.image(banner).resize(Resize.fill().width(270).height(340).gravity("center"))}
                            plugins={[responsive(), placeholder()]}
                        />
                    )}
                </div>

                {/* YouTube URL */}
                <div>
                    <label className="block font-semibold mb-1">YouTube Trailer URL</label>
                    <input
                        type="text"
                        className="border rounded-md w-full px-3 py-2 text-gray-900"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 disabled:opacity-60"
                >
                    {loading ? "Uploading..." : "Upload Movie"}
                </button>
            </form>
        </div>
    );
};

export default AddMovie;
