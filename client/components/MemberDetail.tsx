import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    Text,
    ModalFooter,
    Button
} from '@chakra-ui/react';
import { Member } from '../vite-env.ts';

interface MemberDetailProps {
    member: Member | null;
    isOpen: boolean;
    onClose: () => void;
}

const MemberDetail: React.FC<MemberDetailProps> = ({ member, isOpen, onClose }) => {
    if (!member) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{member.name}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>{member.description}</Text>
                    {member.age && <Text>Age: {member.age}</Text>}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default MemberDetail;