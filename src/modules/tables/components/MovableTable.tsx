import {
    LegacyRef,
    MutableRefObject,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import styles from "./movableTable.module.css";

// https://letsbuildui.dev/articles/resizable-tables-with-react-and-css-grid

interface IProps {
    data: any;
}
interface IObject {
    id: string;
    [key: string]: string | number;
}

interface IProps {
    columnKeys: string[];
}

interface ISortObject {
    key: string;
    isInverted: boolean;
}

type IColumn<T> = { key: string; ref: LegacyRef<T> }[];

const createHeaders = (
    headers: string[]
): IColumn<HTMLTableHeaderCellElement | undefined> => {
    return headers.map((item) => ({
        key: item,
        ref: useRef(),
    }));
};

export const MovableTable = ({ data, columnKeys }: IProps) => {
    columnKeys = ["select", ...columnKeys];

    const [selectedID, setSelectedID] = useState<string>();
    const [sortObject, setSortObject] = useState<ISortObject>();

    const minCellWidth = 40;
    const [tableHeight, setTableHeight] = useState<number | string | undefined>(
        "auto"
    );
    const [activeIndex, setActiveIndex] = useState<number>();
    const tableElement = useRef<HTMLTableElement>();
    const columns = createHeaders(columnKeys);

    useEffect(() => {
        setTableHeight(tableElement?.current?.offsetHeight);
    }, []);

    const handleMouseDown = (index: number) => {
        setActiveIndex(index);
    };

    const handleMouseMove = useCallback(
        (e) => {
            // Return an array of px values
            const gridColumns = columns.map((col, i) => {
                if (i === activeIndex) {
                    // Calculate the column width
                    const width = e.clientX - col.ref.current.offsetLeft;

                    if (width >= minCellWidth) {
                        return `${width}px`;
                    }
                }
                return `${col.ref.current.offsetWidth}px`;
            });

            // Assign the px values to the table
            tableElement.current.style.gridTemplateColumns = `${gridColumns.join(
                " "
            )}`;
        },
        [activeIndex, columns, minCellWidth]
    );

    const removeListeners = useCallback(() => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", removeListeners);
    }, [handleMouseMove]);

    const handleMouseUp = useCallback(() => {
        setActiveIndex(undefined);
        removeListeners();
    }, [setActiveIndex, removeListeners]);

    useEffect(() => {
        if (activeIndex !== null) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            removeListeners();
        };
    }, [activeIndex, handleMouseMove, handleMouseUp, removeListeners]);

    const handleSelectCheckbox = (entityId: string) => () => {
        setSelectedID((previouslySelcted) =>
            previouslySelcted === entityId ? undefined : entityId
        );
    };

    const handleSortField = (key: string) => () => {
        setSortObject((previousSortObject) => ({
            key,
            isInverted:
                previousSortObject?.key === key && !sortObject?.isInverted,
        }));
    };

    const sortAlgorithm =
        (sortOBJ: ISortObject | undefined) => (a: IObject, b: IObject) => {
            if (sortOBJ) {
                const { isInverted, key } = sortOBJ;
                const inversion = isInverted ? -1 : 1;
                if (a[key] > b[key]) return 1 * inversion;
                if (a[key] < b[key]) return -1 * inversion;
            }

            return 0;
        };

    const sortedData = data.sort(sortAlgorithm(sortObject));

    console.log({ tableHeight });

    return (
        <div className={styles.wrapper}>
            <h2>Movable Table</h2>
            <div className={styles.container}>
                <table className={styles.table} ref={tableElement}>
                    <thead>
                        <tr>
                            {columns.map(({ ref, key }, i) => {
                                let sortIcon = "";

                                if (sortObject && sortObject.key === key) {
                                    if (sortObject.isInverted) {
                                        sortIcon = "v";
                                    } else {
                                        sortIcon = "^";
                                    }
                                }

                                return (
                                    <th ref={ref} key={key}>
                                        <span onClick={handleSortField(key)}>
                                            {key} {sortIcon}
                                        </span>
                                        <div
                                            style={{ height: tableHeight }}
                                            onMouseDown={() =>
                                                handleMouseDown(i)
                                            }
                                            className={`resize-handle ${
                                                activeIndex === i
                                                    ? "active"
                                                    : "idle"
                                            }`}
                                        />
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((entity: IObject) => {
                            const isSelected = selectedID === entity.id;
                            const className = isSelected && "selected-row";

                            return (
                                <tr key={`${entity.id}`} {...{ className }}>
                                    {columnKeys.map((key) => {
                                        if (key === "select") {
                                            return (
                                                <td key={`${entity.id}-${key}`}>
                                                    <input
                                                        type="checkbox"
                                                        title={`select ${entity.id}`}
                                                        key={`${entity.id}-${isSelected}`}
                                                        onChange={handleSelectCheckbox(
                                                            entity.id
                                                        )}
                                                        checked={isSelected}
                                                    />
                                                </td>
                                            );
                                        }
                                        return (
                                            <td key={`${entity.id}-${key}`}>
                                                <span>{entity[key]}</span>
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
