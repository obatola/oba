import { ChangeEventHandler, useCallback, useEffect, useMemo, useState } from "react";
import { Button, Center, Group, JsonInput, Menu, Modal, SimpleGrid, Stack, Table, Text, TextInput, Tooltip } from "@mantine/core";
import { useApi } from "./useApi";
import { FileExtractorDetail, FileExtractorRecord } from "./FileExtractor.types";
import { useDisclosure } from "@mantine/hooks";

function Loader() {
    return <Center><Text color="gray">...Loading</Text></Center>
}

type ToastType = {
    title: string;
    timestamp: string;
    type?: 'success' | 'error' | 'warning';
    content: React.ReactNode;
}

function UploadFile({ refresh }: { refresh: () => void }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState<string | null>(null);
    const { onUpload } = useApi();

    const isUploadEnabled = fileName !== null && !isLoading;

    const handleAddNewFileClick = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleUploadPDF = async () => {
        if (!isUploadEnabled || fileName === null) return false;
        try {
            setIsLoading(true);
            const results = await onUpload({ fileName, schemaType: 'invoice' })
            console.log(`TOAST-SUCCESS: The file, ${results}, is successfully uploaded`)
            refresh();
        } catch (error) {
            console.log('TOAST-ERROR: There was an error uploading the file')
        }
        setIsLoading(false);
        setIsModalOpen(false);
    }

    const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (event) => {
        setFileName(event.target.value);
    }

    return (
        <>
            <Modal opened={isModalOpen} title="Upload File" onClose={handleCloseModal}>
                <Stack>
                    <input type='file' className="bg-yellow-400" value={fileName || ''} onChange={handleChangeFile} />
                    <Stack gap="0">
                        <Button disabled={!isUploadEnabled} type="button" onClick={handleUploadPDF}>Upload</Button>
                        {!isUploadEnabled && <Text color="red">you must select a file</Text>}
                    </Stack>
                </Stack>
            </Modal>
            <div><Button type="button" onClick={handleAddNewFileClick}>Add File</Button></div>
        </>
    )
}

function getLastActionString({ file }: { file: FileExtractorRecord }) {
    if (!file.lastEditedAt) {
        return `Created by ${file.createdBy} - ${file.createdAt}`
    }
    return `Edited by ${file.lastEditedBy} - ${file.lastEditedAt}`
}

function useGetFile({ id }: { id: string }) {
    const [file, setFile] = useState<FileExtractorDetail>();
    const { onGet } = useApi();
    const [isLoading, setIsLoading] = useState(false);
    const getFile = async ({ id }: { id: string }) => {
        try {
            setIsLoading(true);
            const result = await onGet({ id })
            console.log('set result', { result, id })
            setFile(result as FileExtractorDetail)
        } catch (error) {
            console.log('TOAST-ERROR: There was an error fetching the file')
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getFile({ id })
    }, [id])

    return { file, isLoading }
}

function FileViewer({ isOpen, fileId, onClose }: { isOpen: boolean, fileId: string, onClose: () => void }) {
    const { file, isLoading } = useGetFile({ id: fileId })

    if (isLoading) {
        return (
            <Modal size="xl" opened={isOpen} onClose={onClose} title={`View File: ${fileId}`}>
                <Loader />
            </Modal>
        )
    }

    return (
        <Modal size="xl" opened={isOpen} onClose={onClose} title={`View File: ${file?.fileName}`}>
            <SimpleGrid cols={2}>
                <Stack>
                    <iframe src="/files/tailwind_css_cheat_sheet.pdf"
                        title="15 Life Hacks (PDF)"
                        style={{ width: "100%", minHeight: 480, border: "1px solid var(--mantine-color-default-border)" }} />
                </Stack>
                <Stack>
                    <JsonInput disabled autosize value={JSON.stringify(file?.structuredData)} />
                </Stack>
            </SimpleGrid>
        </Modal>
    )
}

function FileForm({ initialData, onSubmit }: { initialData: Partial<FileExtractorDetail>, onSubmit: ({ fileRecord }: { fileRecord: FileExtractorDetail }) => void }) {
    const [fileName, setFileName] = useState(initialData.fileName || '');
    const [schemaType, setSchemaType] = useState(initialData.schemaType || '');
    const isFileFull = fileName?.length > 3;

    const handleSubmit = useCallback(() => {
        const newFile: FileExtractorDetail = {
            fileName,
            ...initialData,
        };
        onSubmit({ fileRecord: newFile })
    }, [fileName, initialData, isFileFull])

    return (
        <Stack>
            <TextInput value={fileName} onChange={(event) => setFileName(event.target.value || '')} />
            <TextInput value={schemaType} onChange={(event) => setSchemaType(event.target.value || '')} />
            <Button type="button" onClick={handleSubmit}>Save</Button>
        </Stack>
    )
}


function FileEditor({ isOpen, fileId, onClose, refresh }: { isOpen: boolean, fileId: string, onClose: () => void, refresh: () => void }) {
    const { file, isLoading } = useGetFile({ id: fileId })
    const { onUpdate } = useApi()

    const handleEditForm = async ({ fileRecord }: { fileRecord: FileExtractorDetail }) => {
        console.log('handleEditForm', { fileRecord })
        try {
            const results = await onUpdate({ fileRecord })
            console.log('TOAST-SUCCESS: successfully updated the file', results)
            refresh();
        } catch (error) {
            console.log('TOAST-ERROR: There was an error editting the file')
        }
    }

    if (isLoading) {
        return (
            <Modal size="xl" opened={isOpen} onClose={onClose} title={`Edit File: ${fileId}`}>
                <Loader />
            </Modal>
        )
    }

    return (
        <Modal size="xl" opened={isOpen} onClose={onClose} title={`Edit File: ${file?.fileName}`}>
            <SimpleGrid cols={2}>
                <Stack>
                    <iframe src="/files/tailwind_css_cheat_sheet.pdf"
                        title="15 Life Hacks (PDF)"
                        style={{ width: "100%", minHeight: 480, border: "1px solid var(--mantine-color-default-border)" }} />
                </Stack>
                <Stack>
                    {file && <FileForm initialData={file} onSubmit={handleEditForm} />}
                </Stack>
            </SimpleGrid>
        </Modal>
    )
}

function FileListActionMenu({ fileId, refresh }: { fileId: string, refresh: () => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isFileViewerOpen, { open: openFileViewer, close: closeFileViewer }] = useDisclosure(false)
    const [isFileEditorOpen, { open: openFileEditor, close: closeFileEditor }] = useDisclosure(false)
    const [isDeletionLoading, setIsDeletionLoading] = useState(false);

    const { onDelete } = useApi()

    const handleOpenMenu = () => {
        setIsMenuOpen(true);
    }

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    }

    const handleDeleteFile = async () => {
        try {
            setIsDeletionLoading(true)
            await onDelete({ id: fileId })
            refresh()
        } catch (error) {
            console.log('TOAST-ERROR: There was an error deleting the file')
        }
        setIsDeletionLoading(false)
    }

    return (<>
        {isFileViewerOpen &&
            <FileViewer
                isOpen={isFileViewerOpen}
                fileId={fileId}
                onClose={closeFileViewer} />
        }
        {isFileEditorOpen &&
            <FileEditor
                isOpen={isFileEditorOpen}
                fileId={fileId}
                onClose={closeFileEditor}
                refresh={refresh} />
        }
        <Menu opened={isMenuOpen} onClose={handleCloseMenu}>
            <Menu.Dropdown>
                <Menu.Item onClick={openFileViewer}>View</Menu.Item>
                <Menu.Item onClick={openFileEditor}>Edit</Menu.Item>
                <Menu.Item onClick={handleDeleteFile} disabled={isDeletionLoading}>Delete</Menu.Item>
            </Menu.Dropdown>
            <Menu.Target>
                <Button size="compact-sm" variant="subtle" type="button" onClick={handleOpenMenu}>...</Button>
            </Menu.Target>
        </Menu>
    </>)
}

function FilesList({ files, isLoading, refresh }: { files: FileExtractorRecord[], isLoading: boolean, refresh: () => void }) {
    if (isLoading) {
        return <Loader />
    }

    const rows = useMemo(() => {
        return files.map(file => (
            <Table.Tr key={file.id}>
                <Table.Td>{file.fileName}</Table.Td>
                <Table.Td>{file.schemaType}</Table.Td>
                <Table.Td>{file.status}</Table.Td>
                <Table.Td>{getLastActionString({ file })}</Table.Td>
                <Table.Td>{<FileListActionMenu fileId={file.id} refresh={refresh} />}</Table.Td>
            </Table.Tr>
        ))
    }, [files])

    return (
        <Stack>
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>File Name</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Last Action</Table.Th>
                        <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Stack>
    )
}

export function FileExtractor() {
    const [files, setFiles] = useState<FileExtractorRecord[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { onList } = useApi()

    const getFiles = async () => {
        try {
            setIsLoading(true);
            const results = await onList()
            if (results?.files) {
                setFiles(results?.files);
            }
        } catch (error) {
            console.log('TOAST-ERROR: There was an error fetching files')
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getFiles();
    }, [])

    const handleRefresh = () => {
        getFiles();
    }

    return (
        <Stack p="md">
            <Group w="100%" justify="end"><UploadFile refresh={handleRefresh} /></Group>
            <FilesList files={files} isLoading={isLoading} refresh={handleRefresh} />
        </Stack>
    );
}