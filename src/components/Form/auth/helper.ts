import {
  EMAIL_REGEX,
  DISPOSABLE_DOMAINS,
  PASSWORD_REGEX,
} from "@/constants/common";
import { createFirebaseApp } from "@/firebase/init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

const app = createFirebaseApp();
const auth = getAuth(app);

type FormProps = {
  email: string;
  password: string;
};

// Validate email using a regular expression.
// This function returns true if the email is valid, and false otherwise.
// The regular expression is defined in the constant EMAIL_REGEX.
// If the email is valid, the variable emailParts is set to an array
// containing the parts of the email address.
export function validateEmail(email: string): boolean {
  // Validate email address format using regex
  if (!EMAIL_REGEX.test(email)) {
    return false;
  }
  // Check if email domain is a known disposable email provider
  const emailDomain = email.split("@")[1];
  if (DISPOSABLE_DOMAINS.includes(emailDomain)) {
    return false;
  }
  // Email address passed all checks
  return true;
}

// This code checks whether a password is valid or not.
// The password is valid if it is at least 8 characters long.
export function validatePassword(pwd: string): boolean {
  return PASSWORD_REGEX.test(pwd);
}

// This function takes a user's email and password and returns a string containing a JWT token.
export async function login({ email, password }: FormProps): Promise<string> {
  let msg = "";
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("success", user);
      // ...
      msg = "success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert({ msg: errorMessage, code: errorCode });
      switch (errorCode) {
        case "auth/invalid-credential":
          //   setFormStateErrors((s) => ({
          //     ...s,
          //     password: "Invalid credentials",
          //     confirmPassword: "Invalid credentials",
          //   }));
          msg = "Invalid credentials";
          break;
        case "auth/invalid-email":
          //   setFormStateErrors((s) => ({ ...s, email: "Invalid email" }));
          msg = "Invalid email";
          break;
        case "auth/invalid-password":
          //   setFormStateErrors((s) => ({ ...s, password: "Invalid password" }));
          msg = "Invalid password";
          break;

        default:
          break;
      }
      msg = "error";
    });
  return msg;
}

// Register a new user with the given email and password
// If the user is successfully registered, then return the user's id
// Otherwise, return an error message
export async function register({ email, password }: FormProps): Promise<string> {
  let msg = "";
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log("success", user);
      msg = "success";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      window.alert({ msg: errorMessage, code: errorCode });
      // ..
      // setFormState((s) => ({ ...s, email: errorMessage }));
      switch (errorCode) {
        case "auth/email-already-exists":
        msg = "Email already exists";
          break;
        case "auth/invalid-email":
        msg = "Invalid email";
          break;
        case "auth/invalid-password":
        case "auth/weak-password":
        case "auth/invalid-password-hash":
        case "auth/invalid-password-salt":
        msg = "Invalid password";
          break;

        default:
          break;
      }
      msg = "error";
    });
  return msg;
}

// This function logs in a user with a Google account.
// It is called when the user clicks the "Login with Google" button.
// The function is called from the HTML file.
export function loginWithGoogle() {
  const googleProvider = new GoogleAuthProvider();

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log("sign with google user", user)
      console.log("sign with google cred", credential)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      window.alert({ msg: errorMessage, code: errorCode, cred: credential, email: email});
    });
}
