import {
    Directive, DoCheck,
    ElementRef, EventEmitter, HostBinding,
    Input, KeyValueDiffer, KeyValueDiffers, OnChanges,
    OnInit, Output, Renderer2, SimpleChanges,
} from '@angular/core';
import {TableColumn} from '@cdk/components/table-definitions/table-column';

@Directive({
    selector: '[cdkTableColumnResizable]'
})
export class CdkTableColumnResizableDirective implements OnInit, OnChanges, DoCheck {
    @Input('cdkTableColumnResizable') tableColumn: TableColumn;
    @Output() columnChageWidth: EventEmitter<ColumnWidthChangeEvent> = new EventEmitter<ColumnWidthChangeEvent>();
    @Output() resizing: EventEmitter<ColumnWidthChangeEvent|null> = new EventEmitter<ColumnWidthChangeEvent|null>();
    @HostBinding('class') elementClass = '';

    private _startX: number;
    private _startWidth: number;
    private _tableStartWidth: number;
    private _column: HTMLElement;
    private _nextColumn: HTMLElement;
    private _table: HTMLElement;
    private _pressed: boolean;
    private _index: number;
    private _initialized: boolean = false;
    private _tableColumnDiff: KeyValueDiffer<string, any>;

    constructor(private _renderer: Renderer2, private _host: ElementRef, private _differs: KeyValueDiffers) {
        this._column = this._host.nativeElement;
    }

    private _initialize(): void {
        if (!this._initialized) {
            this._initialized = true;
            const row: HTMLElement = <HTMLElement> this._renderer.parentNode(this._column);
            this._index = Array.from(row.childNodes).indexOf(this._column);
            if (row.childNodes[this._index+1] instanceof HTMLElement) {
                this._nextColumn = <HTMLElement> row.childNodes[this._index+1];
            } else {
                this._nextColumn = null;
            }
            const thead = this._renderer.parentNode(row);
            this._table = this._renderer.parentNode(thead);
            this._startWidth = this._column.offsetWidth;
            this._tableStartWidth = this._table.offsetWidth;
            if (!this._table.classList.contains('cdk-table-resizable')) {
                this._renderer.addClass(this._table, 'cdk-table-resizable');
            }
        }
    }

    get width(): number {
        return this._column.style.width ? this._column.offsetWidth : 0;
    }

    ngOnInit() {
        if (this.tableColumn.definitions.resizable) {
            this.elementClass = 'cdk-table-column-resizable';
            this._initialize();
            const resizer = this._renderer.createElement('span');
            this._renderer.addClass(resizer, 'resize-holder');
            this._renderer.appendChild(this._column, resizer);
            this._renderer.listen(resizer, 'mousedown', this.onMouseDown);
            this._renderer.listen(resizer, 'contextmenu', this.onRightClick);
            this._renderer.listen(this._table, 'mousemove', this.onMouseMove);
            this._renderer.listen('document', 'mouseup', this.onMouseUp);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['tableColumn']) {
            this._tableColumnDiff = this._differs.find(this.tableColumn.definitions).create();
            this.resizeColumnTo(this.tableColumn.definitions.width);
        }
    }

    ngDoCheck(): void {
        const diffs = this._tableColumnDiff.diff(this.tableColumn.definitions);
        if (diffs) {
            this.resizeColumnTo(this.tableColumn.definitions.width);
        }
    }

    onMouseDown = (event: MouseEvent) => {
        if (event.buttons == 1 && this.tableColumn.definitions.resizable) {
            this._pressed = true;
            this._startX = event.pageX;
            this._startWidth = this._column.offsetWidth;
            this._tableStartWidth = this._table.offsetWidth;
            this._renderer.addClass(this._table, 'resizing');
        }
    }

    onRightClick = (event: MouseEvent) => {
        event.preventDefault();
        if (this.tableColumn.definitions.resizable) {
            this.tableColumn.definitions.width = 0;
            this.columnChageWidth.emit(this.resizeColumnTo(this.tableColumn.definitions.width));
        }
    }

    onMouseMove = (event: MouseEvent) => {
        if (this._pressed && event.buttons) {
            const offset = 0;
            const width = this._startWidth + (event.pageX - this._startX-offset);
            this.resizing.emit(this.resizeColumnTo(width));
        }
    }

    onMouseUp = () => {
        if (this._pressed) {
            this._pressed = false;
            this._renderer.removeClass(this._table, 'resizing');
            this.resizing.emit(null);
            this.tableColumn.definitions.width = this._column.offsetWidth;
            this.columnChageWidth.emit({
                tableColumn: this.tableColumn,
                oldWidth: this._startWidth,
                newWidth: this._column.offsetWidth,
                tableOldWidth: this._tableStartWidth,
                tableNewWitdh: this._table.offsetWidth,
                scope: this
            });
        }
    }

    resizeColumnTo(width: number): ColumnWidthChangeEvent {
        this._initialize();
        if (!this._nextColumn || width <= 40) {
            width = 0;
        }
        if (width) {
            this._renderer.setStyle(this._column, 'min-width', `${width}px`);
        } else {
            this._renderer.removeStyle(this._column, 'min-width');
        }

        return {
            tableColumn: this.tableColumn,
            oldWidth: this._startWidth,
            newWidth: width,
            tableOldWidth: this._tableStartWidth,
            tableNewWitdh: this._table.offsetWidth,
            scope: this
        };
    }

    getTableWidth(): number {
        return this._table?.offsetWidth;
    }
}

export interface ColumnWidthChangeEvent {
    tableColumn: TableColumn;
    oldWidth: number;
    newWidth: number;
    tableOldWidth: number;
    tableNewWitdh: number;
    scope: CdkTableColumnResizableDirective;
}
