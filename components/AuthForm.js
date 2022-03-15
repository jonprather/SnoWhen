import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { FaUser } from "react-icons/fa";

import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required().email(),
    password: yup.string().required().min(5),
  })
  .required();

export default function AuthForm({ title, children }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);

  return (
    <div className='authForm'>
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

          <input className='authForm__form__input' {...register("password")} />
          <p className='authForm__form__errors'>{errors.password?.message}</p>
        </div>

        <input type='submit' className='authForm__form__btn btn' />
      </form>
      {children}
    </div>
  );
}
