import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addMember } from '../vite-env.ts';
import { Box, Button, Input, FormControl, FormLabel, Stack } from '@chakra-ui/react';

const MemberForm: React.FC = () => {
    const dispatch = useDispatch();
    const [form, setForm] = useState({
        name: '',
        description: '',
        age: '',
        imageUrl: '',
        hobby: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (form.name && form.description) {
            dispatch(addMember({
                name: form.name,
                description: form.description,
                age: form.age ? Number(form.age) : undefined,
                imageUrl: form.imageUrl,
                hobby: form.hobby
            }));
            setForm({
                name: '',
                description: '',
                age: '',
                imageUrl: '',
                hobby: ''
            });
        } else {
            alert('Please fill out all required fields.');
        }
    };

    return (
        <Box p={4}>
            <Stack spacing={3}>
                <FormControl>
                    <FormLabel>Member Name</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Member Name"
                        isRequired
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input
                        type="text"
                        name="description"
                        value={form.description}
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
                        value={form.age}
                        onChange={handleChange}
                        placeholder="Age"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Image URL</FormLabel>
                    <Input
                        type="url"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="Image URL"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Favorite Hobby</FormLabel>
                    <Input
                        type="text"
                        name="hobby"
                        value={form.hobby}
                        onChange={handleChange}
                        placeholder="Favorite Hobby"
                    />
                </FormControl>
                <Button onClick={handleSubmit}>Add Member</Button>
            </Stack>
        </Box>
    );
};

export default MemberForm;