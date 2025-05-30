import Head from "next/head";
import { CommonPageWrapper } from "@/modules/common/CommonPageWrapper";
import { HomePage } from "@/modules/home/HomePage";
import { ThemeProvider } from "@/modules/common/ThemeManager";
import { Analytics } from "@vercel/analytics/react"

export default function Home() {
	return (
		<ThemeProvider>
			<Analytics />
			<Head>
				<title>Oba</title>
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="manifest" href="/home.webmanifest" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main>
				<CommonPageWrapper>
					<HomePage />
				</CommonPageWrapper>
			</main>
		</ThemeProvider>
	);
}
