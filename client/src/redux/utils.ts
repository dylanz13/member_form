import {Member} from "./store";

export interface AppState {
    members: Member[],
    loading: boolean;
    error: string | null;
}