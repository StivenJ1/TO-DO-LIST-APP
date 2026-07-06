export interface CategoryInterface {
    id: number;
    name: string;
}

export interface TaskInterface {
    id: number;
    name: string;
    description: string;
    category: CategoryInterface;
    state: boolean;
}