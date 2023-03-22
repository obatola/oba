import { BasicTable1 } from "@/modules/tables/components/basicTable1";

export default function TableView() {
    const data = [
        { id: 123456, name: "Anom", age: 19, gender: "Male" },
        { id: 678902, name: "Megha", age: 19, gender: "Female" },
        { id: 124578, name: "Subham", age: 25, gender: "Male" },
        { id: 398123, name: "Paul", age: 25, gender: "Male" },
        { id: 423132, name: "Oba", age: 25, gender: "Male" },
        { id: 434567, name: "Melody", age: 25, gender: "Male" },
        { id: 983244, name: "Pizza", age: 25, gender: "Male" },
    ];
    const columnKeys = ["id", "name", "age", "gender"];

    return (
        <div>
            tables on tables
            <BasicTable1 data={data} columnKeys={columnKeys} />
        </div>
    );
}
