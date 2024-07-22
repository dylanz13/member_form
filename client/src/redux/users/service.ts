import {Member} from "../store";

export const url = "https://member-form.onrender.com";

const getUsers = async () => {
    const response = await fetch(`${url}/members`, {
        method: 'GET'
    });

    return response.json();
};

const addUser = async (memberData: Partial<Member>) => {
    const response = await fetch(`${url}/members`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message || 'Failed to add member';
        throw new Error(errorMsg);
    }

    return data;
};

const getUser = async (name: string) => {
    const response = await fetch(`${url}/members/${name}`, {
        method: 'GET'
    });
    const data = await response.json();
    return (!response.ok) ? 0 : 1;
}


const getDefault = async () => {
    const response = await fetch(`${url}/default`, {
        method: 'GET',
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message || 'Failed to add member';
        throw new Error(errorMsg);
    }

    return data;
};


const editUser = async (name: string, memberData: Partial<Member>) => {
    const response = await fetch(`${url}/members/${name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(memberData)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message || 'Failed to update member';
        throw new Error(errorMsg);
    }

    return data;
};

const deleteUser = async (name: string) => {
    const response = await fetch(`${url}/members/${name}`, {
        method: 'DELETE'
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message || 'Failed to delete member';
        throw new Error(errorMsg);
    }

    return data;
};


const deleteAll = async () => {
    const response = await fetch(`${url}/members/`, {
        method: 'DELETE'
    });

    return response.json();
};

export default {
    getUsers,
    getDefault,
    addUser,
    editUser,
    deleteUser,
    deleteAll,
    getUser
}