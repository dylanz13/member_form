import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editUserAsync, deleteUserAsync } from '../redux/users/thunks';
import { Member, RootState } from '../redux/store';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast,
} from '@chakra-ui/react';

interface MemberDetailsPopupProps {
    member: Member;
    onClose: () => void;
}

const MemberDetail: React.FC<MemberDetailsPopupProps> = ({ member, onClose }) => {
    const [formData, setFormData] = useState(member);
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.users.error);
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...formData };
        delete data["signal"];
        delete data["requestId"];
        dispatch(editUserAsync({ id: member["id"], data: data }));
        toast({
            title: "Member updated.",
            description: "The member details have been updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onClose();
    };

    const handleDelete = () => {
        dispatch(deleteUserAsync(member["id"]));
        toast({
            title: "Member deleted.",
            description: "The member has been deleted successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
        onClose();
    };

    return (
        <Modal isOpen={!!member} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit Member Details</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                        </FormControl>
                        <FormControl isRequired mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input name="age" value={formData.age || ''} onChange={handleChange} placeholder="Age" type="number" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Image URL</FormLabel>
                            <Input name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} placeholder="Image URL" />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Hobby</FormLabel>
                            <Input name="hobby" value={formData.hobby || ''} onChange={handleChange} placeholder="Hobby" />
                        </FormControl>
                        {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} type="submit">
                            Save
                        </Button>
                        <Button colorScheme="red" onClick={handleDelete}>
                            Delete
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default MemberDetail;
