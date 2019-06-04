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

import {TarefaService} from '@cdk/services/tarefa.service';
import {Tarefa} from '@cdk/models/tarefa.model';

@Component({
    selector: 'cdk-tarefa-gridsearch',
    templateUrl: './cdk-tarefa-gridsearch.component.html',
    styleUrls: ['./cdk-tarefa-gridsearch.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class CdkTarefaGridsearchComponent {

    @Input()
    filter = {};

    @Output()
    selected = new EventEmitter();

    @Output()
    cancel = new EventEmitter();

    tarefas: Tarefa[];

    total = 0;

    loading: boolean;

    /**
     *
     * @param _changeDetectorRef
     * @param _tarefaService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _tarefaService: TarefaService
    ) {
        this.loading = false;
    }

    load(params): void {

        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);

        this.loading = true;

        this._tarefaService.query(
            params.filter,
            params.limit,
            params.offset,
            params.sort,
            params.populate)
            .pipe(
                finalize(() => this.loading = false),
                catchError(() => of([]))
            ).subscribe(response => {
            this.tarefas = response['entities'];
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

    select(tarefa): void {
        this.selected.emit(tarefa);
    }

    doCancel(): void {
        this.cancel.emit();
    }

}
