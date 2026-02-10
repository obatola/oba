import { Button, Group, Menu, Text } from "@mantine/core";
import { HyphaTable, HyphaTableProps, Section } from "./HyphaTable"

type RowWithValues = { mapping?: Record<string, unknown>; sourceLineItem?: Record<string, unknown>; values?: Record<string, unknown> }

const spreadingTableData = [
    {
        "id": "row-1",
        "mapping": {
            "category": "Residents",
            "subcategory": "Private Days",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-PP1",
            "description": "Porters Chapel Opco, LLC-Private Pay"
        },
        "values": {
            "april": 66,
            "may": 62,
            "june": -70,
            "july": 144,
            "august": 89,
            "september": 40
        }
    },
    {
        "id": "row-2",
        "mapping": {
            "category": null,
            "subcategory": null,
            "status": "unmapped"
        },
        "sourceLineItem": {
            "code": null,
            "description": "Total PRIVATE DAYS",
            "isTotal": true
        },
        "values": {
            "april": 66,
            "may": 62,
            "june": -70,
            "july": 144,
            "august": 98,
            "september": 115
        }
    },
    {
        "id": "row-3",
        "mapping": {
            "category": "Residents",
            "subcategory": "Medicare Part A Days",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-MR2",
            "description": "Porters Chapel Opco, LLC-Medicare A"
        },
        "values": {
            "april": 195,
            "may": 233,
            "june": 133,
            "july": 69,
            "august": 98,
            "september": 115
        }
    },
    {
        "id": "row-4",
        "mapping": {
            "category": null,
            "subcategory": null,
            "status": "unmapped"
        },
        "sourceLineItem": {
            "code": null,
            "description": "Total MEDICARE DAYS",
            "isTotal": true
        },
        "values": {
            "april": 195,
            "may": 233,
            "june": 133,
            "july": 69,
            "august": 98,
            "september": 115
        }
    },
    {
        "id": "row-5",
        "mapping": {
            "category": "Residents",
            "subcategory": "Medicaid Days",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-CD1",
            "description": "Porters Chapel Opco, LLC-Medicaid"
        },
        "values": {
            "april": 1887,
            "may": 1871,
            "june": 2042,
            "july": 2008,
            "august": 2033,
            "september": 1882
        }
    },
    {
        "id": "row-6",
        "mapping": {
            "category": "Residents",
            "subcategory": "Hospice Days",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-CO1",
            "description": "Porters Chapel Opco, LLC-Hospice"
        },
        "values": {
            "april": 159,
            "may": 212,
            "june": 107,
            "july": 100,
            "august": 91,
            "september": 105
        }
    },
    {
        "id": "row-7",
        "mapping": {
            "category": "Residents",
            "subcategory": "Managed Care/Insurance Days",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-CO2",
            "description": "Porters Chapel Opco, LLC-HMO Medicare"
        },
        "values": {
            "april": 56,
            "may": 45,
            "june": 100,
            "july": 101,
            "august": 153,
            "september": 138
        }
    },
    {
        "id": "row-8",
        "mapping": {
            "category": "Residents",
            "subcategory": "Veterans Administration Days",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-VA1",
            "description": "Porters Chapel Opco, LLC-Veterans Admin"
        },
        "values": {
            "april": 88,
            "may": 81,
            "june": 118,
            "july": 110,
            "august": 63,
            "september": 63
        }
    },
    {
        "id": "row-9",
        "mapping": {
            "category": "Residents",
            "subcategory": "Total Residents",
            "status": "validated"
        },
        "sourceLineItem": {
            "code": null,
            "description": "Total Days 2",
            "isTotal": true
        },
        "values": {
            "april": 2451,
            "may": 2504,
            "june": 2430,
            "july": 2532,
            "august": 2527,
            "september": 2343
        },
        "validation": {
            "april": true,
            "may": true,
            "june": true,
            "july": true,
            "august": true,
            "september": true
        }
    },
    {
        "id": "row-10",
        "mapping": {
            "category": "Income Statement",
            "subcategory": "Revenue / Private",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-31201",
            "description": "Porters Chapel Opco, LLC-ROUTINE ROOM"
        },
        "values": {
            "april": 17970,
            "may": 16895,
            "june": -18750,
            "july": 36350,
            "august": 24185,
            "september": 11148
        }
    },
    {
        "id": "row-11",
        "mapping": {
            "category": "Income Statement",
            "subcategory": "Revenue / Medicare Part A",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-31202",
            "description": "Porters Chapel Opco, LLC-ROUTINE ROOM"
        },
        "values": {
            "april": 53065,
            "may": 63228,
            "june": 36105,
            "july": 18770,
            "august": 26785,
            "september": 31690
        }
    },
    {
        "id": "row-12",
        "mapping": {
            "category": "Income Statement",
            "subcategory": "Revenue / Medicaid",
            "status": "mapped"
        },
        "sourceLineItem": {
            "code": "106-31206",
            "description": "Porters Chapel Opco, LLC-ROUTINE ROOM"
        },
        "values": {
            "april": 498570,
            "may": 499955,
            "june": 543930,
            "july": 542045,
            "august": 532865,
            "september": 503751
        }
    }
];

const mainColumns: Section["columns"] = [
    {
        columnKey: "mapping", type: "text",
        cell: ({ row }) => {
            const isMapped = (row as RowWithValues)?.mapping?.status === "mapped";
            let mappingString = "Unmapped"
            if (isMapped) {
                mappingString = `${(row as RowWithValues)?.mapping?.category} / ${(row as RowWithValues)?.mapping?.subcategory}`;
            }

            return (
                <Group wrap="nowrap">
                    <div style={{ width: "10px" }}>{(row as RowWithValues)?.mapping?.status === "mapped" ? "🔵" : ""}</div>

                    <Menu disabled={!isMapped}>
                        <Menu.Target>
                            {isMapped ? <Button variant="subtle" size="xs">
                                {mappingString}
                            </Button>
                                : <Text color="gray">{mappingString}</Text>}
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item >
                                thing
                            </Menu.Item>
                            <Menu.Item>
                                that thing
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group >
            );
        }
    },
    {
        columnKey: "sourceLineItem",
        type: "text",
        cell: ({ row }) => {
            return (
                <div>{(row as RowWithValues)?.sourceLineItem?.description}</div>
            );
        }
    },
    {
        columnKey: "april",
        type: "number",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.values?.april}</div>;
        }
    },
    {
        columnKey: "may",
        type: "number",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.values?.may}</div>;
        }
    },
    {
        columnKey: "june",
        type: "number",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.values?.june}</div>;
        }
    },
    {
        columnKey: "july",
        type: "number",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.values?.july}</div>;
        }
    },
    {
        columnKey: "august",
        type: "number",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.values?.august}</div>;
        }
    },
    {
        columnKey: "september",
        type: "number",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.values?.september}</div>;
        }
    },
]

const tableProps: HyphaTableProps = {
    title: "Financial Table",
    headers: [
        { key: "mapping", label: "Mapping" },
        { key: "sourceLineItem", label: "Source Line Item" },
        { key: "april", label: "April" },
        { key: "may", label: "May" },
        { key: "june", label: "June" },
        { key: "july", label: "July" },
        { key: "august", label: "August" },
        { key: "september", label: "September" },
    ],
    sections: [
        {
            id: "main",
            label: "Overview",
            type: "section",
            expanded: true,
            columns: mainColumns,
        },
    ],
    sectionData: {
        main: spreadingTableData,
    },
}

export const SpreadingTable = () => {
    return <HyphaTable {...tableProps} />
}
