import * as React from "react";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import ethers from "ethers";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
