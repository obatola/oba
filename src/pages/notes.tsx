import { Notes } from "@/modules/notes/Notes";
import { NoteContextProvider } from "@/modules/notes/useNotesContext";

export default function NotesPage() {
    return (
        <>
            This is my notes app
            <NoteContextProvider>
                <Notes />
            </NoteContextProvider>
        </>
    );
}
