import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Transicao} from '@cdk/models/transicao.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'transicao-edit',
    templateUrl: './transicao-edit.component.html',
    styleUrls: ['./transicao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TransicaoEditComponent implements OnInit, OnDestroy {

    transicao$: Observable<Transicao>;
    transicao: Transicao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    modalidadeTransicaoPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.TransicaoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.transicao$ = this._store.pipe(select(fromStore.getTransicao));
        this.processo$ = this._store.pipe(select(getProcesso));

        this.modalidadeTransicaoPagination = new Pagination();
        this.modalidadeTransicaoPagination.populate = ['parent'];
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

        this.transicao$.subscribe(
            transicao => this.transicao = transicao
        );

        if (!this.transicao) {
            this.transicao = new Transicao();
            this.transicao.processo = this.processo;
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

        const transicao = new Transicao();

        Object.entries(values).forEach(
            ([key, value]) => {
                transicao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveTransicao(transicao));

    }

}
