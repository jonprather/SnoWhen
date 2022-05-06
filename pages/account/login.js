import { useRouter } from "next/router";

import Link from "next/link";
import LoginForm from "../../components/loginForm";
import Layout from "@/components/layout";
export default function index() {
  const router = useRouter();

  const title = "Log In";
  const subtitle = "Sign in to your account";

  return (
    <Layout title='SnoWhen log in' description='Log Into snoWhen'>
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
    </Layout>
  );
}
