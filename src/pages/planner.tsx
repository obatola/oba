import { DayView } from "@/modules/planner/components/DayView";
import { PlannerContextProvider } from "@/modules/planner/hooks/usePlannerContext";

export default function Planner() {
    return (
        <PlannerContextProvider>
            <DayView />
        </PlannerContextProvider>
    );
}
