import Head from "next/head";
import { ThemeProvider } from "@/modules/common/ThemeManager";
import { Analytics } from "@vercel/analytics/react"
import { DynamicResumePage } from "@/modules/resume/ResumePage";
import { RESUME } from "@/modules/resume/ResumePage.constants";

export default function Resume() {
    return (
        <ThemeProvider>
            <Analytics />
            <Head>
                <title>Resume - Oba</title>
                <meta name="description" content="Obatola Seward-Evans Resume" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="/home.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <DynamicResumePage resume={RESUME} />
            </main>
        </ThemeProvider>
    );
}
