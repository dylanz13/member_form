import React from 'react';
import { Member } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Box, Image, Text, Flex, VStack, Button } from '@chakra-ui/react';
import {deleteUserAsync} from "../redux/users/thunks";


interface MemberCardProps {
    member: Member;
    onClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onClick, onClose }) => {
    const dispatch = useDispatch();

    const handleDelete = (e) => {
        e.stopPropagation();
        dispatch(deleteUserAsync(member["_id"]));
    };

    return (
        <Box className={"member-card"}
            key={member["_id"]}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            p={4}
            cursor="pointer"
            width="300px"
            transition="all 0.3s"
            textAlign="left"
            onClick = {onClick}
        >
            <Image
                src={member.imageUrl}
                alt={member.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => (e.currentTarget.src = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')}
                objectFit="cover"
                height="200px" // Fixed height for image
            />
            <VStack spacing={2} mt={2} alignItems={"start"} textAlign="left">
                <Text fontSize="md" fontWeight="semibold">{member.name}</Text>
                <Text fontSize="sm" color="gray.600">{member.description}</Text>
                {member.age && (
                    <Flex alignItems="center">
                        <Text fontSize="sm" fontWeight="bold" mr="2">Age:</Text>
                        <Text fontSize="sm">{member.age}</Text>
                    </Flex>
                )}
                {member.hobby && (
                    <Flex alignItems="center">
                        <Text fontSize="sm" fontWeight="bold" mr="2">Hobby:</Text>
                        <Text fontSize="sm">{member.hobby}</Text>
                    </Flex>
                )}
                <Button colorScheme="red" onClick={handleDelete}>
                    Delete
                </Button>
            </VStack>
        </Box>
    );
};

export default MemberCard;