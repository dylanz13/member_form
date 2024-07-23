import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import {deleteAllAsync, getUsersAsync} from '../redux/users/thunks';
import MemberCard from './MemberCard';
import MemberDetail from './MemberDetail';
import { Member } from '../redux/store'
import { Button, Input, } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';

const MemberList: React.FC = () => {
    const dispatch = useDispatch();
    const members = useSelector((state: RootState) => state.users.members);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);
    const [selectedMember, setSelectedMember] = useState<Member | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const toast = useToast();

    useEffect(() => {
        dispatch(getUsersAsync());
    }, [dispatch]);

    const handleDeleteAll = () => {
        dispatch(deleteAllAsync());
        toast({
            title: "All members deleted",
            description: "All members were successfully deleted",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <Input
                type="text"
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                mb={2} // Add margin bottom using Chakra UI prop
            />
            {filteredMembers.length > 0 && ( // Show delete all button only if there are members
                <Button mb={8} colorScheme="red" onClick={handleDeleteAll} mt={4}>Delete All Members</Button>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="member-list">
                    {filteredMembers.map(member => (
                        <MemberCard
                            key={member["_id"]}
                            member={member}
                            onClick={() => setSelectedMember(member)}
                        />
                    ))}
                </div>
            )}
            {error && <p className="error">{error}</p>}
            {selectedMember && (
                <div className="popup-container">
                    <MemberDetail className="popup"
                        member={selectedMember}
                        onClose={() => setSelectedMember(null)}
                    />
                </div>
            )}
        </div>
    );
};

export default MemberList;