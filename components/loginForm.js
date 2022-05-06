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
  })
  .required();

export default function AuthForm({ title, children }) {
  const notify = () => toast("Wow so easy!");
  const router = useRouter();
  const { login, error, user } = React.useContext(AuthContext);

  React.useEffect(() => {
    if (user) router.push("/account");
    //this will auto push if already logged in
    //also will push auto from the promise area of AuthContext
    if (error) {
      toast.error(error);
    }
  }, [user, error]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    login({ email, password });
    console.log("Data here to check", user);
    // if (user) router.push("/account/");
  };
  return (
    <div className='authForm overlay'>
      <h1>
        <FaUser /> {title}
      </h1>
      <form className='authForm__form' onSubmit={handleSubmit(onSubmit)}>
        <div className='authForm__form__form-group'>
          <label className='authForm__form__label' htmlFor='email'>
            Email
          </label>
          <input
            {...register("email")}
            className='authForm__form__input'
            // placeholder='john@gmail.com'  looks jank padding wise
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
            {...register("password")}
          />
          <p className='authForm__form__errors'>{errors.password?.message}</p>
        </div>

        <input type='submit' className='authForm__form__btn btn' />
      </form>
      {children}
      <ToastContainer />
    </div>
  );
}
