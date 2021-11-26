import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Endereco, Pagination, Pessoa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getPessoa} from '../../dados-pessoa-edit/store';
import {filter, takeUntil} from 'rxjs/operators';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';

@Component({
    selector: 'endereco-edit',
    templateUrl: './endereco-edit.component.html',
    styleUrls: ['./endereco-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class EnderecoEditComponent implements OnInit, OnDestroy {

    endereco$: Observable<Endereco>;
    endereco: Endereco;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    enderecoAdministrativoPagination: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.EnderecoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.endereco$ = this._store.pipe(select(fromStore.getEndereco));
        this.pessoa$ = this._store.pipe(select(getPessoa));

        this.enderecoAdministrativoPagination = new Pagination();
        // this.enderecoAdministrativoPagination.populate = ['parent'];
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

        this.endereco$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(endereco => !!endereco)
        ).subscribe(endereco => this.endereco = endereco);

        if (!this.endereco) {
            this.endereco = new Endereco();
            this.endereco.pessoa = this.pessoa;
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

        const endereco = new Endereco();

        Object.entries(values).forEach(
            ([key, value]) => {
                endereco[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveEndereco({
            endereco: endereco,
            operacaoId: operacaoId
        }));
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

}
