import { useState } from "react";
import styles from "./basicTable1.module.css";

interface IObject {
    id: number;
    [key: string]: string | number;
}

interface IProps {
    data: IObject[];
    columnKeys: string[];
}

interface SortPackage {
    columnKey?: string;
    sortType: "ascending" | "descending";
}

const sortAlgorithm =
    (sortPackage: SortPackage) => (a: IObject, b: IObject) => {
        const inversion = sortPackage.sortType === "ascending" ? 1 : -1;

        if (sortPackage.columnKey) {
            if (a[sortPackage.columnKey] > b[sortPackage.columnKey])
                return 1 * inversion;
            if (a[sortPackage.columnKey] < b[sortPackage.columnKey])
                return -1 * inversion;
        }
        return 0;
    };

export const BasicTable1 = ({ data, columnKeys }: IProps) => {
    const [selected, setSelected] = useState<number>();
    const [sortedColumn, setSortedColumn] = useState<SortPackage>({
        columnKey: undefined,
        sortType: "ascending",
    });

    const sortedData =
        sortedColumn.columnKey === undefined
            ? data
            : data.sort(sortAlgorithm(sortedColumn));

    const handleSelect =
        (id: number) => (event: React.FormEvent<HTMLInputElement>) => {
            event.preventDefault();
            setSelected((previousId) => {
                if (id === previousId) {
                    return undefined;
                } else {
                    return id;
                }
            });
        };

    const handleClickHeaderColumn = (columnKey: string) => () => {
        setSortedColumn((previousSortedColumn) => {
            if (previousSortedColumn.columnKey === columnKey) {
                // toggle sort type
                return {
                    columnKey,
                    sortType:
                        previousSortedColumn.sortType === "ascending"
                            ? "descending"
                            : "ascending",
                };
            }
            return { columnKey, sortType: "ascending" };
        });
    };

    const getSortIcon = (columnKey: string) => {
        if (columnKey === sortedColumn.columnKey) {
            return sortedColumn.sortType === "ascending" ? "▲" : "▼";
        }
        return "";
    };

    return (
        <div className={styles.container}>
            <h2>Basic Sortable Table</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th></th>
                        {columnKeys.map((val) => (
                            <th
                                key={val}
                                onClick={handleClickHeaderColumn(val)}
                            >
                                {val} {getSortIcon(val)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((entity) => {
                        const isSelected = entity.id === selected;
                        return (
                            <tr
                                key={entity.id}
                                className={isSelected ? "selected-row" : ""}
                            >
                                <td>
                                    <input
                                        onChange={handleSelect(entity.id)}
                                        type="checkbox"
                                        key={`${entity.id}-${isSelected}`}
                                        name={`${entity.id}-select`}
                                        title={`${entity.id}-select`}
                                        checked={isSelected}
                                    />
                                </td>
                                {columnKeys.map((key) => (
                                    <td key={`${entity.id}-${key}`}>
                                        {entity[key]}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};
