import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation,
    EventEmitter,
    OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {Pagination} from '@cdk/models/pagination';

import {EspecieAtividadeService} from '@cdk/services/especie-atividade.service';
import {EspecieAtividade} from '@cdk/models/especie-atividade.model';

@Component({
    selector: 'cdk-especie-atividade-gridsearch',
    templateUrl: './cdk-especie-atividade-gridsearch.component.html',
    styleUrls: ['./cdk-especie-atividade-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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
            JSON.stringify(params.populate))
            .pipe(finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
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
