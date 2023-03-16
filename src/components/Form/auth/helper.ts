import {
  EMAIL_REGEX,
  DISPOSABLE_DOMAINS,
  PASSWORD_REGEX,
} from "@/constants/common";
import { createFirebaseApp } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  User,
} from "firebase/auth";
import bcrypt from "bcryptjs";
import { addUser } from "@/service/user";
import { OpenInterface } from "@/utils/interfaces";

const app = createFirebaseApp();
const auth = getAuth(app);

const saltRounds = 12;

interface FormProps {
  email: string;
  password: string;
}

interface AuthProps extends FormProps {
  user: User;
  confirmPassword?: string;
}

export const addUserToFirestore = async ({
  password,
  user,
}: AuthProps): Promise<boolean> => {

  const hash = password && await encryptPassword(password);

  const {
    displayName,
    email,
    emailVerified,
    metadata,
    phoneNumber,
    photoURL,
    providerData,
    uid,
  } = user;
  const { creationTime, lastSignInTime } = metadata;
  const { providerId } = providerData[0];
  return await addUser(uid, {
    displayName,
    email,
    emailVerified,
    phoneNumber,
    photoURL,
    providerId,
    uid,
    creationTime,
    lastSignInTime,
    password: hash,
  });
};

export function validateEmail(email: string): boolean {
  const emailDomain = email.split("@")[1];
  return EMAIL_REGEX.test(email) && !DISPOSABLE_DOMAINS.includes(emailDomain);
}

export function validatePassword(pwd: string): boolean {
  return PASSWORD_REGEX.test(pwd);
}

export const encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// This function takes a user's email and password and returns a string containing a JWT token.
export async function login({ email, password }: FormProps): Promise<string> {
  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    return user ? "success" : "error";
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log("----login err-----");
    console.log({ msg: errorMessage, code: errorCode });
    return errorCode.split("/")[1];
  }
}

export const register = async ({
  email,
  password,
}: FormProps): Promise<string> => {
  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = cred.user;
    const added = await addUserToFirestore({ email, password, user });
    return added ? "success" : "error";
  } catch (e: any) {
    const errorCode = e.code;
    const errorMessage = e.message;
    console.log("----register err-----");
    console.log({ msg: errorMessage, code: errorCode });
    return errorCode.split("/")[1];
  }
};

export async function loginWithGoogle(): Promise<string> {
  const googleProvider = new GoogleAuthProvider();

  try{
    const cred = await signInWithPopup(auth, googleProvider)
    const user = cred.user;
    const add = await addUserToFirestore({email: user.email!, password:'' , user})
    return add ? "success" : "error";
  }catch(e:any){
    const errorCode = e.code;
    return errorCode.split("/")[1];
  }
  // Before
  // ==============
  // signInWithRedirect(auth, new GoogleAuthProvider());
  // // After the page redirects back
  // try {
  //   const userCred = await getRedirectResult(auth);
  //   console.log("--------userCred------");
  //   console.log(userCred);
  // } catch (e: any) {
  //   console.log("--------errr------");
  //   console.log(e);
  // }
}
