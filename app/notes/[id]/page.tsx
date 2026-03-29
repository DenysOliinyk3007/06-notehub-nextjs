import { getSingleNote } from "@/lib/api";
import NoteDetailsClient from "./NoteDetailsClient";
import {
    QueryClient,
    HydrationBoundary,
    dehydrate,
  } from "@tanstack/react-query";

interface SingleNoteProps {
    params: Promise<{ id: string }>
}


const NoteDetails = async ({ params }: SingleNoteProps) => {
    const { id } = await params;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["note", id],
        queryFn: () => getSingleNote(id),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <NoteDetailsClient/>
        </HydrationBoundary>
    )
}


export default NoteDetails;