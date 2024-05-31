import React, { useState } from 'react';
import { Flex, Container, Heading, VStack, Box } from '@chakra-ui/react';
import MemberForm from './components/MemberForm';
import MemberList from './components/MemberList';
import Search from './components/Search';

const App: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <Flex direction="column" align="center" justify="center" minHeight="100vh">
            <Container maxW="container.lg" centerContent>
                <VStack spacing={4} mt={4} width="100%">
                    <Heading as="h1" textAlign="center" my={4}>
                        Member List
                    </Heading>
                    <Box width="100%">
                        <MemberForm />
                    </Box>
                    <Box width="100%">
                        <Search onSearch={setSearchTerm} />
                    </Box>
                    <Box width="100%">
                        <MemberList searchTerm={searchTerm} />
                    </Box>
                </VStack>
            </Container>
        </Flex>
    );
};

export default App;
