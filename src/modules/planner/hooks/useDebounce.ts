import { useRef } from "react";
import debounce from "lodash.debounce";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FunctionType = (...args: any[]) => any;

interface IDebounceProps {
    action: FunctionType;
    throttleTimeMS: number;
}

interface IDebouncePackage {
    debouncedFunction: FunctionType;
}

export const useDebounce = ({
    action,
    throttleTimeMS,
}: IDebounceProps): IDebouncePackage => {
    const refToDebouncedAction = useRef(debounce(action, throttleTimeMS));

    return { debouncedFunction: refToDebouncedAction.current };
};
