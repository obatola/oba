// potential schema

/** 

## Questions
- how will i handle the grouped header
- how will I handle grouped rows?
- how will I handle frozen columns?

 */

/* * * * SPREADING TABLE * * * * * * * * * * * * * * * * * * * * * * * * */

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
]

const spreadingTableProps = {
    title: "Spreading Income Statements w/ Census",
    columns: [
        {
            "id": "type",
            "label": null,
            "type": "string",
            "path": "status",
            extraction: (data: any) => data?.status === "mapped",
            cell: ({ cellData }: { cellData: boolean }) => (
                <div>
                    <div>{cellData ? "🎲" : "☑️"}</div>
                </div>
            ),
        },
        {
            "id": "indicator",
            "label": null,
            "type": "boolean",
            "path": "status",
            extraction: (data: any) => data?.status === "mapped",
            cell: ({ cellData }: { cellData: boolean }) => (
                <div>
                    <div>{cellData ? "🔵" : ""}</div>
                </div>
            ),
        },
        {
            "id": "path",
            "label": null,
            "type": "string",
            "path": "mapping",
            extraction: ({ data }: { data: any }) => {
                const isMapped = row.data.status === "mapped";
                if (isMapped) {
                    const mappingArray = [];
                    mappingArray.push(row.data.mapping.category);
                    mappingArray.push(row.data.mapping.subcategory);
                    return mappingArray.join(" / ");
                }
                return "unmapped"
            },
        },
        {
            "id": "source-line-item",
            "label": "Source Line Item",
            "type": "string",
            "path": "sourceLineItem.description",
        },
        {
            "id": "april",
            "label": "April",
            "type": "number",
            "path": "values.april",
        }
    ],
    data: spreadingTableData,
}

console.log(spreadingTableProps, spreadingTableData)

/* * * * FINANCIAL TABLE * * * * * * * * * * * * * * * * * * * * * * * * */

const financialTableData = {
    "sections": [
        {
            "id": "overview",
            "title": "Overview",
            "expanded": true,
            "rows": [
                {
                    "id": "period",
                    "label": "Period",
                    "type": "text",
                    "values": {
                        "april_2024": "Apr 1, 2024 - Ap...",
                        "may_2024": "May 1, 2024 - M...",
                        "june_2024": "Jun 1, 2024 - Ju...",
                        "july_2024": "Jul 1, 2024 - Jul ...",
                        "august_2024": "Aug 1, 2024 - Au...",
                        "september_2024": "Sep 1, 2024 - Se...",
                        "october_2024": "Oct 1, 2024 - Oct..."
                    }
                }
            ]
        },
        {
            "id": "residents",
            "title": "Residents",
            "expanded": true,
            "rows": [
                {
                    "id": "private_days",
                    "label": "Private Days",
                    "type": "number",
                    "values": {
                        "april_2024": 19,
                        "may_2024": 154,
                        "june_2024": -122,
                        "july_2024": 42,
                        "august_2024": 303,
                        "september_2024": 30,
                        "october_2024": null
                    }
                },
                {
                    "id": "medicare_part_a_days",
                    "label": "Medicare Part A Days",
                    "type": "number",
                    "values": {
                        "april_2024": 375,
                        "may_2024": 263,
                        "june_2024": 293,
                        "july_2024": 313,
                        "august_2024": 343,
                        "september_2024": 452,
                        "october_2024": 43
                    }
                },
                {
                    "id": "medicaid_days",
                    "label": "Medicaid Days",
                    "type": "number",
                    "values": {
                        "april_2024": 1075,
                        "may_2024": 1100,
                        "june_2024": 1393,
                        "july_2024": 1324,
                        "august_2024": 1044,
                        "september_2024": 1146,
                        "october_2024": 1100
                    }
                },
                {
                    "id": "managed_care_days",
                    "label": "Managed Care/Insurance Days",
                    "type": "number",
                    "values": {
                        "april_2024": 96,
                        "may_2024": 129,
                        "june_2024": 52,
                        "july_2024": 42,
                        "august_2024": 63,
                        "september_2024": 57,
                        "october_2024": 50
                    }
                },
                {
                    "id": "hospice_days",
                    "label": "Hospice Days",
                    "type": "number",
                    "values": {
                        "april_2024": 30,
                        "may_2024": 48,
                        "june_2024": 30,
                        "july_2024": 5,
                        "august_2024": 48,
                        "september_2024": 56,
                        "october_2024": 60
                    }
                },
                {
                    "id": "veterans_admin_days",
                    "label": "Veterans Administration Days",
                    "type": "number",
                    "values": {
                        "april_2024": null,
                        "may_2024": null,
                        "june_2024": null,
                        "july_2024": null,
                        "august_2024": null,
                        "september_2024": null,
                        "october_2024": null
                    }
                },
                {
                    "id": "occupancy",
                    "label": "Occupancy",
                    "type": "percentage",
                    "icon": "calculator",
                    "values": {
                        "april_2024": 88.61,
                        "may_2024": 91.08,
                        "june_2024": 91.44,
                        "july_2024": 92.8,
                        "august_2024": 96.83,
                        "september_2024": 96.72,
                        "october_2024": 94.68
                    }
                },
                {
                    "id": "total_residents",
                    "label": "Total Residents",
                    "type": "number",
                    "icon": "sum",
                    "isTotal": true,
                    "values": {
                        "april_2024": 1595,
                        "may_2024": 1694,
                        "june_2024": 1646,
                        "july_2024": 1726,
                        "august_2024": 1801,
                        "september_2024": 1741,
                        "october_2024": 1700
                    }
                }
            ]
        },
        {
            "id": "income_statement",
            "title": "Income Statement",
            "expanded": true,
            "sections": [
                {
                    "id": "revenue",
                    "title": "Revenue",
                    "expanded": true,
                    "sections": [
                        {
                            "id": "payor_revenue",
                            "title": "Payor Revenue",
                            "expanded": true,
                            "rows": [
                                {
                                    "id": "private_revenue",
                                    "label": "Private",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": 5567.0,
                                        "may_2024": 45122.0,
                                        "june_2024": -35746.0,
                                        "july_2024": 12405.0,
                                        "august_2024": 88779.0,
                                        "september_2024": 8790.0,
                                        "october_2024": 9083.0
                                    }
                                },
                                {
                                    "id": "medicare_part_a_revenue",
                                    "label": "Medicare Part A",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": 171409.0,
                                        "may_2024": 101304.0,
                                        "june_2024": 127057.0,
                                        "july_2024": 132763.0,
                                        "august_2024": 147899.0,
                                        "september_2024": 219077.0,
                                        "october_2024": 215682.0
                                    }
                                },
                                {
                                    "id": "medicaid_revenue",
                                    "label": "Medicaid",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": 298958.0,
                                        "may_2024": 306759.0,
                                        "june_2024": 386359.0,
                                        "july_2024": 364597.0,
                                        "august_2024": 287876.0,
                                        "september_2024": 315470.0,
                                        "october_2024": 324093.0
                                    }
                                },
                                {
                                    "id": "medicaid_supplemental_revenue",
                                    "label": "Medicaid Supplemental",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": null,
                                        "may_2024": null,
                                        "june_2024": null,
                                        "july_2024": null,
                                        "august_2024": null,
                                        "september_2024": null,
                                        "october_2024": null
                                    }
                                },
                                {
                                    "id": "managed_care_revenue",
                                    "label": "Managed Care/Insurance",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": 32524.0,
                                        "may_2024": 75547.0,
                                        "june_2024": 2953.0,
                                        "july_2024": 22562.0,
                                        "august_2024": 27729.0,
                                        "september_2024": 29707.0,
                                        "october_2024": 31912.0
                                    }
                                },
                                {
                                    "id": "hospice_revenue",
                                    "label": "Hospice",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": 8343.0,
                                        "may_2024": 13349.0,
                                        "june_2024": 8343.0,
                                        "july_2024": 2259.0,
                                        "august_2024": 13213.0,
                                        "september_2024": 15404.0,
                                        "october_2024": 9970.0
                                    }
                                },
                                {
                                    "id": "veterans_admin_revenue",
                                    "label": "Veterans Administration",
                                    "type": "currency",
                                    "values": {
                                        "april_2024": null,
                                        "may_2024": null,
                                        "june_2024": null,
                                        "july_2024": null,
                                        "august_2024": null,
                                        "september_2024": null,
                                        "october_2024": null
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}

const financialTableProps = {
    title: "Income Statements",
    headers: [
        {
            key: "title",
            "label": null,
        },
        {
            key: "april2024",
            "label": "April 2024",
        }
    ],
    sectionOrder: [
        "overview",
        "residents",
        "occupancy",
    ],
    sections: {
        overview: {
            label: "Overview",
            type: "section",
            expanded: true,
            columns: [
                {
                    "columnKey": "title",
                    "type": "text",
                    cell: () => <>Period</>
                },
                {
                    "columnKey": "april2024",
                    "type": "number",
                    "path": "values.april_2024",
                },
                {
                    "columnKey": "may2024",
                    "type": "number",
                    "path": "values.may_2024",
                },
                {
                    "columnKey": "june2024",
                    "type": "number",
                    "path": "values.june_2024",
                },
            ],
        },
        residents: {
            label: "Residents",
            type: "section",
            expanded: true,
            columns: [
                {
                    "columnKey": "title",
                    "type": "text",
                    cell: () => <>Residents</>
                },
                {
                    "columnKey": "april2024",
                    "type": "number",
                    "path": "values.april_2024",
                },
                {
                    "columnKey": "may2024",
                    "type": "number",
                    "path": "values.may_2024",
                },
                {
                    "columnKey": "june2024",
                    "type": "number",
                    "path": "values.june_2024",
                },
            ],
        },
        occupancy: {
            type: "row",
            columns: [
                {
                    "columnKey": "title",
                    "type": "text",
                    cell: () => <>Occupancy</>
                },
                {
                    "columnKey": "april2024",
                    "type": "number",
                    "path": "values.april_2024",
                },
                {
                    "columnKey": "may2024",
                    "type": "number",
                    "path": "values.may_2024",
                },
                {
                    "columnKey": "june2024",
                    "type": "number",
                    "path": "values.june_2024",
                },
            ],
        },
    },
    sectionData: {
        overview: financialTableData.sections[0].rows,
        residents: financialTableData.sections[1].rows,
        occupancy: [
            {
                "id": "occupancy",
                "label": "Occupancy",
                "type": "percentage",
                "icon": "calculator",
                "values": {
                    "april_2024": 88.61,
                    "may_2024": 91.08,
                    "june_2024": 91.44,
                    "july_2024": 92.8,
                    "august_2024": 96.83,
                    "september_2024": 96.72,
                    "october_2024": 94.68
                }
            }
        ],
    },
}

type Column = { columnKey: string, type: "text" | "number" | "node", path: string, extraction?: (data: any) => any, cell?: (data: any) => React.ReactNode };

type SectionOrderEntry = { id: string; depth: number };

export type HyphaTableProps = {
    title: string;
    headers: { key: string, label: string | null }[];
    sectionOrder: SectionOrderEntry[];
    sections: Record<string, {
        label: string;
        type: "section" | "row";
        expanded: boolean;
        columns: Column[];
    }>;
    sectionData: Record<string, any[]>;
}


console.log(financialTableData)