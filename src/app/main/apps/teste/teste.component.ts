import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Tarefa} from '@cdk/models/tarefa.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/teste/store';

@Component({
    selector: 'teste',
    templateUrl: './teste.component.html',
    styleUrls: ['./teste.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TesteComponent implements OnInit
{
    tarefas$: Observable<Tarefa[]>;
    loading$: Observable<boolean>;
    total$: Observable<number>;

    deletingIds$: Observable<number[]>;
    deletedIds$: Observable<number[]>;

    filter = {};

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _tarefasStore
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _tarefasStore: Store<fromStore.TesteAppState>,
    ) {

        this.tarefas$ = this._tarefasStore.pipe(select(fromStore.getTeste));
        this.total$ = this._tarefasStore.pipe(select(fromStore.getTotal));
        this.loading$ = this._tarefasStore.pipe(select(fromStore.getTesteIsLoading));

        this.deletingIds$ = this._tarefasStore.pipe(select(fromStore.getDeletingTesteIds));
        this.deletedIds$ = this._tarefasStore.pipe(select(fromStore.getDeletedTesteIds));

    }

    ngOnInit(): void {

        const params = {
            filter: this.filter,
            limit: 5,
            offset: 0,
            sort: {},
            populate: ['populateAll']
        };

        this.load(params);

    }

    load(params): void {
        params.filter = JSON.stringify(params.filter);
        params.sort = JSON.stringify(params.sort);
        params.populate = JSON.stringify(params.populate);
        this._tarefasStore.dispatch(new fromStore.GetTeste(params));
    }

    reload (params): void {
        params = {
            ...params,
            filter: {
                ...params.listFilter,
                ...this.filter
            },
            populate: ['populateAll']
        };
        this.load (params);
    }

    editTarefa(tarefaId: number): void {
        this._tarefasStore.dispatch(new fromStore.EditTeste(tarefaId));
    }

    createTarefa(): void {
        const tarefa = new Tarefa();
        this._tarefasStore.dispatch(new fromStore.CreateTeste(tarefa));
    }

    deleteTarefa(tarefaId: number): void {
        this._tarefasStore.dispatch(new fromStore.DeleteTeste(tarefaId));
    }

}
