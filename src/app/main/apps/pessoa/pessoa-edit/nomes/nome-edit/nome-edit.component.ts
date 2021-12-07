import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Nome, Pagination, Pessoa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getPessoa} from '../../dados-pessoa-edit/store';
import {filter, takeUntil} from 'rxjs/operators';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'nome-edit',
    templateUrl: './nome-edit.component.html',
    styleUrls: ['./nome-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class NomeEditComponent implements OnInit, OnDestroy {

    nome$: Observable<Nome>;
    nome: Nome;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    pessoaPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.NomeEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.nome$ = this._store.pipe(select(fromStore.getNome));
        this.pessoa$ = this._store.pipe(select(getPessoa));

        this.pessoaPagination = new Pagination();
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

        this.nome$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(nome => !!nome)
        ).subscribe(nome => this.nome = nome);

        if (!this.nome) {
            this.nome = new Nome();
            this.nome.pessoa = this.pessoa;
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

        const nome = new Nome();

        Object.entries(values).forEach(
            ([key, value]) => {
                nome[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveNome({
            nome: nome,
            operacaoId: operacaoId
        }));

    }

    cancel(): void {
        this._store.dispatch(new Back());
    }
}
