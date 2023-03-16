import React, { useState } from "react";
import Modal from "@/components/Form/modal";
import AuthForm from "@/components/Form/auth";
import {
  login,
  loginWithGoogle,
  register,
  validateEmail,
  validatePassword,
} from "@/components/Form/auth/helper";
import { OpenInterface } from "@/utils/interfaces";
import LoadingModal from "./loading-modal";

const registerContent = {
  linkUrl: "/login",
  accountText: "Already have an account?",
  otherPage: "Login",
  header: "Create a new account",
  buttonText: "Create account",
};

const loginContent = {
  linkUrl: "/signup",
  accountText: "Don't have an account?",
  otherPage: "Create account",
  header: "Sign in to your account",
  buttonText: "Login to your account",
};

const initial = {
  email: "",
  password: "",
  confirmPassword: "",
};

const FormModal = ({ isOpen, setIsOpen }: OpenInterface) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formState, setFormState] = useState({ ...initial });
  const [formStateErrors, setFormStateErrors] = useState({ ...initial });
  const [loading, setLoading] = useState(false);
  const [googleWindow, setGoogleWindow] = useState(false)

  const content = isLogin ? loginContent : registerContent;

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const { value, name } = event.target;
    setFormState((s) => ({ ...s, [name]: value }));
    setFormStateErrors((s) => ({ ...s, [name]: "" }));
  };

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    validateInput();
    const err =
      formStateErrors.email ||
      formStateErrors.password ||
      formStateErrors.confirmPassword;
    if (!err) {
      setLoading(true);
      handleSubmit(e);
    }
  };

  const validateInput = () => {
    setFormStateErrors((s) => {
      const { email, password, confirmPassword } = formState;
      const errObj = { ...s };
      if (!email || !validateEmail(email)) {
        // Check if the email is valid
        errObj.email = "Please enter a valid email";
      }
      if (!password || !validatePassword(password)) {
        // Check if the password is valid
        errObj.password = "Please must be 8 characters or above";
      }
      // Check if the confirmation password matches the password
      if (!confirmPassword || confirmPassword !== password) {
        errObj.confirmPassword =
          "Password and Confirm Password does not match.";
      }
      return errObj;
    });
  };

  const handleGoogleLogin = async () => {
    setGoogleWindow(true)
    const res = await loginWithGoogle();
    if (res === "success") {
      setIsOpen(() => !isOpen);
    }
    setGoogleWindow(false)
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent page refresh on form submit
    e.preventDefault();
    try {
      const msg = isLogin ? await login(formState) : await register(formState);
      // If message is success, push user to home page
      if (msg === "success") {
        setIsOpen(() => !isOpen);
        setFormState(initial);
      } else {
        setFormStateErrors((s) => ({
          confirmPassword: msg,
          email: msg,
          password: msg,
        }));
      }
    } catch (e) {
      console.log("----this is ther error----");
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Modal>
      {isOpen && (
        <AuthForm
          content={content}
          onSubmit={onFormSubmit}
          formState={formState}
          onChange={onInputChange}
          formStateErrors={formStateErrors}
          login={isLogin}
          closeClick={() => setIsOpen(false)}
          swithAccClick={() => setIsLogin(!isLogin)}
          googleClick={handleGoogleLogin}
        />
      )}
      {loading && <LoadingModal isOpen={loading} setIsOpen={setLoading} />}
      {googleWindow && <LoadingModal isOpen={googleWindow} setIsOpen={setGoogleWindow} />}
    </Modal>
  );
};

export default FormModal;
