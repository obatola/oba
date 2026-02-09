import React from "react";
import { Tabs } from "@mantine/core";
import { SumTable } from "./sum_table/SumTable";
import { FileExtractor } from "./file_extractor/FileExtractor";

const TABS: Record<string, { key: string, label: string, content: React.ReactNode }> = {
    fileExtractor: {
        key: 'file-extractor',
        label: 'File Extractor',
        content: (<FileExtractor />)
    },
    sumTable: {
        key: 'sum-table',
        label: 'Sum Table',
        content: (<SumTable />)
    },
}

const DEFAULT_TAB = TABS.fileExtractor.key

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
