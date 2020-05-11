import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Pagination, Sigilo} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Back} from "../../../../../../store/actions";

@Component({
    selector: 'sigilo-edit',
    templateUrl: './sigilo-edit.component.html',
    styleUrls: ['./sigilo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class SigiloEditComponent implements OnInit, OnDestroy {

    sigilo$: Observable<Sigilo>;
    sigilo: Sigilo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    logEntryPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.SigiloEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.sigilo$ = this._store.pipe(select(fromStore.getSigilo));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.logEntryPagination = new Pagination();
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

        this.sigilo$.subscribe(
            sigilo => this.sigilo = sigilo
        );


        if (!this.sigilo) {
            this.sigilo = new Sigilo();
            this.sigilo.processo = this.processo;
        }

        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Sigilo', id: this.sigilo.id};
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

        const sigilo = new Sigilo();

        Object.entries(values).forEach(
            ([key, value]) => {
                sigilo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveSigilo(sigilo));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
