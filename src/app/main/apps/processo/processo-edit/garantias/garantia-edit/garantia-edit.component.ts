import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Garantia} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models';
import {Back} from '../../../../../../store/actions';

@Component({
    selector: 'garantia-edit',
    templateUrl: './garantia-edit.component.html',
    styleUrls: ['./garantia-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class GarantiaEditComponent implements OnInit, OnDestroy {

    garantia$: Observable<Garantia>;
    garantia: Garantia;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    modalidadeGarantiaPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.GarantiaEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.garantia$ = this._store.pipe(select(fromStore.getGarantia));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.modalidadeGarantiaPagination = new Pagination();
        // this.modalidadeGarantiaPagination.populate = ['parent'];
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

        this.garantia$.subscribe(
            garantia => this.garantia = garantia
        );

        if (!this.garantia) {
            this.garantia = new Garantia();
            this.garantia.processo = this.processo;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        const garantia = new Garantia();

        Object.entries(values).forEach(
            ([key, value]) => {
                garantia[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveGarantia(garantia));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
