import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../Configs/firebase";
import { Category, Movie } from "./interface";

type AddCategory = {
  name: string;
}

type AddMovie ={
  title: string;
  description: string;
  bannerUrl: string;  // không phải File
  posterUrl: string;  // không phải File
  categoryIds: string[];
  trailer: string;
}

const addAMovie = async (movie: AddMovie) => {
  const docRef = await addDoc(collection(db, "movies"), movie);
  console.log("Movie added with ID:", docRef.id);
  return docRef.id;
};

// Fetch existing categories
const fetchMovies = async () => {
  const q = collection(db, "movies");
  const snapshot = await getDocs(q);

  const list: Movie[] = snapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      title: data.title || "",
      description: data.description || "",
      bannerUrl: data.bannerUrl || "",
      posterUrl: data.posterUrl || "",
      categoryIds: data.categoryIds || [],
      trailer: data.trailer || ""
    };
  });

  return list;
};

const getMovieById = async (id: string): Promise<Movie | null> => {
  try {
    const snap = await getDoc(doc(db, "movies", id));

    if (!snap.exists()) return null;

    return {
      id: snap.id,
      ...snap.data(),
    } as Movie;
  } catch (error) {
    console.error("Error fetching movie by id:", error);
    return null;
  }
};

const updateMovie = async (id: string, updatedMovie: AddMovie) => {
  try {
    const movieRef = doc(db, "movies", id);

    await updateDoc(movieRef, {
      title: updatedMovie.title,
      description: updatedMovie.description,
      bannerUrl: updatedMovie.bannerUrl,
      posterUrl: updatedMovie.posterUrl,
      categoryIds: updatedMovie.categoryIds,
      trailer: updatedMovie.trailer,
    });

    return true;
  } catch (err) {
    console.error("Error in updateMovie:", err);
    return false;
  }
};

const deleteMovie = async (id:string) =>{
  await deleteDoc(doc(db, "movies", id));
}


const addACategory = async (category: AddCategory) => {
  const docRef = await addDoc(collection(db, "categories"), category);
  return docRef.id;
}

const updateCategory = async (category: Category) => {
  const docRef = doc(db, "categories", category.id); // trỏ đúng document

  const res = await updateDoc(docRef, {
    name: category.name,
  });

  return res;
}

// Fetch existing categories
const fetchCategories = async () => {
  const q = collection(db, "categories");
  const snapshot = await getDocs(q);
  const list: Category[] = snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name
  }));
  return list;
};


const deleteCategory = async (id: string) => {
  // Xóa category
  await deleteDoc(doc(db, "categories", id));
  console.log(">>>>>>>>>>Check id ", id);
  // Tìm movies
  const q = query(collection(db, "movies"), where("categoryIds", "array-contains", id.trim()));
  getDocs(q).then((snap) => {
    console.log("Check snap: ", snap.docs);
    snap.docs.forEach(async (movieSnap) => {
      const movieRef = doc(db, "movies", movieSnap.id);
      const movie = movieSnap.data();   

      const updated = movie.categoryIds.filter((c: string) => c !== id);

      try {
        await updateDoc(movieRef, { categoryIds: updated });
      } catch (err) {
        console.log("Check delete category", err);
      }
    });
  });

};


export { addAMovie, fetchCategories, addACategory, deleteCategory, updateCategory, fetchMovies, deleteMovie, getMovieById, updateMovie}

