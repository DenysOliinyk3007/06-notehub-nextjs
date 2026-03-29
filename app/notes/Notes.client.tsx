'use client'

import css from './page.module.css'
import SearchBox from '../../components/SearchBox/SearchBox'
import NoteList from '../../components/NoteList/NoteList';
import Pagination from '../../components/Pagination/Pagination';
import Modal from '../../components/Modal/Modal';
import NoteForm from '../../components/NoteForm/NoteForm';
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { fetchNotes } from '../../lib/api';

export default function Notes() {
    const [search, setSearch] = useState<string>('')

  const [currentPage, setCurrentPage] = useState<number>(1);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isSuccess, isError } = useQuery({
    queryKey: ['notes', currentPage, search],
    queryFn: () => fetchNotes(search, currentPage),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  })

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const handleSearch = useDebouncedCallback(
    (value: string) => {
      setSearch(value);
      setCurrentPage(1);
    }, 1000
  )
  
    return (
        <div className={css.app}>
          <header className={css.toolbar}>
    
            <SearchBox search={search} onSearch={handleSearch} />
            {isSuccess && totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />}
            <button className={css.button} onClick={openModal}>Create note +</button>
          </header>
          {notes.length > 0 && !isError && <NoteList notes={notes} />}
          {isModalOpen && (
            <Modal onClose={closeModal}>
              <NoteForm onCancel={closeModal} />
            </Modal>
          )}
    
    
        </div>
      )
  }