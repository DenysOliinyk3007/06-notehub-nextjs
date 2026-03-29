import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import Notes from './Notes.client'
import { fetchNotes } from '../../lib/api'

export default async function App() {

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, ''],  // matches initial state: page=1, search=''
    queryFn: () => fetchNotes('', 1),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
    <Notes />
  </HydrationBoundary>
  )
}
