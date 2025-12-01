import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../Configs/firebase";

interface Movie {
  id?: string;
  title: string;
  description: string;
  bannerUrl: string;  // không phải File
  trailer: string;
}
type AddCategory = {
   name: string;
}

interface Category {
  id: string;
  name: string;
}

const addAMovie = async (movie: Movie) => {
  const docRef = await addDoc(collection(db, "movies"), movie);
  console.log("Movie added with ID:", docRef.id);
  return docRef.id;
};

const addACategory = async (category: AddCategory) => {
  const docRef = await addDoc(collection(db, "categories"), category);
  return docRef.id;
}

const updateCategory = async (category: Category) =>{
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
  await deleteDoc(doc(db, "categories", id));
};

export { addAMovie, fetchCategories, addACategory, deleteCategory, updateCategory}

