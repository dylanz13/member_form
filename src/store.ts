import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Member {
    name: string;
    description: string;
    age?: number;
    imageUrl: string;
    hobby?: string;
}

const initialState: Member[] = [
    {
        name: "Dr. Gregory House",
        description: "Head of diagnostic medicine at the Princeton-Plainsboro Teaching Hospital",
        age: 64,
        imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.howold.co%2Fuploads%2Fphoto%2F600x600%2F79%2Fhugh-laurie-5e9e11de80a72.jpg&f=1&nofb=1&ipt=20c9632629309c87ba78d28db16da759b203443df6741c163cf449158fd5ad5b&ipo=images",
        hobby: "Playing Detective"
    }
];

const membersSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        addMember: (state, action: PayloadAction<Member>) => {
            state.push(action.payload);
        },
        deleteMember: (state, action: PayloadAction<number>) => {
            return state.filter((_, index) => index !== action.payload);
        },
        deleteAllMembers: () => []
    }
});

export const { addMember, deleteMember, deleteAllMembers } = membersSlice.actions;

export const store = configureStore({
    reducer: {
        members: membersSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
