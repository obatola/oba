import { BasicTable1 } from "@/modules/tables/components/basicTable1";
import { BasicTable2 } from "@/modules/tables/components/BasicTable2";
import { MovableTable } from "@/modules/tables/components/MovableTable";
import { GridExamples } from "@/modules/tables/components/GridExamples";

export default function TableView() {
    const data = [
        {
            id: 123456,
            name: "Anom Anom Anom",
            age: 19,
            gender: "Male",
            age2: 19,
            gender2: "Male",
        },
        {
            id: 678902,
            name: "Megha Megha Megha",
            age: 19,
            gender: "Female",
            age2: 19,
            gender2: "Female",
        },
        {
            id: 124578,
            name: "Subham Subham Subham",
            age: 25,
            gender: "Male",
            age2: 25,
            gender2: "Male",
        },
        {
            id: 398123,
            name: "Paul Paul Paul",
            age: 25,
            gender: "Male",
            age2: 25,
            gender2: "Male",
        },
        {
            id: 423132,
            name: "Oba Oba Oba",
            age: 25,
            gender: "Male",
            age2: 25,
            gender2: "Male",
        },
        {
            id: 434567,
            name: "Melody Melody Melody",
            age: 25,
            gender: "Male",
            age2: 25,
            gender2: "Male",
        },
        {
            id: 983244,
            name: "Pizza Pizza Pizza",
            age: 25,
            gender: "Male",
            age2: 25,
            gender2: "Male",
        },
    ];
    const columnKeys = ["id", "name", "age", "gender", "age2", "gender2"];

    return (
        <div>
            tables on tables
            <GridExamples />
            <MovableTable data={data} columnKeys={columnKeys} />
            <BasicTable1 data={data} columnKeys={columnKeys} />
            <BasicTable2 data={data} columnKeys={columnKeys} />
        </div>
    );
}
