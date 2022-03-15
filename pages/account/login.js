import { useRouter } from "next/router";

import Link from "next/link";
import LoginForm from "../../components/loginForm";
export default function index() {
  const router = useRouter();
  function handleClick() {
    // router.push("/weather");  //may push to account on protected page if have one or just back to home
  }
  const title = "Log In";
  const subtitle = "Sign in to your account";

  return (
    <div className='auth'>
      <div className='login'>
        <LoginForm title={title}>
          <p className='authForm__footer'>
            Don't have an account?{" "}
            <Link href='/account/register'>Register</Link>
          </p>
        </LoginForm>
      </div>
    </div>
  );
}
