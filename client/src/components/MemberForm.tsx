import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUserAsync } from '../redux/users/thunks';
import { RootState } from '../redux/store';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useToast
} from '@chakra-ui/react';

const MemberForm: React.FC = () => {
    const toast = useToast();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        age: undefined,
        imageUrl: '',
        hobby: '',
    });
    const dispatch = useDispatch();
    const error = useSelector((state: RootState) => state.users.error);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addUserAsync(formData));
        setFormData({
            name: '',
            description: '',
            age: '',
            imageUrl: '',
            hobby: '',
        });
    };

    return (
        <Box p={4} display="flex" justifyContent="center">
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <FormLabel>Member Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Member Name"
                        isRequired
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description"
                        isRequired
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Favorite Hobby</FormLabel>
                    <Input
                        type="text"
                        name="hobby"
                        value={formData.hobby}
                        onChange={handleChange}
                        placeholder="Favorite Hobby"
                    />
                </FormControl>
                <Button type="submit" mt={4} colorScheme="blue">
                    Add Member
                </Button>
                {error && <p className="error">{error}</p>}
            </form>
        </Box>
    );
};

export default MemberForm;
