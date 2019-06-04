import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Interessado} from '@cdk/models/interessado.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'interessado-edit',
    templateUrl: './interessado-edit.component.html',
    styleUrls: ['./interessado-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class InteressadoEditComponent implements OnInit, OnDestroy {

    interessado$: Observable<Interessado>;
    interessado: Interessado;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.InteressadoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.interessado$ = this._store.pipe(select(fromStore.getInteressado));
        this.processo$ = this._store.pipe(select(getProcesso));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.interessado$.subscribe(
            interessado => this.interessado = interessado
        );

        if (!this.interessado) {
            this.interessado = new Interessado();
            this.interessado.processo = this.processo;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const interessado = new Interessado();

        Object.entries(values).forEach(
            ([key, value]) => {
                interessado[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveInteressado(interessado));

    }

}
