import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Tarefa} from '@cdk/models/tarefa.model';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';

import {filter, takeUntil} from 'rxjs/operators';
import * as fromStore from 'app/main/apps/teste/store';
import {SaveTeste} from 'app/main/apps/teste/store';

@Component({
    selector: 'teste-edit',
    templateUrl: './teste-edit.component.html',
    styleUrls: ['./teste-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TesteEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefa: Tarefa;
    currentTarefa$: Observable<any>;

    /**
     * @param _tarefasStore
     * @param _location
     */
    constructor(
        private _tarefasStore: Store<fromStore.TesteAppState>,
        private _location: Location
    ) {
        this.currentTarefa$ = this._tarefasStore.pipe(select(fromStore.getCurrentTeste));

        this.currentTarefa$.pipe(
            filter(currentTarefa => !!currentTarefa && !!currentTarefa.teste),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            currentTarefa => {
                const tarefa = new Tarefa();
                Object.entries(currentTarefa.teste).forEach(
                    ([key, value]) => {
                        tarefa[key] = value;
                    }
                );
                this.tarefa = tarefa;
            }
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    back(): void {
        this._location.back();
    }

    submit(values): void {

        Object.entries(values).forEach(
            ([key, value]) => {
                this.tarefa[key] = value;
            }
        );

        this._tarefasStore.dispatch(new SaveTeste(this.tarefa));

    }

}
