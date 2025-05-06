interface InventoryStatus {
    label: string;
    value: string;
}
export interface Product {
    id?: string;
    code?: string;
    user?: string;
    message?: string;
    state?: string;
    date?: Date;
    daysPassed?: number;
    status?: string;
}
