import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Relevancia} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models';
import {Back} from "../../../../../../store/actions";

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
        this.processo$.subscribe(
            processo => this.processo = processo
        );

        this.relevancia$.subscribe(
            relevancia => this.relevancia = relevancia
        );

        if (!this.relevancia) {
            this.relevancia = new Relevancia();
            this.relevancia.processo = this.processo;
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

        const relevancia = new Relevancia();

        Object.entries(values).forEach(
            ([key, value]) => {
                relevancia[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveRelevancia(relevancia));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
