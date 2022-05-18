export class TableColumnDefinitions {
    width: number;
    resizable: boolean;
    ordable: boolean;
    excluded: boolean;
    selected: boolean;
    fixed: boolean;
    slave: boolean;
    order: number;

    constructor() {
        this.width = null;
        this.resizable = null;
        this.ordable = null;
        this.excluded = null;
        this.selected = null;
        this.fixed = null;
        this.slave = null;
        this.ordable = null;
    }
}
