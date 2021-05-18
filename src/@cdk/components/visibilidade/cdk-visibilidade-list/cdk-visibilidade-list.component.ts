import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Visibilidade} from '@cdk/models';

@Component({
    selector: 'cdk-visibilidade-list',
    templateUrl: './cdk-visibilidade-list.component.html',
    styleUrls: ['./cdk-visibilidade-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkVisibilidadeListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    visibilidades: Visibilidade[];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: {};

    @Input()
    actions: string[] = ['delete'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    create = new EventEmitter<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    ngOnChanges(): void {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
    }

    loadPage(): void {
        this.reload.emit();
    }

    doDeleteVisibilidade(visibilidadeId): void {
        this.delete.emit(visibilidadeId);
    }

    doCreate(): void {
        this.create.emit();
    }
}
