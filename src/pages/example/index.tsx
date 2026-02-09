import Head from "next/head";
import { ThemeProvider } from "@/modules/common/ThemeManager";
import { Analytics } from "@vercel/analytics/react"
import { DynamicResumePage } from "@/modules/resume/ResumePage";
import { RESUME } from "@/resumeCopy";
import { Example } from "@/modules/example/Example";

export default function Resume() {
    return (
        <ThemeProvider>
            <Analytics />
            <Head>
                <title>Example - Oba</title>
                <meta name="description" content="Obatola Seward-Evans Resume" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="manifest" href="/home.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Example />
            </main>
        </ThemeProvider>
    );
}
