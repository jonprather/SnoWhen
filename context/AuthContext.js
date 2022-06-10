import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { NEXT_URL } from "@/config/index";

const AuthContext = createContext();
const createMsg = (keyword) => {
  return `${keyword} Successful`;
};
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);

  const router = useRouter();

  useEffect(() => checkUserLoggedIn(), []);

  // Register user
  const register = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      // could use reducer with payload and
      setMsg({ type: "register", msg: createMsg() });

      router.push("/account/");
    } else {
      setError(data.message);
      setError(null);
    }
  };

  // Login user
  const login = async ({ email: identifier, password }) => {
    try {
      const res = await fetch(`${NEXT_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
        setMsg({ type: "login", msg: "login successful" });

        router.push("/account/");
        //ok seems to work next test the jwt works right now the user is in AuthProvider
        // Errors arent working right yet DUe to strapi bug so //
        // TODO there
        // so test protected route... fix error logging with strapi
        // redirect to the protected route check it authed and not
        // then next after fixing account page test authorized vs non authroized...
        //do similar fixes for register ie redirect to account also fix error messages...
      } else {
        setError(data.message);
        //TODO this login fail is not error out info to user should say hey pal not authorized
        // bc wrong pw instead it doesnt do anything
        //so im thinking the issue is  well have authCtx-> login route -> strapi and back  it gets to strapi but the error
        //i will check data. message in the api page console . log to see what it is then i might know thats next
        //data.message is undefined so theres my sissue not getting back what i think in strapi
      }
    } catch (error) {
      setError(error);
      console.log("IN CATCH LOGIN USERS", error);
      //SyntaxError: Unexpected token I in JSON at position 0 wtf is this?
      //i sthis how i hanlde errors from strapi in login api or is it from strpai jank
    }
  };

  // Logout user
  const logout = async () => {
    const res = await fetch(`${NEXT_URL}/api/logout`, {
      method: "POST",
    });

    if (res.ok) {
      setUser(null);
      setMsg({ type: "logout", msg: "logout successful" });
      router.push("/");
    }
  };

  // Check if user is logged in
  const checkUserLoggedIn = async (user) => {
    const res = await fetch(`${NEXT_URL}/api/user`);
    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
    } else {
      setUser(null);
      router.push("/account/login");
      //oh TODO maybe this is getting checked in reg and pushing to login which is bad UX
      //this works as an auth check and redirect..
      //call it once in account useEffect
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        setError,
        register,
        login,
        logout,
        checkUserLoggedIn,
        msg,
        setMsg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
