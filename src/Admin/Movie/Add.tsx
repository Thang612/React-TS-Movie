    import { useEffect, useState } from "react";
    import { toast } from "react-toastify";
    import { addAMovie, fetchCategories } from "../../Services/MovieService";
    import CloudinaryUploadWidget from "../../Component/CloudinaryUploadWidget";
    import { AdvancedImage, responsive, placeholder } from '@cloudinary/react';
    import { Resize } from "@cloudinary/url-gen/actions";
    import { cld, cloudName } from "../../Services/interface";

    interface Category {
        id: string;
        name: string;
    }

    const AddMovie = () => {
        const [title, setTitle] = useState("");
        const [desc, setDesc] = useState("");
        const [youtubeUrl, setYoutubeUrl] = useState("");
        const [loading, setLoading] = useState(false);
        const [banner, setBanner] = useState("");
        const [poster, setPoster] = useState("");
        const [categories, setCategories] = useState<Category[]>([]);
        const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);

        useEffect(() => {
            const getAllCategories = async () => {
                try {
                    const res = await fetchCategories();
                    setCategories(res);
                } catch (err) {
                    toast.error("Error fetching categories");
                }
            };
            getAllCategories();
        }, []);

        const handleCheckboxChange = (id: string, checked: boolean) => {
            if (checked) {
                setSelectedCategoryIds(prev => [...prev, id]);
            } else {
                setSelectedCategoryIds(prev => prev.filter(cid => cid !== id));
            }
        };

        const handleSubmit = async () => {
            if (!selectedCategoryIds.length) {
                toast.error("Please select at least one category");
                return;
            }

            setLoading(true);

            try {
                await addAMovie({
                    title,
                    description: desc,
                    bannerUrl: banner,
                    posterUrl: poster,
                    categoryIds: selectedCategoryIds,
                    trailer: youtubeUrl,
                });

                toast.success("Movie added successfully!");
                setTitle("");
                setDesc("");
                setBanner("");
                setPoster("");
                setYoutubeUrl("");
                setSelectedCategoryIds([]);
            } catch (err) {
                toast.error("Failed to upload movie!");
                console.error(err);
            }

            setLoading(false);
        };



        return (
            <div className="w-full p-6 bg-gray-800 text-gray-200 overflow-y-auto">
                    {/* Title */}
                    <div>
                        <label className="block font-semibold mb-1">Title</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md text-gray-900"
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-semibold mb-1">Description</label>
                        <textarea
                            className="w-full p-2 rounded-md text-gray-900 h-28"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                            required
                        />
                    </div>

                    {/* Banner Upload */}
                    <div>
                        <label className="block font-semibold mb-1">Banner Image</label>
                        <CloudinaryUploadWidget
                            cloudName={cloudName}
                            uploadPreset="React-Ts-Movies"
                            onUpload={(info) => setBanner(info.public_id)}
                        />
                        {banner && (
                            <AdvancedImage
                                style={{ maxWidth: '100%' }}
                                cldImg={cld.image(banner).resize(Resize.fill().width(1440).height(527).gravity("center"))}
                                plugins={[responsive(), placeholder()]}
                            />
                        )}
                    </div>

                    {/* Poster Upload */}
                    <div>
                        <label className="block font-semibold mb-1">Poster Image</label>
                        <CloudinaryUploadWidget
                            cloudName={cloudName}
                            uploadPreset="React-Ts-Movies"
                            onUpload={(info) => setPoster(info.public_id)}
                        />
                        {poster && (
                            <AdvancedImage
                                style={{ maxWidth: '270px' }}
                                cldImg={cld.image(poster).resize(Resize.fill().width(270).height(340).gravity("center"))}
                                plugins={[responsive(), placeholder()]}
                            />
                        )}
                    </div>

                    {/* YouTube URL */}
                    <div>
                        <label className="block font-semibold mb-1">YouTube Trailer URL</label>
                        <input
                            type="text"
                            className="w-full p-2 rounded-md text-gray-900"
                            value={youtubeUrl}
                            onChange={(e) => setYoutubeUrl(e.target.value)}
                            required
                        />
                    </div>

                    {/* Categories Checkbox */}
                    <div>
                        <label className="block font-semibold mb-2">Categories</label>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <label key={cat.id} className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-600">
                                    <input
                                        type="checkbox"
                                        className="accent-orange-500"
                                        checked={selectedCategoryIds.includes(cat.id)}
                                        onChange={(e) => handleCheckboxChange(cat.id, e.target.checked)}
                                    />       
                                    {cat.name}
                                </label>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={()=>handleSubmit()}
                        disabled={loading}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md disabled:opacity-60"
                    >
                        {loading ? "Uploading..." : "Upload Movie"}
                    </button>
            </div>
        );
    };

    export default AddMovie;