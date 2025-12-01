import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Configs/firebase";

const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const token = await user.getIdToken(); // 👈 Lấy token đúng cách
    return { user, token };
  } catch (error: any) {
    return { errorCode: error.code, errorMessage: error.message };
  }
};


export {login}