import { useRouter } from "next/router";
import Page from "../../components/Page";
import Link from "next/link";
import AuthForm from "../../components/AuthForm";
export default function index() {
  const router = useRouter();
  function handleClick() {
    // router.push("/weather");  //may push to account on protected page if have one or just back to home
  }
  const title = "Log In";
  const subtitle = "Sign in to your account";

  const footer = (
    <p className='authForm__footer'>
      Don't have an account? <Link href='/account/register'>Register</Link>
    </p>
  );

  return (
    <div className='auth'>
      <div className='login'>
        <AuthForm title={title} footer={footer}></AuthForm>
      </div>
    </div>
  );
}
