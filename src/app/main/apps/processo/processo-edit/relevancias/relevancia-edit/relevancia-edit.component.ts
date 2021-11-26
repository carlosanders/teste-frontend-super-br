import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Processo, Relevancia} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'relevancia-edit',
    templateUrl: './relevancia-edit.component.html',
    styleUrls: ['./relevancia-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelevanciaEditComponent implements OnInit, OnDestroy {

    relevancia$: Observable<Relevancia>;
    relevancia: Relevancia;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    especieRelevanciaPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.RelevanciaEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.relevancia$ = this._store.pipe(select(fromStore.getRelevancia));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.especieRelevanciaPagination = new Pagination();
        this.especieRelevanciaPagination.populate = ['populateAll'];
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

        this.relevancia$.pipe(
            filter(relevancia => !!relevancia),
            takeUntil(this._unsubscribeAll)
        ).subscribe(relevancia => this.relevancia = relevancia);

        if (!this.relevancia) {
            this.relevancia = new Relevancia();
            this.relevancia.processo = this.processo;
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

        const relevancia = new Relevancia();

        Object.entries(values).forEach(
            ([key, value]) => {
                relevancia[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveRelevancia({
            relevancia: relevancia,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
