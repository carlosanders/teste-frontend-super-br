import {TableColumn} from './table-column';

export class TableDefinitions {
    identifier: string;
    columns: TableColumn[] = [];
    version: string;

    constructor() {
        this.identifier = null;
        this.version = null;
        this.columns = [];
    }
}