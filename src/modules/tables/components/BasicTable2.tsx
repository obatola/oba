import { useState } from "react";
import styles from "./basicTable2.module.css";

interface IProps {
    data: any;
}
interface IObject {
    id: number;
    [key: string]: string | number;
}

interface IProps {
    columnKeys: string[];
}

interface ISortObject {
    key: string;
    isInverted: boolean;
}

export const BasicTable2 = ({ data, columnKeys }: IProps) => {
    const [selectedID, setSelectedID] = useState<string>();
    const [sortObject, setSortObject] = useState<ISortObject>();

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

    return (
        <div className={styles.wrapper}>
            <h2>Basic Sortable Table 2</h2>
            <div className={styles.container}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th />
                            {columnKeys.map((key) => {
                                let sortIcon = "";

                                if (sortObject && sortObject.key === key) {
                                    if (sortObject.isInverted) {
                                        sortIcon = "v";
                                    } else {
                                        sortIcon = "^";
                                    }
                                }

                                return (
                                    <th key={key}>
                                        <span onClick={handleSortField(key)}>
                                            {key} {sortIcon}
                                        </span>
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
                                    <td>
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
                                    {columnKeys.map((key) => (
                                        <td>{entity[key]}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
