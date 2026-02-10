import { Badge, Button, Group, Menu, Text } from "@mantine/core";
import { HyphaTable, HyphaTableProps, Section } from "./HyphaTable"

type RowWithValues = {
    id: string;
    label: string;
    type: string;
    value: string;
    entityType: string;
    citationCount: number;
}

const dataTableData = {
    overview: [
        {
            "id": "name",
            "label": "Name",
            "type": "entity_reference",
            "value": "Ashland SNF",
            "entityType": "Property",
            "citationCount": 1
        },
        {
            "id": "stage",
            "label": "Stage",
            "type": "text",
            "value": "LOI",
            "source": "derived"
        },
        {
            "id": "portfolio",
            "label": "Portfolio",
            "type": "entity_reference",
            "value": "Vanguard",
            "entityType": "Portfolio",
            "citationCount": null
        }
    ],
    details: [
        {
            "id": "account_name",
            "label": "Account Name",
            "type": "entity_reference",
            "value": "Ashland Health & Rehab",
            "entityType": "Account",
            "citationCount": 1
        },
        {
            "id": "parent_account",
            "label": "Parent Account",
            "type": "entity_reference",
            "value": "Vanguard Healthcare Services",
            "entityType": "Organization",
            "citationCount": 1
        },
        {
            "id": "managing_company",
            "label": "Managing Company",
            "type": "entity_reference",
            "value": "Vanguard Healthcare Services",
            "entityType": "Organization",
            "citationCount": 1
        },
        {
            "id": "phone",
            "label": "Phone",
            "type": "phone",
            "value": "(662) 224-6196",
            "citationCount": 1
        },
        {
            "id": "website",
            "label": "Website",
            "type": "url",
            "value": "0",
            "citationCount": 1
        },
        {
            "id": "billing_address",
            "label": "Billing Address",
            "type": "address",
            "value": "16056 Boundary Drive, Ashland, MS 38603-7737, USA",
            "citationCount": 1,
            "hasLocationPin": true,
            "status": "needs_review"
        },
        {
            "id": "msa_name",
            "label": "MSA Name",
            "type": "text",
            "value": "No CBSA Name",
            "citationCount": 1,
            "hasWarning": true
        },
        {
            "id": "account_owner",
            "label": "Account Owner",
            "type": "entity_reference",
            "value": "Kathleen Wright",
            "entityType": "User",
            "citationCount": 1
        },
        {
            "id": "account_stage",
            "label": "Account Stage",
            "type": "entity_reference",
            "value": "Financials Received",
            "entityType": "Stage",
            "citationCount": 1
        },
        {
            "id": "total_points",
            "label": "Total Points",
            "type": "number",
            "value": 6,
            "citationCount": 1
        },
        {
            "id": "property_type",
            "label": "Property Type",
            "type": "entity_reference",
            "value": "Skilled Nursing Facility",
            "entityType": "PropertyType",
            "citationCount": 1
        },
        {
            "id": "last_pitch_date_child",
            "label": "Last Pitch Date Child",
            "type": "date",
            "value": "2025-02-07",
            "displayValue": "2/7/2025",
            "citationCount": 1
        }
    ],
    property_detail: [
        {
            "id": "coverage_verified",
            "label": "Coverage Verified",
            "type": "boolean",
            "value": true,
            "displayValue": "Yes",
            "citationCount": 1
        },
        {
            "id": "year_built",
            "label": "Year Built",
            "type": "number",
            "value": 1991,
            "citationCount": 1
        },
        {
            "id": "year_renovated",
            "label": "Year Renovated",
            "type": "text",
            "value": null,
            "source": "manual",
            "status": "needs_review"
        },
        {
            "id": "total_beds_units",
            "label": "Total Beds & Units",
            "type": "number",
            "value": 60,
            "citationCount": 1
        },
        {
            "id": "licensed_beds",
            "label": "Licensed Beds",
            "type": "number",
            "value": 60,
            "citationCount": 1
        },
        {
            "id": "certified_beds",
            "label": "Certified Beds",
            "type": "number",
            "value": 60,
            "citationCount": 1
        },
        {
            "id": "medicare_beds",
            "label": "Medicare Beds",
            "type": "number",
            "value": 60,
            "citationCount": 1
        },
        {
            "id": "medicaid_beds",
            "label": "Medicaid Beds",
            "type": "number",
            "value": 60,
            "citationCount": 1
        },
        {
            "id": "building_sqft",
            "label": "Building SQFT",
            "type": "number",
            "value": 25000,
            "citationCount": 1
        },
        {
            "id": "land_acres",
            "label": "Land Acres",
            "type": "number",
            "value": 2.5,
            "citationCount": 1
        },
        {
            "id": "star_rating",
            "label": "Star Rating",
            "type": "number",
            "value": 3,
            "citationCount": 1
        },
        {
            "id": "health_inspection_rating",
            "label": "Health Inspection Rating",
            "type": "number",
            "value": 2,
            "citationCount": 1
        },
        {
            "id": "staffing_rating",
            "label": "Staffing Rating",
            "type": "number",
            "value": 4,
            "citationCount": 1
        },
        {
            "id": "quality_rating",
            "label": "Quality Rating",
            "type": "number",
            "value": 3,
            "citationCount": 1
        }
    ]
}

const mainColumns: Section["columns"] = [
    {
        columnKey: "title", type: "text",
        cell: ({ row }) => {
            return <div>{(row as RowWithValues)?.label}</div>;
        }
    },
    {
        columnKey: "mapping", type: "text",
        cell: ({ row }) => {
            return (
                <Group wrap="nowrap" gap="4">
                    <Badge color="gray" variant="light" size="xs">{(row as RowWithValues)?.type}</Badge>
                    <div>{(row as RowWithValues)?.value}</div>
                    {(row as RowWithValues)?.citationCount > 0 && <Badge color="gray" variant="light" size="xs">{(row as RowWithValues)?.citationCount}</Badge>}
                </Group >
            );
        }
    },
]

const tableProps: HyphaTableProps = {
    title: "Financial Table",
    headers: [
        { key: "title", label: "" },
        { key: "content", label: "" },
    ],
    sections: [
        {
            id: "overview",
            label: "Overview",
            type: "section",
            expanded: true,
            columns: mainColumns,
        },
        {
            id: "details",
            label: "Details",
            type: "section",
            expanded: true,
            columns: mainColumns,
        },
        {
            id: "property_detail",
            label: "Property Detail",
            type: "section",
            expanded: true,
            columns: mainColumns,
        },
    ],
    sectionData: {
        overview: dataTableData.overview,
        details: dataTableData.details,
        property_detail: dataTableData.property_detail,
    },
}

export const DataTable = () => {
    return <HyphaTable {...tableProps} />
}
