import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable, Subject} from 'rxjs';

import {Pessoa} from '@cdk/models/pessoa.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {takeUntil} from 'rxjs/operators';

@Component({
    selector: 'dados-pessoa-edit',
    templateUrl: './dados-pessoa-edit.component.html',
    styleUrls: ['./dados-pessoa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DadosPessoaEditComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DadosPessoaEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.pessoa$ = this._store.pipe(select(fromStore.getPessoa));
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
        ).subscribe(
            pessoa => this.pessoa = pessoa
        );

        if (!this.pessoa) {
            this.pessoa = new Pessoa();
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

        const pessoa = new Pessoa();

        Object.entries(values).forEach(
            ([key, value]) => {
                pessoa[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SavePessoa(pessoa));

    }

}
