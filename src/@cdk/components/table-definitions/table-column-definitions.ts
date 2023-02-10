export class TableColumnDefinitions {
    width: number;
    resizable: boolean;
    ordable: boolean;
    excluded: boolean;
    selected: boolean;
    fixed: boolean;
    slave: boolean;
    order: number;
    sortable: boolean;

    constructor() {
        this.width = 0;
        this.resizable = null;
        this.ordable = null;
        this.excluded = false;
        this.selected = null;
        this.fixed = null;
        this.slave = null;
        this.ordable = null;
        this.sortable = null;
    }
}
