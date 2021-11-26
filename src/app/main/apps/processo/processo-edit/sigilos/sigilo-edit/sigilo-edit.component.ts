import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Processo, Sigilo} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

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
    private _unsubscribeAll: Subject<any> = new Subject<any>();

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
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => this.processo = processo);

        this.sigilo$.pipe(
            filter(sigilo => !!sigilo),
            takeUntil(this._unsubscribeAll)
        ).subscribe(sigilo => this.sigilo = sigilo);

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
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
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

        if (!sigilo.tipoSigilo.leiAcessoInformacao) {
            sigilo.modalidadeCategoriaSigilo = null;
        }

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveSigilo({
            sigilo: sigilo,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
