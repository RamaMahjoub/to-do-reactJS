export interface ColumnScheme {
    id: string;
    title: string;
}

interface Columns {
    [columnId: string]: ColumnScheme;
}

interface Data {
    columns: Columns;
    columnOrder: Array<string>;
}

export const data: Data = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To do',
        },
        'column-2': {
            id: 'column-2',
            title: 'In progress',
        },
        'column-3': {
            id: 'column-3',
            title: 'Completed',
        },
    },
    columnOrder: ['column-1', 'column-2', 'column-3']
}