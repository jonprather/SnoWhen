import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { toast } from "react-toastify";

import AuthContext from "@/context/AuthContext";

import Layout from "@/components/layout";
import AccountPage from "@/components/templates/Account";

export default function index() {
  const { user, dispatchMsg, message, checkUserLoggedIn } =
    useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  //TODO so when not logged in you get pushed to locgin but error still occurs and its a 500 error it should tell user to log in first

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatchMsg({});
    }
  }, [message]);

  return !user ? (
    <Layout title='SnoWhen - Account' description='snoWhen Account page' />
  ) : (
    <Layout title='SnoWhen - Account' description='snoWhen Account page'>
      <AccountPage />
    </Layout>
  );
}
