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
    @Output() resizing: EventEmitter<boolean> = new EventEmitter<boolean>();
    @HostBinding('class') elementClass = '';

    private _startX: number;
    private _startWidth: number;
    private _column: HTMLElement;
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
            const row = this._renderer.parentNode(this._column);
            this._index = Array.from(this._column.parentNode.childNodes).indexOf(this._column);
            const thead = this._renderer.parentNode(row);
            this._table = this._renderer.parentNode(thead);
            this._startWidth = this._column.offsetWidth;
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
        if (event.buttons == 1) {
            this._pressed = true;
            this._startX = event.pageX;
            this._startWidth = this._column.offsetWidth;
        }
    }

    onRightClick = (event: MouseEvent) => {
        event.preventDefault();
        if (this.tableColumn.definitions.resizable) {
            const oldWidth = this._column.offsetWidth;
            this.resizeColumnTo(0);
            this.tableColumn.definitions.width = 0;
            this.columnChageWidth.emit({
                oldWidth: oldWidth,
                newWidth: this.tableColumn.definitions.width,
                tableColumn: this.tableColumn
            })
        }
    }

    onMouseMove = (event: MouseEvent) => {
        const offset = 35;
        if (this._pressed && event.buttons) {
            this._renderer.addClass(this._table, 'resizing');
            this.resizing.emit(true);
            // Calculate width of column
            let width = this._startWidth + (event.pageX - this._startX - offset);
            this.resizeColumnTo(width)
        }
    }

    onMouseUp = () => {
        if (this._pressed) {
            this._pressed = false;
            this._renderer.removeClass(this._table, 'resizing');
            this.resizing.emit(false);
            this.tableColumn.definitions.width = this._column.offsetWidth;
            this.columnChageWidth.emit({
                oldWidth: this._startWidth,
                newWidth: this._column.offsetWidth,
                tableColumn: this.tableColumn
            });
        }
    }

    resizeColumnTo(width: number): void {
        this._initialize();
        const tableCells = Array.from(this._table.querySelectorAll('.mat-row')).map(
            (row: any) => row.querySelectorAll('.mat-cell').item(this._index)
        );

        if (width) {
            this._renderer.setStyle(this._column, 'width', `${width}px`);
        } else {
            this._renderer.removeStyle(this._column, 'width');
        }

        for (const cell of tableCells) {
            if (width) {
                this._renderer.setStyle(cell, 'width', `${width}px`);
            } else {
                this._renderer.removeStyle(cell, 'width');
            }
        }
        //table width
        let widthSum = 0;
        Array.from(this._column.parentNode.childNodes).forEach((column: HTMLElement) => {
            if (column.offsetWidth) {
                widthSum += parseInt(column?.style?.width?.replace('px', '')) || column.offsetWidth;
            }
        });

        if (widthSum > this._renderer.parentNode(this._table).offsetWidth) {
            this._renderer.setStyle(this._table, 'width', `${widthSum}px`);
        } else {
            this._renderer.removeStyle(this._table, 'width');
        }
    }
}

export interface ColumnWidthChangeEvent {
    oldWidth: number;
    newWidth: number;
    tableColumn: TableColumn;
}
