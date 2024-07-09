import React, { useState, useEffect } from 'react';
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
    VStack,
    HStack,
    IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';

interface MemberDetailsPopupProps {
    member: Member;
    onClose: () => void;
}

interface DynamicField {
    key: string;
    value: string;
}

const MemberDetail: React.FC<MemberDetailsPopupProps> = ({ member, onClose }) => {
    const [name, setName] = useState(member.name);
    const [description, setDescription] = useState(member.description);
    const [dynamicFields, setDynamicFields] = useState<DynamicField[]>([]);
    const [removedFields, setRemovedFields] = useState<string[]>([]);
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.users.error);
    const toast = useToast();

    useEffect(() => {
        const initialDynamicFields = Object.entries(member)
            .filter(([key]) => !['_id', 'name', 'description'].includes(key))
            .map(([key, value]) => ({ key, value: String(value) }));
        setDynamicFields(initialDynamicFields);
        setRemovedFields([]);
    }, [member]);

    const handleDynamicFieldChange = (index: number, field: 'key' | 'value', value: string) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = value;
        setDynamicFields(updatedFields);
    };

    const addDynamicField = () => {
        setDynamicFields([...dynamicFields, { key: '', value: '' }]);
    };

    const removeDynamicField = (index: number) => {
        const fieldToRemove = dynamicFields[index];
        setRemovedFields([...removedFields, fieldToRemove.key]);
        const updatedFields = dynamicFields.filter((_, i) => i !== index);
        setDynamicFields(updatedFields);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedData: Record<string, any> = {
            name,
            description,
        };
        dynamicFields.forEach(field => {
            if (field.key && field.value) {
                updatedData[field.key] = field.value;
            }
        });

        dispatch(editUserAsync({
            id: member["_id"],
            data: {
                updatedFields: updatedData,
                removedFields: removedFields
            }
        }));

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
        dispatch(deleteUserAsync(member["_id"]));
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
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Name"
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description"
                                />
                            </FormControl>

                            {dynamicFields.map((field, index) => (
                                <HStack key={index} width="100%">
                                    <FormControl>
                                        <Input
                                            placeholder="Field Name"
                                            value={field.key}
                                            onChange={(e) => handleDynamicFieldChange(index, 'key', e.target.value)}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <Input
                                            placeholder="Field Value"
                                            value={field.value}
                                            onChange={(e) => handleDynamicFieldChange(index, 'value', e.target.value)}
                                        />
                                    </FormControl>
                                    <IconButton
                                        aria-label="Remove field"
                                        icon={<DeleteIcon />}
                                        onClick={() => removeDynamicField(index)}
                                    />
                                </HStack>
                            ))}

                            <Button leftIcon={<AddIcon />} onClick={addDynamicField} width="100%">
                                Add New Field
                            </Button>

                            {error && <p className="error" style={{ color: 'red' }}>{error}</p>}
                        </VStack>
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