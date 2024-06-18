export enum REQUEST_STATE {
    IDLE = 'IDLE',
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
};

export interface AppState {
    list: [],
    getMembers: REQUEST_STATE;
    addMember: REQUEST_STATE;
    updateMember: REQUEST_STATE;
    deleteMember: REQUEST_STATE;
    error: string | null;
}