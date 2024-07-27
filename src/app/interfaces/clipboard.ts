import { Item } from "./item";

export interface Clipboard {
    id: number;
    title: string;
    description: string;
    items: Item[];
}
