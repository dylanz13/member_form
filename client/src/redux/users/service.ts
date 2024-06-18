const getUsers = async () => {
    const response = await fetch('http://localhost:5000/members', {
        method: 'GET'
    });

    return response.json();
};

const addUser = async (memberData: any) => {
    const response = await fetch('http://localhost:5000/members', {
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

const editUser = async (memberId: any, memberData: any) => {
    const response = await fetch(`http://localhost:3001/members/${memberId}`, {
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

const deleteUser = async (memberId: any) => {
    const response = await fetch(`http://localhost:3001/members/${memberId}`, {
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
    const response = await fetch(`http://localhost:3001/members/`, {
        method: 'DELETE'
    });

    return response.json();
};

export default {
    getUsers,
    addUser,
    editUser,
    deleteUser,
    deleteAll
}