import '@mantine/core/styles.css';
import "@/styles/globals.css";
import "@/styles/globalsMidnight.css";
import "@/styles/globalsDark.css";
import "@/styles/globalsLight.css";
import "@/styles/globalsTerminalGreen.css";
import "@/styles/resume.css";

import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider defaultColorScheme="light">
			<Component {...pageProps} />
		</MantineProvider>
	);
}
