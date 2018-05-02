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

/**
 * Data needed to request a list to be shared with another user.
 * @interface ShareRequest
 */
export interface ShareRequest {
    email: string;
    listId: string;
    list: List;
}
