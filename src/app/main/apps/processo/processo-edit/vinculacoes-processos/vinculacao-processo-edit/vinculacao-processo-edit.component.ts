import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Processo, VinculacaoProcesso} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store/selectors';
import {Back} from '../../../../../../store/actions';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'vinculacao-processo-edit',
    templateUrl: './vinculacao-processo-edit.component.html',
    styleUrls: ['./vinculacao-processo-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoProcessoEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    vinculacaoProcesso$: Observable<VinculacaoProcesso>;
    vinculacaoProcesso: VinculacaoProcesso;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    processoVinculadoPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.VinculacaoProcessoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoProcesso$ = this._store.pipe(select(fromStore.getVinculacaoProcesso));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.processoVinculadoPagination = new Pagination();
        this.processoVinculadoPagination.populate = ['setorAtual', 'setorAtual.unidade'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(processo => !!processo)
        ).subscribe(
            (processo) => {
                this.processo = processo;
                this.processoVinculadoPagination.filter = {
                    'id':'neq:' + this.processo.id
                };
            }
        );

        this.vinculacaoProcesso$.subscribe(
            vinculacaoProcesso => this.vinculacaoProcesso = vinculacaoProcesso
        );

        if (!this.vinculacaoProcesso) {
            this.vinculacaoProcesso = new VinculacaoProcesso();
            this.vinculacaoProcesso.processo = this.processo;
        }
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

    submit(values): void {

        const vinculacaoProcesso = new VinculacaoProcesso();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoProcesso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveVinculacaoProcesso(vinculacaoProcesso));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
