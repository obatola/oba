import React from "react";
import { Tabs } from "@mantine/core";
import { FinancialTable } from "./hypha_table/FinancialTable";
import { SpreadingTable } from "./hypha_table/SpreadingTable";
import { DataTable } from "./hypha_table/DatatTable";

const TABS: Record<string, { key: string, label: string, content: React.ReactNode }> = {
    spreadingTable: {
        key: 'spreading-table',
        label: 'Spreading Table',
        content: (<SpreadingTable />)
    },
    financialTable: {
        key: 'financial-table',
        label: 'Financial Table',
        content: (<FinancialTable />)
    },
    dataTable: {
        key: 'data-table',
        label: 'Data Table',
        content: (<DataTable />)
    },
}

const DEFAULT_TAB = TABS.financialTable.key

export const Example = () => {
    return (
        <Tabs defaultValue={DEFAULT_TAB} keepMounted={false}>
            <Tabs.List>
                {Object.keys(TABS).map((key, index, array) => (
                    <Tabs.Tab value={TABS[key].key}>{TABS[key].label}</Tabs.Tab>
                ))}
            </Tabs.List>
            {
                Object.keys(TABS).map((key) => (
                    <Tabs.Panel value={TABS[key].key}>{TABS[key].content}</Tabs.Panel>
                ))
            }
        </Tabs>
    );
};
