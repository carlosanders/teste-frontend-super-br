import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Tramitacao} from '@cdk/models/tramitacao.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models/processo.model';
import {getProcesso} from '../../../store/selectors';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'tramitacao-edit',
    templateUrl: './tramitacao-edit.component.html',
    styleUrls: ['./tramitacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class TramitacaoEditComponent implements OnInit, OnDestroy {

    tramitacao$: Observable<Tramitacao>;
    tramitacao: Tramitacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.TramitacaoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tramitacao$ = this._store.pipe(select(fromStore.getTramitacao));
        this.processo$ = this._store.pipe(select(getProcesso));
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

        this.tramitacao$.subscribe(
            tramitacao => this.tramitacao = tramitacao
        );

        if (!this.tramitacao) {
            this.tramitacao = new Tramitacao();
            this.tramitacao.processo = this.processo;
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

        const tramitacao = new Tramitacao();

        Object.entries(values).forEach(
            ([key, value]) => {
                tramitacao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveTramitacao(tramitacao));

    }

}
