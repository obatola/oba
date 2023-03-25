import { useState } from "react";
import styles from "./gridExamples.module.css";

// https://learncssgrid.com/

interface IProps {
    numItems?: number;
}
const GridItems = ({ numItems = 3 }: IProps) => {
    const [totalNumItems, setTotalNumItems] = useState(numItems);
    const gridItems = Array.apply(1, Array(totalNumItems)).map(
        (item, index) => index + 1
    );

    return (
        <>
            {gridItems.slice(0, totalNumItems).map((number) => (
                <div
                    onClick={() => setTotalNumItems((prev) => prev + 1)}
                    key={number}
                    className={styles.gridItem}
                    style={{ backgroundColor: "#e91e64" }}
                >
                    {number}
                </div>
            ))}
        </>
    );
};

export const GridExamples = () => {
    return (
        <div className={styles.wrapper}>
            <div>
                <h2>grid</h2>
                <div className={styles.example1}>
                    <GridItems />
                </div>
            </div>
            <div>
                <h2>inline-grid</h2>
                <div className={styles.example2}>
                    <GridItems />
                </div>
            </div>
            <div>
                <h2>grid-template-rows: 50px 100px;</h2>
                <div className={styles.example3}>
                    {" "}
                    <GridItems numItems={5} />
                </div>
            </div>
            <div>
                <h2> grid-template-columns: 90px 50px 120px;</h2>
                <div className={styles.example4}>
                    {" "}
                    <GridItems numItems={6} />
                </div>
            </div>
            <div>
                <h2>grid-template-columns: 1fr 1fr 2fr;</h2>
                <div className={styles.example5}>
                    <GridItems numItems={6} />
                </div>
            </div>
            <div>
                <h2>grid-template-columns: 3rem 25% 1fr 2fr;</h2>
                <div className={styles.example6}>
                    <GridItems numItems={6} />
                </div>
            </div>
            <div>
                <h2>
                    <div>grid-template-rows: minmax(100px, auto);</div>
                    <div>grid-template-columns: minmax(auto, 75%) 1fr 3em;</div>
                </h2>
                <div className={styles.example7}>
                    <GridItems numItems={6} />
                </div>
            </div>
            <div>
                <h2>
                    <div>grid-template-rows: minmax(100px, auto);</div>
                    <div>grid-template-columns: minmax(auto, 75%) 1fr 3em;</div>
                </h2>
                <div className={styles.example7}>
                    <div
                        className={styles.gridItem}
                        style={{ backgroundColor: "#e91e64" }}
                    >
                        1
                    </div>
                    <div
                        className={styles.gridItem}
                        style={{ backgroundColor: "#e91e64" }}
                    >
                        2
                    </div>
                    <div
                        className={styles.gridItem}
                        style={{ backgroundColor: "#e91e64" }}
                    >
                        3
                    </div>
                    <div
                        className={styles.gridItem}
                        style={{ backgroundColor: "#e91e64" }}
                    >
                        4. The minmax() function accepts 2 arguments: the first
                        is the minimum size of the track and the second the
                        maximum size. Alongside length values, the values can
                        also be auto, which allows the track to grow/stretch
                        based on the size of the content. In this example, the
                        first row track is set to have a minimum height of
                        100px, but its maximum size of auto will allow the row
                        track to grow it the content is taller than 100px. The
                        first column track has a minimum size of auto, but its
                        maximum size of 50% will prevent it from getting no
                        wider than 50% of the grid container width.
                    </div>
                    <div
                        className={styles.gridItem}
                        style={{ backgroundColor: "#e91e64" }}
                    >
                        5
                    </div>
                    <div
                        className={styles.gridItem}
                        style={{ backgroundColor: "#e91e64" }}
                    >
                        6
                    </div>
                </div>
            </div>
            <div>
                <h2>
                    <div>grid-template-rows: repeat(4, 100px);</div>
                    <div>grid-template-columns: repeat(3, 1fr);</div>
                </h2>
                <div className={styles.example8}>
                    <GridItems numItems={6} />
                </div>
            </div>
            <div>
                <h2>
                    <div>grid-template-rows: repeat(4, 100px);</div>
                    <div>grid-template-columns: repeat(3, 1fr);</div>
                </h2>
                <div className={styles.example8}>
                    <GridItems numItems={6} />
                </div>
            </div>
            <div>
                <h2>
                    <div>grid-template-columns: 30px repeat(3, 1fr) 30px;</div>
                </h2>
                <div className={styles.example9}>
                    <GridItems numItems={9} />
                </div>
            </div>
            <div>
                <h2>
                    <div>grid-template-columns: repeat(3, 1fr);</div>
                    <div>grid-row-gap: 20px;</div>
                    <div>grid-column-gap: 5rem;</div>
                </h2>
                <div className={styles.example10}>
                    <GridItems numItems={4} />
                </div>
            </div>
        </div>
    );
};
