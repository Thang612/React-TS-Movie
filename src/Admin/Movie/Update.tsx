import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AdvancedImage, placeholder, responsive } from "@cloudinary/react";
import { Resize } from "@cloudinary/url-gen/actions";

import CloudinaryUploadWidget from "../../Component/CloudinaryUploadWidget";
import { Category, Movie, cld, cloudName } from "../../Services/interface";
import { fetchCategories, getMovieById, updateMovie } from "../../Services/MovieService";
import { toast } from "react-toastify";

type Props = {
    movieId: string
}

const UpdateMovie = ({movieId}:Props) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [banner, setBanner] = useState("");
  const [poster, setPoster] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // ------------------- FETCH DATA -------------------
  useEffect(() => {
    const init = async () => {
      try {
        const catRes = await fetchCategories();
        setCategories(catRes);

        if (!movieId) return;

        const movieData = await getMovieById(movieId);
        if(movieData !== null){
            setMovie(movieData);
            // Fill data into form
            setTitle(movieData.title);
            setDesc(movieData.description);
            setYoutubeUrl(movieData.trailer);
            setBanner(movieData.bannerUrl);
            setPoster(movieData.posterUrl);
            setSelectedCategoryIds(movieData.categoryIds);
        }
        

        
      } catch (err) {
        toast.error("Error loading movie data");
      }
    };

    init();
  }, [movieId]);

  // ------------------- UPDATE CHECKBOX -------------------
  const handleCheckboxChange = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedCategoryIds((prev) => [...prev, id]);
    } else {
      setSelectedCategoryIds((prev) => prev.filter((c) => c !== id));
    }
  };

  // ------------------- HANDLE SUBMIT -------------------
  const handleSubmit = async () => {
    if (!movieId) return;

    setLoading(true);
    try {
      await updateMovie(movieId, {
        title,
        description: desc,
        bannerUrl: banner,
        posterUrl: poster,
        categoryIds: selectedCategoryIds,
        trailer: youtubeUrl
      });

      toast.success("Movie updated successfully!");
    } catch (err) {
      toast.error("Failed to update movie!");
      console.error(err);
    }
    setLoading(false);
  };

  if (!movie) return <div className="text-white p-4">Loading...</div>;

  // -------------------------------------------------------

  return (
    <div className="w-full p-6 bg-gray-800 text-gray-200 overflow-y-auto">

      {/* Title */}
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full p-2 rounded-md text-gray-900"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Description */}
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full p-2 rounded-md text-gray-900 h-28"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
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
            style={{ maxWidth: "100%" }}
            cldImg={cld
              .image(banner)
              .resize(Resize.fill().width(1440).height(527).gravity("center"))}
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
            style={{ maxWidth: "270px" }}
            cldImg={cld
              .image(poster)
              .resize(Resize.fill().width(270).height(340).gravity("center"))}
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
        />
      </div>

      {/* Categories Checkbox */}
      <div>
        <label className="block font-semibold mb-2">Categories</label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 bg-gray-700 px-3 py-1 rounded cursor-pointer hover:bg-gray-600"
            >
              <input
                type="checkbox"
                className="accent-orange-500"
                checked={selectedCategoryIds.includes(cat.id)}
                onChange={(e) =>
                  handleCheckboxChange(cat.id, e.target.checked)
                }
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md mt-4 disabled:opacity-60"
      >
        {loading ? "Updating..." : "Update Movie"}
      </button>
    </div>
  );
};

export default UpdateMovie;
