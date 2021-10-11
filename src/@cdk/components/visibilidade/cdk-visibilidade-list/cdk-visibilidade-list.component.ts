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
    deletingErrors: any = {};

    @Input()
    actions: string[] = ['delete'];

    @Output()
    reload = new EventEmitter<any>();

    @Output()
    delete = new EventEmitter<number>();

    @Output()
    deleteBlocoEmmitter = new EventEmitter<number[]>();

    @Output()
    create = new EventEmitter<any>();

    adminCount: number = 0;

    @Input()
    tipoRelatorio: boolean;

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
        this.adminCount = this.visibilidades
            ?.filter(visibilidade => visibilidade.poderes.includes('ADMINISTRADOR') && visibilidade.valor !== 'ROLE_USER').length;
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

    deleteBloco(ids): void {
        this.deleteBlocoEmmitter.emit(ids);
    }

    doCreate(): void {
        this.create.emit();
    }
}
