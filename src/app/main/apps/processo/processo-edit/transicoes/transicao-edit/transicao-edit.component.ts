import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Processo, Transicao} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'transicao-edit',
    templateUrl: './transicao-edit.component.html',
    styleUrls: ['./transicao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TransicaoEditComponent implements OnInit, OnDestroy {

    transicao$: Observable<Transicao>;
    transicao: Transicao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    modalidadeTransicaoPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.TransicaoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.transicao$ = this._store.pipe(select(fromStore.getTransicao));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.modalidadeTransicaoPagination = new Pagination();
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

        this.transicao$.pipe(
            filter(transicao => !!transicao),
            takeUntil(this._unsubscribeAll)
        ).subscribe(transicao => this.transicao = transicao);

        if (!this.transicao) {
            this.transicao = new Transicao();
            this.transicao.processo = this.processo;
        }
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

        const transicao = new Transicao();

        Object.entries(values).forEach(
            ([key, value]) => {
                transicao[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTransicao({
            transicao: transicao,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
