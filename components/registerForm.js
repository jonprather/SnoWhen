import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import AuthContext from "@/context/AuthContext";
const schema = yup
  .object({
    email: yup.string().required("Email is required").email(),
    password: yup.string().required("Password is required").min(5),

    confirmPassword: yup
      .string()
      .required("Confirm Password is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  })
  .required();

export default function AuthForm({ title, isRegister, children }) {
  const router = useRouter();
  const { register, error, user } = React.useContext(AuthContext);

  const {
    register: registerFormData,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    const { email, password } = data;
    const username = email;
    register({ username, email, password });
  };
  React.useEffect(() => {
    if (user) router.push("/account");

    if (error) {
      toast.error(error);
    }
  }, [error, user]);
  return (
    <div className='authForm overlay'>
      <h1>
        <FaUser /> {title}
      </h1>
      <ToastContainer />

      <form className='authForm__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='authForm__form__form-group'>
          <label className='authForm__form__label' htmlFor='email'>
            Email
          </label>
          <input
            // placeholder='john@gmail.com' looks janky
            {...registerFormData("email")}
            className='authForm__form__input'
          />
          <p className='authForm__form__errors'>{errors.email?.message}</p>
        </div>
        <div className='authForm__form__form-group'>
          <label className='authForm__form__label' htmlFor='password'>
            password
          </label>

          <input
            type='password'
            className='authForm__form__input'
            {...registerFormData("password")}
          />
          <p className='authForm__form__errors'>{errors.password?.message}</p>
        </div>

        <div className='authForm__form__form-group'>
          <label className='authForm__form__label' htmlFor='confirmPassword'>
            Confirm password
          </label>

          <input
            type='password'
            className='authForm__form__input'
            {...registerFormData("confirmPassword")}
          />
          <p className='authForm__form__errors'>
            {errors.confirmPassword?.message}
          </p>
        </div>

        <input type='submit' className='authForm__form__btn btn' />
      </form>
      {children}
    </div>
  );
}
