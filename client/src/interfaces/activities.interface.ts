export interface IActivity {
    id: string;
    name: string;
    date: Date;
    inicialized_at: string;
    finalized_at: string;
}

export interface ICreateActivity {
    name: string;
    date: Date;
    inicialized_at: string;
    finalized_at: string;
}

export interface IUpdateActivity {
    name?: string;
    date?: Date;
    inicialized_at?: string;
    finalized_at?: string;
}