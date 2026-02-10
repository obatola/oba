import { Button, Group, Stack, Text } from "@mantine/core";
import classes from "./HyphaTable.module.css";
import { useState } from "react";

type Column = {
    columnKey: string;
    type: "text" | "number" | "node";
    cell?: (row: { row: unknown }) => React.ReactNode;
};

export type Section = {
    id?: string;
    label: string;
    type: "section" | "row";
    expanded: boolean;
    columns?: Column[];
    sections?: Section[];
};

type Data = Record<string, unknown>;

export type HyphaTableProps = {
    title: string;
    headers: { key: string; label: string | null }[];
    sections: Section[];
    sectionData: Record<string, Data | Data[] | undefined>;
};

function collectInitialExpanded(sections: Section[]): Set<string> {
    const set = new Set<string>();
    function walk(secs: Section[]) {
        for (const s of secs) {
            if (s.id != null && s.expanded) set.add(s.id);
            if (s.sections?.length) walk(s.sections);
        }
    }
    walk(sections);
    return set;
}

function firstColumns(sections: Section[]): Column[] | undefined {
    for (const s of sections) {
        if (s.columns?.length) return s.columns;
        if (s.sections?.length) {
            const c = firstColumns(s.sections);
            if (c) return c;
        }
    }
    return undefined;
}

export function HyphaTable({ title, headers, sections, sectionData }: HyphaTableProps) {
    const columns = firstColumns(sections) ?? [];
    const columnCount = columns.length || headers.length;
    const gridColumns = columnCount
        ? `minmax(180px, 1.5fr) ${Array(columnCount - 1).fill("minmax(90px, 1fr)").join(" ")}`
        : "1fr";

    const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
        collectInitialExpanded(sections)
    );
    const toggle = (id: string) =>
        setExpandedIds((prev) => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    return (
        <Stack gap="sm">
            <Text fw={600} size="lg">
                {title}
            </Text>
            <div
                className={classes["hypha-table"]}
                style={{ gridTemplateColumns: gridColumns } as React.CSSProperties}
            >
                <div className={classes["hypha-table__header"]}>
                    {columns.map((col) => {
                        const header = headers.find((h) => h.key === col.columnKey);
                        return (
                            <div key={col.columnKey} className={classes["hypha-table__header-cell"]}>
                                {header?.label ?? ""}
                            </div>
                        );
                    })}
                </div>
                <div className={classes["hypha-table__body"]}>
                    {sections.map((section, index) => (
                        <SectionRow
                            key={section.id ?? index}
                            section={section}
                            data={section.id ? sectionData[section.id] : undefined}
                            sectionData={sectionData}
                            expandedIds={expandedIds}
                            onToggle={toggle}
                        />
                    ))}
                </div>
            </div>
        </Stack>
    );
}

type SectionRowProps = {
    section: Section;
    data: Data | Data[] | undefined;
    sectionData: Record<string, Data | Data[] | undefined>;
    expandedIds: Set<string>;
    onToggle: (id: string) => void;
    depth?: number;
};

export function SectionRow({
    section,
    data,
    sectionData,
    expandedIds,
    onToggle,
    depth = 0,
}: SectionRowProps) {
    if (!section) return null;

    const hasNested = section.sections && section.sections.length > 0;
    const isExpanded =
        section.id == null ? true : expandedIds.has(section.id) ?? section.expanded;

    if (section.type === "row") {
        const rowData = Array.isArray(data) ? data[0] : data;
        return (
            <DataRow
                data={rowData ?? {}}
                columns={section.columns ?? []}
            />
        );
    }

    if (hasNested) {
        return (
            <>
                <div className={classes["hypha-table-section__header-row"]}>
                    <Button
                        variant="subtle"
                        size="xs"
                        onClick={() => section.id && onToggle(section.id)}
                        style={{ paddingLeft: depth * 40 }}
                    >
                        <Group gap="2"><span>{isExpanded ? 'V' : '>'}</span><span>{section.label}</span></Group>
                    </Button>
                </div>
                {isExpanded &&
                    (section.sections ?? []).map((child, index) => (
                        <SectionRow
                            depth={depth + 1}
                            key={child.id ?? index}
                            section={child}
                            data={child.id ? sectionData[child.id] : undefined}
                            sectionData={sectionData}
                            expandedIds={expandedIds}
                            onToggle={onToggle}
                        />
                    ))}
            </>
        );
    }

    return (
        <>
            <div className={classes["hypha-table-section__header-row"]}>
                <Button
                    variant="subtle"
                    size="xs"
                    onClick={() => section.id && onToggle(section.id)}
                    style={{ paddingLeft: depth * 40 }}
                >
                    {section.label}
                </Button>
            </div>
            {isExpanded &&
                section.columns &&
                (Array.isArray(data) ? data : [data])
                    .filter((row): row is Data => row != null)
                    .map((row, index) => (
                        <DataRow key={row?.id != null ? String(row.id) : index} data={row} columns={section.columns ?? []} />
                    ))}
        </>
    );
}

export function DataRow({
    data,
    columns,
}: {
    data: Data;
    columns: Column[];
}) {
    return (
        <div className={classes["hypha-table__row"]}>
            {columns.map((column, index) => (
                <div
                    key={column.columnKey}
                    className={
                        index === 0
                            ? `${classes["hypha-table__cell"]} ${classes["hypha-table__cell--label"]}`
                            : `${classes["hypha-table__cell"]} ${classes["hypha-table__cell--data"]}`
                    }
                >
                    {column.cell ? column.cell({ row: data }) : <span>–</span>}
                </div>
            ))}
        </div>
    );
}
