import { useRouter } from "next/router";

import { FaUser } from "react-icons/fa";
import Link from "next/link";
import AuthForm from "../../components/AuthForm";
export default function index() {
  const router = useRouter();
  function handleClick() {
    // router.push("/weather");  //may push to account on protected page if have one or just back to home
  }
  const title = "Register";
  const subtitle = "Create an account";

  return (
    <div className='auth'>
      <div className='login'>
        <AuthForm title={title}>
          <p className='authForm__footer'>
            Already have an account? <Link href='/account/login'>Log In</Link>
          </p>
        </AuthForm>
      </div>
    </div>
  );
}
