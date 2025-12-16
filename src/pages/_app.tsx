import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store, { setUser } from "../store";
import dynamic from "next/dynamic";
import Head from "next/head";
import { Component } from "lucide-react";
import { useEffect } from "react";

const Navbar = dynamic(() => import("@/components/Navbar"), {
  ssr: false, // 🔥 prevents hydration mismatch
});

const Myapp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const storeuser = localStorage.getItem("user");
    if (storeuser) {
      store.dispatch(setUser(JSON.parse(storeuser)));
    }
  },[]);
  return(
    <div>
      <div className="min-h-screen">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </div>
  )
};

export default function App(props : AppProps) {
  return (
    <Provider store={store}>
      <Head>
        <title>MakeMy Tour</title>
      </Head>
      <Myapp {...props}/>
    </Provider>
  );
}
