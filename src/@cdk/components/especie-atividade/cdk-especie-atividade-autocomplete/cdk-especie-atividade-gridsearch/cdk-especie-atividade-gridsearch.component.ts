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

import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {EspecieAtividade, Pagination} from '@cdk/models';

@Component({
    selector: 'cdk-especie-atividade-gridsearch',
    templateUrl: './cdk-especie-atividade-gridsearch.component.html',
    styleUrls: ['./cdk-especie-atividade-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CdkEspecieAtividadeGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieAtividades: EspecieAtividade[];

    total = 0;

    loading: boolean;

    @Input()
    mode = 'list';

    @Output()
    create = new EventEmitter<any>();

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'generoAtividade.nome', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _especieAtividadeService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieAtividadeService: EspecieAtividadeService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._especieAtividadeService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate),
            JSON.stringify(params.context))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe((response) => {
                this.especieAtividades = response['entities'];
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
            populate: this.pagination.populate
        };
        this.load (params);
    }

    select(especieAtividade): void {
        this.selected.emit(especieAtividade);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
