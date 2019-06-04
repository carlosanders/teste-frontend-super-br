import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    Output,
    ViewEncapsulation, EventEmitter
} from '@angular/core';
import {of} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';

import {catchError, finalize} from 'rxjs/operators';

import {GeneroTarefaService} from '@cdk/services/genero-tarefa.service';
import {GeneroTarefa} from '@cdk/models/genero-tarefa.model';

@Component({
    selector: 'cdk-genero-tarefa-gridsearch',
    templateUrl: './cdk-genero-tarefa-gridsearch.component.html',
    styleUrls: ['./cdk-genero-tarefa-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkGeneroTarefaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    generoTarefas: GeneroTarefa[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _generoTarefaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _generoTarefaService: GeneroTarefaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._generoTarefaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.generoTarefas = response['entities'];
            this.total = response['total'];
            this._changeDetectorRef.markForCheck();
        });
    }

    reload(params): void {
        params = {
            ...params,
            filter: {
                ...params.gridFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load(params);
    }

    select(generoTarefa): void {
        this.selected.emit(generoTarefa);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
