import {TableColumn} from './table-column';

export class TableDefinitions {
    identifier: string;
    columns: TableColumn[] = [];
    version: string;
    sort?: any = {};
    limit?: number;
    data?: any;

    constructor() {
        this.identifier = null;
        this.version = null;
        this.sort = {};
        this.limit = null;
        this.data = null;
        this.columns = [];
    }
}
