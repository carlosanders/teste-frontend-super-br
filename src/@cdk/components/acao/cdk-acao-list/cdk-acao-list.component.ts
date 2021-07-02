import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Acao} from '@cdk/models';

@Component({
    selector: 'cdk-acao-list',
    templateUrl: './cdk-acao-list.component.html',
    styleUrls: ['./cdk-acao-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkAcaoListComponent implements AfterViewInit, OnInit, OnChanges {

    @Input()
    loading: boolean;

    @Input()
    acoes: Acao[] = [];

    @Input()
    deletingIds: number[] = [];

    @Input()
    deletedIds: number[] = [];

    @Input()
    deletingErrors: any = {};

    @Input()
    actions: string[] = ['delete'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    excluded = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    create = new EventEmitter<any>();

    hasExcluded = false;
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

    doDeleteacao(acaoId): void {
        this.delete.emit(acaoId);
    }

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    doCreate(): void {
        this.create.emit();
    }
}
