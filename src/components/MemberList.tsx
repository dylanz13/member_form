import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, deleteMember, deleteAllMembers, Member } from '../store';
import {
    Box,
    Button,
    Image,
    Text,
    VStack,
    HStack,
    SimpleGrid
} from '@chakra-ui/react';
import MemberDetail from './MemberDetail';

interface MemberListProps {
    searchTerm: string;
}

const MemberList: React.FC<MemberListProps> = ({ searchTerm }) => {
    const members = useSelector((state: RootState) => state.members);
    const dispatch = useDispatch();
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    const filteredMembers = members.filter((member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDetailOpen = (member: Member) => {
        setSelectedMember(member);
        setIsDetailOpen(true);
    };

    const handleDetailClose = () => {
        setSelectedMember(null);
        setIsDetailOpen(false);
    };

    return (
        <Box p={4}>
            <HStack justifyContent="center" mb={4}>
                <Button colorScheme="red" onClick={() => dispatch(deleteAllMembers())}>
                    Delete All Members
                </Button>
            </HStack>
            <SimpleGrid columns={[1, 2, 3]} spacing={4} justifyItems="center">
                {filteredMembers.map((member, index) => (
                    <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="lg"
                        overflow="hidden"
                        p={4}
                        cursor="pointer"
                        onClick={() => handleDetailOpen(member)}
                    >
                        <Image
                            src={member.imageUrl}
                            alt={member.name}
                            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')}
                        />
                        <VStack spacing={2} mt={2}>
                            <Text fontWeight="bold">{member.name}</Text>
                            <Text>{member.description}</Text>
                            {member.age && <Text>Age: {member.age}</Text>}
                            {member.hobby && <Text>Favorite Hobby: {member.hobby}</Text>}
                            <Button colorScheme="red" onClick={(e) => { e.stopPropagation(); dispatch(deleteMember(index)); }}>
                                Delete
                            </Button>
                        </VStack>
                    </Box>
                ))}
            </SimpleGrid>
            <MemberDetail member={selectedMember} isOpen={isDetailOpen} onClose={handleDetailClose} />
        </Box>
    );
};

export default MemberList;