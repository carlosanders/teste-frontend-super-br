import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Assunto} from '@cdk/models/assunto.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'assunto-edit',
    templateUrl: './assunto-edit.component.html',
    styleUrls: ['./assunto-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
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
