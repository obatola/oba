import { HyphaTable, HyphaTableProps, Section } from "./HyphaTable"

type RowWithValues = { values?: Record<string, unknown>; label?: string }

const periodColumns: Section["columns"] = [
    { columnKey: "title", type: "text", cell: () => <div>Period</div> },
    { columnKey: "april2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.april_2024)}</div> },
    { columnKey: "may2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.may_2024)}</div> },
    { columnKey: "june2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.june_2024)}</div> },
]

const residentColumns: Section["columns"] = [
    { columnKey: "title", type: "text", cell: ({ row }) => <div>{(row as RowWithValues)?.label}</div> },
    { columnKey: "april2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.april_2024)}</div> },
    { columnKey: "may2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.may_2024)}</div> },
    { columnKey: "june2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.june_2024)}</div> },
]

const payorRevenueColumns: Section["columns"] = [
    { columnKey: "title", type: "text", cell: ({ row }) => <div>{(row as RowWithValues)?.label}</div> },
    { columnKey: "april2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.april_2024)}</div> },
    { columnKey: "may2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.may_2024)}</div> },
    { columnKey: "june2024", type: "number", cell: ({ row }) => <div>{String((row as RowWithValues)?.values?.june_2024)}</div> },
]

const tableProps: HyphaTableProps = {
    title: "Financial Table",
    headers: [
        { key: "title", label: null },
        { key: "april2024", label: "Actual April 2024" },
        { key: "may2024", label: "Actual May 2024" },
    ],
    sections: [
        {
            id: "period",
            label: "Overview",
            type: "section",
            expanded: true,
            columns: periodColumns,
        },
        {
            id: "residents",
            label: "Residents",
            type: "section",
            expanded: true,
            columns: residentColumns,
        },
        {
            id: "incomeStatement",
            label: "Income Statements",
            type: "section",
            expanded: true,
            sections: [
                {
                    id: "revenue",
                    label: "Revenue",
                    type: "section",
                    expanded: true,
                    sections: [
                        {
                            id: "payorRevenue",
                            label: "Payor Revenue",
                            type: "section",
                            expanded: true,
                            columns: payorRevenueColumns,
                        },
                    ],
                },
            ],
        },
    ],
    sectionData: {
        period: [
            {
                id: "period",
                label: "Period",
                type: "text",
                values: {
                    april_2024: "Apr 1, 2024 - Ap...",
                    may_2024: "May 1, 2024 - M...",
                    june_2024: "Jun 1, 2024 - Ju...",
                    july_2024: "Jul 1, 2024 - Jul ...",
                    august_2024: "Aug 1, 2024 - Au...",
                    september_2024: "Sep 1, 2024 - Se...",
                    october_2024: "Oct 1, 2024 - Oct...",
                },
            },
        ],
        residents: [
            { id: "private_days", label: "Private Days", type: "number", values: { april_2024: 19, may_2024: 154, june_2024: -122, july_2024: 42, august_2024: 303, september_2024: 30, october_2024: null } },
            { id: "medicare_part_a_days", label: "Medicare Part A Days", type: "number", values: { april_2024: 375, may_2024: 263, june_2024: 293, july_2024: 313, august_2024: 343, september_2024: 452, october_2024: 43 } },
            { id: "medicaid_days", label: "Medicaid Days", type: "number", values: { april_2024: 1075, may_2024: 1100, june_2024: 1393, july_2024: 1324, august_2024: 1044, september_2024: 1146, october_2024: 1100 } },
            { id: "managed_care_days", label: "Managed Care/Insurance Days", type: "number", values: { april_2024: 96, may_2024: 129, june_2024: 52, july_2024: 42, august_2024: 63, september_2024: 57, october_2024: 50 } },
            { id: "hospice_days", label: "Hospice Days", type: "number", values: { april_2024: 30, may_2024: 48, june_2024: 30, july_2024: 5, august_2024: 48, september_2024: 56, october_2024: 60 } },
            { id: "veterans_admin_days", label: "Veterans Administration Days", type: "number", values: { april_2024: null, may_2024: null, june_2024: null, july_2024: null, august_2024: null, september_2024: null, october_2024: null } },
            { id: "occupancy", label: "Occupancy", type: "percentage", icon: "calculator", values: { april_2024: 88.61, may_2024: 91.08, june_2024: 91.44, july_2024: 92.8, august_2024: 96.83, september_2024: 96.72, october_2024: 94.68 } },
            { id: "total_residents", label: "Total Residents", type: "number", icon: "sum", isTotal: true, values: { april_2024: 1595, may_2024: 1694, june_2024: 1646, july_2024: 1726, august_2024: 1801, september_2024: 1741, october_2024: 1700 } },
        ],
        payorRevenue: [
            { id: "private_revenue", label: "Private", type: "currency", values: { april_2024: 5567.0, may_2024: 45122.0, june_2024: -35746.0, july_2024: 12405.0, august_2024: 88779.0, september_2024: 8790.0, october_2024: 9083.0 } },
            { id: "medicare_part_a_revenue", label: "Medicare Part A", type: "currency", values: { april_2024: 171409.0, may_2024: 101304.0, june_2024: 127057.0, july_2024: 132763.0, august_2024: 147899.0, september_2024: 219077.0, october_2024: 215682.0 } },
            { id: "medicaid_revenue", label: "Medicaid", type: "currency", values: { april_2024: 298958.0, may_2024: 306759.0, june_2024: 386359.0, july_2024: 364597.0, august_2024: 287876.0, september_2024: 315470.0, october_2024: 324093.0 } },
            { id: "medicaid_supplemental_revenue", label: "Medicaid Supplemental", type: "currency", values: { april_2024: null, may_2024: null, june_2024: null, july_2024: null, august_2024: null, september_2024: null, october_2024: null } },
            { id: "managed_care_revenue", label: "Managed Care/Insurance", type: "currency", values: { april_2024: 32524.0, may_2024: 75547.0, june_2024: 2953.0, july_2024: 22562.0, august_2024: 27729.0, september_2024: 29707.0, october_2024: 31912.0 } },
            { id: "hospice_revenue", label: "Hospice", type: "currency", values: { april_2024: 8343.0, may_2024: 13349.0, june_2024: 8343.0, july_2024: 2259.0, august_2024: 13213.0, september_2024: 15404.0, october_2024: 9970.0 } },
            { id: "veterans_admin_revenue", label: "Veterans Administration", type: "currency", values: { april_2024: null, may_2024: null, june_2024: null, july_2024: null, august_2024: null, september_2024: null, october_2024: null } },
        ],
    },
}

export const FinancialTable = () => {
    return <HyphaTable {...tableProps} />
}
