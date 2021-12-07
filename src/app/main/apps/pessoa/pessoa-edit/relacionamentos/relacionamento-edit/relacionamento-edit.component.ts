import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Pessoa, RelacionamentoPessoal} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getPessoa} from '../../dados-pessoa-edit/store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'relacionamento-edit',
    templateUrl: './relacionamento-edit.component.html',
    styleUrls: ['./relacionamento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RelacionamentoEditComponent implements OnInit, OnDestroy {

    relacionamento$: Observable<RelacionamentoPessoal>;
    relacionamento: RelacionamentoPessoal;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    relacionamentoPessoalPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.RelacionamentoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.relacionamento$ = this._store.pipe(select(fromStore.getRelacionamento));
        this.pessoa$ = this._store.pipe(select(getPessoa));

        this.relacionamentoPessoalPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.pessoa$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(pessoa => this.pessoa = pessoa);

        this.relacionamento$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(relacionamento => !!relacionamento)
        ).subscribe(relacionamento => this.relacionamento = relacionamento);

        if (!this.relacionamento) {
            this.relacionamento = new RelacionamentoPessoal();
            this.relacionamento.pessoa = this.pessoa;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const relacionamento = new RelacionamentoPessoal();

        Object.entries(values).forEach(
            ([key, value]) => {
                relacionamento[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveRelacionamento({
            relacionamento: relacionamento,
            operacaoId: operacaoId
        }));
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

}
