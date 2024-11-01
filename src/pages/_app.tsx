import "@/styles/globals.css";
import "@/styles/globalsMidnight.css";
import "@/styles/globalsDark.css";
import "@/styles/globalsLight.css";
import "@/styles/globalsTerminalGreen.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
