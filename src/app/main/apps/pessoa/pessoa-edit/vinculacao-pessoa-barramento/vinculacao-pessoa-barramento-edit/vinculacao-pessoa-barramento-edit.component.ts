import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pessoa} from '@cdk/models';
import {Pagination} from '@cdk/models';
import {VinculacaoPessoaBarramento} from "@cdk/models/vinculacao-pessoa-barramento";
import {Back} from "../../../../../../store";
import {getPessoa} from "../../dados-pessoa-edit/store";

@Component({
    selector: 'vinculacaoPessoaBarramento-edit',
    templateUrl: './vinculacao-pessoa-barramento-edit.component.html',
    styleUrls: ['./vinculacao-pessoa-barramento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoPessoaBarramentoEditComponent implements OnInit, OnDestroy {

    vinculacaoPessoaBarramento$: Observable<VinculacaoPessoaBarramento>;
    vinculacaoPessoaBarramento: VinculacaoPessoaBarramento;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    vinculacaoPessoaBarramentoPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.VinculacaoPessoaBarramentoEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.vinculacaoPessoaBarramento$ = this._store.pipe(select(fromStore.getVinculacaoPessoaBarramento));
        this.pessoa$ = this._store.pipe(select(getPessoa));

        this.vinculacaoPessoaBarramentoPagination = new Pagination();
        // this.vinculacaoPessoaBarramentoPagination.populate = ['parent'];
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

        this.vinculacaoPessoaBarramento$.subscribe(
            vinculacaoPessoaBarramento => this.vinculacaoPessoaBarramento = vinculacaoPessoaBarramento
        );

        if (!this.vinculacaoPessoaBarramento) {
            this.vinculacaoPessoaBarramento = new VinculacaoPessoaBarramento();
            this.vinculacaoPessoaBarramento.pessoa = this.pessoa;
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

        const vinculacaoPessoaBarramento = new VinculacaoPessoaBarramento();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoPessoaBarramento[key] = value;
            }
        );

        vinculacaoPessoaBarramento.nomeEstrutura = vinculacaoPessoaBarramento.nomeEstrutura['nome'];
        vinculacaoPessoaBarramento.nomeRepositorio = vinculacaoPessoaBarramento.nomeRepositorio['nome'];
        vinculacaoPessoaBarramento.pessoa = this.pessoa;

        this._store.dispatch(new fromStore.SaveVinculacaoPessoaBarramento(vinculacaoPessoaBarramento));

    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

}
