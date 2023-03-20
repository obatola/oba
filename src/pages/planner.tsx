import { DayView } from "@/modules/planner/components/DayView";
import { PlannerContextProvider } from "@/modules/planner/hooks/usePlannerContext";
import Head from "next/head";

export default function Planner() {
    return (
        <>
            <Head>
                <title>Playnlist</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="manifest" href="/planner.webmanifest" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PlannerContextProvider>
                    <DayView />
                </PlannerContextProvider>
            </main>
        </>
    );
}
