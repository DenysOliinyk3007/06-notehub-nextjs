
import axios from 'axios'
import type { Note } from '../types/note'
import type { NoteFormValues } from '../components/NoteForm/NoteForm';


export interface NotesResponse {
    notes: Note[];
    totalPages: number;
}

export const fetchNotes = async (search: string, page: number): Promise<NotesResponse> => {
    const response = await axios.get<NotesResponse>(
        `https://notehub-public.goit.study/api/notes`,
        {   params: {page, perPage: 12, ...(search.trim() !== '' && { search }),},
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            }
        }
    );
    return response.data;
}

export const createNote = async (notevals: NoteFormValues): Promise<Note> => {
    const {data} = await axios.post<Note>(`https://notehub-public.goit.study/api/notes`, notevals, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        }
    });

    return data;
    
}


export const deleteNote = async (noteID: Note['id']) => {
    const {data} = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${noteID}`,{
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        }
    })

    return data;
}


export const getSingleNote = async (noteID: string) => {
    const {data} = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${noteID}`,{
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
        }
    })
    return data;
  };