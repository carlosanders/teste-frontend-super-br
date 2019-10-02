import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter, OnInit
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {EspecieTarefaService} from '@cdk/services/especie-tarefa.service';
import {EspecieTarefa} from '@cdk/models/especie-tarefa.model';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'cdk-especie-tarefa-gridsearch',
    templateUrl: './cdk-especie-tarefa-gridsearch.component.html',
    styleUrls: ['./cdk-especie-tarefa-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkEspecieTarefaGridsearchComponent implements OnInit {

    @Input()
    pagination: Pagination;

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    especieTarefas: EspecieTarefa[];

    total = 0;

    loading: boolean;

    @Input()
    displayedColumns: string[] = ['select', 'id', 'nome', 'descricao', 'genero.nome', 'actions'];

    /**
     *
     * @param _changeDetectorRef
     * @param _especieTarefaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _especieTarefaService: EspecieTarefaService
    ) {
        this.loading = false;
        this.pagination = new Pagination();
    }

    ngOnInit(): void {
        this.load(this.pagination);
    }

    load(params): void {

        this.loading = true;

        this._especieTarefaService.query(
            JSON.stringify(params.filter),
            params.limit,
            params.offset,
            JSON.stringify(params.sort),
            JSON.stringify(params.populate))
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
                this.especieTarefas = response['entities'];
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
            populate: [
                ...this.pagination.populate,
                ...params.populate
            ]
        };
        this.load (params);
    }

    select(especieTarefa): void {
        this.selected.emit(especieTarefa);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
