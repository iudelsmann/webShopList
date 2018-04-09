/**
 * Item in a list.
 *
 * @interface ListItem
 */
export interface ListItem {
    id: string;
    createdAt: number;
    name: string;
}

/**
 * Lists object interface.
 *
 * @interface List
 */
export interface List {
    id: string;
    createdAt: number;
    name: string;
}
