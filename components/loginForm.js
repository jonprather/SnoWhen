import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";
import AuthContext from "@/context/AuthContext";
const schema = yup
  .object({
    email: yup.string().required("Email is required").email(),
    password: yup.string().required("Password is required").min(5),
  })
  .required();

export default function AuthForm({ title, children }) {
  const router = useRouter();
  const { login, error, user, setError } = React.useContext(AuthContext);

  useEffect(() => {
    if (user) router.push("/account");
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);

      setError(null);
    }
  }, [error]);
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
  };
  return (
    <>
      <div className='authForm overlay'>
        <h1>
          <FaUser /> {title}
        </h1>
        <form className='authForm__form' onSubmit={handleSubmit(onSubmit)}>
          <div className='authForm__form__form-group'>
            <label className='authForm__form__label' htmlFor='email'>
              Email
            </label>
            <input {...register("email")} className='authForm__form__input' />
            <p className='authForm__form__errors'>{errors.email?.message}</p>
          </div>
          <div className='authForm__form__form-group'>
            <label className='authForm__form__label' htmlFor='password'>
              password
            </label>

            <input
              type='password'
              className='authForm__form__input'
              autoComplete='current-password'
              {...register("password")}
            />
            <p className='authForm__form__errors'>{errors.password?.message}</p>
          </div>

          {false ? (
            <input type='submit' className='authForm__form__btn btn' />
          ) : (
            <button
              className={` btn authForm__form__btn ${
                Object.entries(errors).length > 0 &&
                "authForm__form__btn--disabled"
              }`}
            >
              Submit
            </button>
          )}
        </form>
        {children}
      </div>
      {/* Put outside for z-index reasons */}
    </>
  );
}
