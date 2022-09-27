import {TableColumnDefinitions} from './table-column-definitions';

export class TableColumn {
    id: string;
    headerLabel: string;
    dataLabel: string;
    dataValue: (...args: any[]) => any;
    dataRenderer: (...args: any[]) => any;
    headerClass: (...args: any[]) => any;
    dataClass: (...args: any[]) => any;
    positionFixed: boolean;
    definitions: TableColumnDefinitions;

    constructor() {
        this.id = null;
        this.headerLabel = null;
        this.dataLabel = null;
        this.positionFixed = null;
        this.definitions = new TableColumnDefinitions();
        this.headerClass = (...args: any[]) => null;
        this.dataClass = (...args: any[]) => null;
        this.dataRenderer = (...args: any[]) => null;
        this.dataValue = (...args: any[]) => null;
    }
}
