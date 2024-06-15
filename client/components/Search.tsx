import React, { useState, ChangeEvent } from 'react';
import { Input, Box } from '@chakra-ui/react';

interface SearchProps {
    onSearch: (term: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <Box p={4}>
            <Input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Search Members"
            />
        </Box>
    );
};

export default Search;
