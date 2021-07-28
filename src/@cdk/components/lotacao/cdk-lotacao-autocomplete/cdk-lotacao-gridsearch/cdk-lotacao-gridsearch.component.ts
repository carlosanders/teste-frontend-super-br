import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewEncapsulation
} from '@angular/core';
import {of} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Lotacao, Pagination} from '@cdk/models';

import {LotacaoService} from '@cdk/services/lotacao.service';

@Component({
    selector: 'cdk-lotacao-gridsearch',
    templateUrl: './cdk-lotacao-gridsearch.component.html',
    styleUrls: ['./cdk-lotacao-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkLotacaoGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    lotacoes: Lotacao[];

    total = 0;

    loading: boolean;

    @Input()
    mode = 'list';

    @Input()
    displayedColumns: string[] = ['select', 'id', 'colaborador.usuario.nome', 'setor.nome', 'setor.unidade.nome', 'principal', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _lotacaoService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _lotacaoService: LotacaoService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {
        this.loading = true;

        this._lotacaoService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate),
            JSON.stringify(params.context))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
            this.lotacoes = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        };
        this.load(params);
    }

    select(lotacao): void {
        this.selected.emit(lotacao);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
