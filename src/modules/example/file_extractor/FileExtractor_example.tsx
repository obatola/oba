import { useState } from "react";
import { Button, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { fileExtractorApi } from "./fileExtractorApi";

export function FileExtractor() {
  const [opened, { open, close }] = useDisclosure(false);
  const [status, setStatus] = useState<string>("");
  const [lastId, setLastId] = useState<string>("");

  const run = async (
    label: string,
    fn: () => Promise<unknown>
  ) => {
    setStatus(`… ${label}`);
    try {
      const result = await fn();
      const preview = JSON.stringify(result);
      setStatus(`OK: ${label} → ${preview.slice(0, 120)}${preview.length > 120 ? "…" : ""}`);
      return result;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setStatus(`Error: ${label} — ${msg}`);
    }
  };

  const onList = () =>
    run("List", async () => {
      const { files } = await fileExtractorApi.list();
      if (files[0]) setLastId(files[0].id);
      return { count: files.length, firstId: files[0]?.id };
    });

  const onUpload = () =>
    run("Upload", async () => {
      const { file } = await fileExtractorApi.upload({
        fileName: "test-upload.pdf",
        schemaType: "invoice",
      });
      setLastId(file.id);
      return file;
    });

  const onGet = () =>
    run("Get", async () => {
      const id = lastId || (await fileExtractorApi.list()).files[0]?.id;
      if (!id) throw new Error("No id — run List or Upload first");
      const { file } = await fileExtractorApi.get(id);
      return file;
    });

  const onUpdate = () =>
    run("Update", async () => {
      const id = lastId || (await fileExtractorApi.list()).files[0]?.id;
      if (!id) throw new Error("No id — run List or Upload first");
      const { file } = await fileExtractorApi.update(id, {
        structuredData: { updated: true, at: new Date().toISOString() },
        actor: "Test User",
      });
      return file;
    });

  const onDelete = () =>
    run("Delete", async () => {
      const id = lastId || (await fileExtractorApi.list()).files[0]?.id;
      if (!id) throw new Error("No id — run List or Upload first");
      await fileExtractorApi.delete(id);
      setLastId("");
      return { deleted: id };
    });

  return (
    <Stack>
      <Text size="sm" c="dimmed">
        API test — lastId: {lastId || "(none)"}
      </Text>
      <Stack gap="xs">
        <Button variant="light" onClick={onList}>
          List
        </Button>
        <Button variant="light" onClick={onUpload}>
          Upload
        </Button>
        <Button variant="light" onClick={onGet}>
          Get
        </Button>
        <Button variant="light" onClick={onUpdate}>
          Update
        </Button>
        <Button variant="light" color="red" onClick={onDelete}>
          Delete
        </Button>
      </Stack>
      {status && (
        <Text size="sm" style={{ wordBreak: "break-all" }}>
          {status}
        </Text>
      )}
      <DemoA />
      <DemoB />
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>

      <iframe
        src="/files/15-Life-Hacks.pdf"
        title="15 Life Hacks (PDF)"
        style={{ width: "100%", minHeight: 480, border: "1px solid var(--mantine-color-default-border)" }}
      />
    </Stack>
  );
}

import { Table, TableData } from '@mantine/core';

const elements = [
  { position: 6, mass: 12.011, symbol: 'C', name: 'Carbon' },
  { position: 7, mass: 14.007, symbol: 'N', name: 'Nitrogen' },
  { position: 39, mass: 88.906, symbol: 'Y', name: 'Yttrium' },
  { position: 56, mass: 137.33, symbol: 'Ba', name: 'Barium' },
  { position: 58, mass: 140.12, symbol: 'Ce', name: 'Cerium' },
];

function DemoA() {
  const rows = elements.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.position}</Table.Td>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{element.symbol}</Table.Td>
      <Table.Td>{element.mass}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Element position</Table.Th>
          <Table.Th>Element name</Table.Th>
          <Table.Th>Symbol</Table.Th>
          <Table.Th>Atomic mass</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}

const tableData: TableData = {
  caption: 'Some elements from periodic table',
  head: ['Element position', 'Atomic mass', 'Symbol', 'Element name'],
  body: [
    [6, 12.011, 'C', 'Carbon'],
    [7, 14.007, 'N', 'Nitrogen'],
    [39, 88.906, 'Y', 'Yttrium'],
    [56, 137.33, 'Ba', 'Barium'],
    [58, 140.12, 'Ce', 'Cerium'],
  ],
};

function DemoB() {
  return <Table data={tableData} />;
}