import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {RelacionamentoPessoal} from '@cdk/models/relacionamento-pessoal.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pessoa} from '@cdk/models/pessoa.model';
import {getPessoa} from '../../dados-pessoa-edit/store/selectors';
import {Pagination} from '@cdk/models/pagination';

@Component({
    selector: 'relacionamento-edit',
    templateUrl: './relacionamento-edit.component.html',
    styleUrls: ['./relacionamento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class RelacionamentoEditComponent implements OnInit, OnDestroy {

    relacionamento$: Observable<RelacionamentoPessoal>;
    relacionamento: RelacionamentoPessoal;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    relacionamentoPessoalPagination: Pagination;

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
        // this.relacionamentoPessoalPagination.populate = ['parent'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.pessoa$.subscribe(
            pessoa => this.pessoa = pessoa
        );

        this.relacionamento$.subscribe(
            relacionamento => this.relacionamento = relacionamento
        );

        if (!this.relacionamento) {
            this.relacionamento = new RelacionamentoPessoal();
            this.relacionamento.pessoa = this.pessoa;
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

        const relacionamento = new RelacionamentoPessoal();

        Object.entries(values).forEach(
            ([key, value]) => {
                relacionamento[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveRelacionamento(relacionamento));

    }

}
