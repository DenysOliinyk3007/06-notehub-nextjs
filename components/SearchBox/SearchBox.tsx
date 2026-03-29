
import css from './SearchBox.module.css'

interface SearchBoxProps {
    search: string,
    onSearch: (value: string) => void,
}


export default function SearchBox({ search, onSearch }: SearchBoxProps) {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        onSearch(event.target.value);
    }
    return (
        <input
            className={css.input}
            type="text"
            placeholder="Search notes"
            value={search}
            onChange={handleChange}
        />
    )
}