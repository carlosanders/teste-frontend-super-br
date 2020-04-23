import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Assunto} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models';
import {Back} from '../../../../../../store/actions';

@Component({
    selector: 'assunto-edit',
    templateUrl: './assunto-edit.component.html',
    styleUrls: ['./assunto-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AssuntoEditComponent implements OnInit, OnDestroy {

    assunto$: Observable<Assunto>;
    assunto: Assunto;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    assuntoAdministrativoPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.AssuntoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.assunto$ = this._store.pipe(select(fromStore.getAssunto));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.assuntoAdministrativoPagination = new Pagination();
        this.assuntoAdministrativoPagination.populate = ['parent'];
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

        this.assunto$.subscribe(
            assunto => this.assunto = assunto
        );

        if (!this.assunto) {
            this.assunto = new Assunto();
            this.assunto.processo = this.processo;
        }
    }

    doAbort(): void {
        this._store.dispatch(new Back());
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

        const assunto = new Assunto();

        Object.entries(values).forEach(
            ([key, value]) => {
                assunto[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveAssunto(assunto));

    }

}
