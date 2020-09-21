import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {DocumentoIdentificador} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pessoa} from '@cdk/models';
import {getPessoa} from '../../dados-pessoa-edit/store/selectors';
import {Pagination} from '@cdk/models';
import {Back} from "../../../../../../store/actions";

@Component({
    selector: 'documento-identificador-edit',
    templateUrl: './documento-identificador-edit.component.html',
    styleUrls: ['./documento-identificador-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoIdentificadorEditComponent implements OnInit, OnDestroy {

    documentoIdentificador$: Observable<DocumentoIdentificador>;
    documentoIdentificador: DocumentoIdentificador;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    pessoa$: Observable<Pessoa>;
    pessoa: Pessoa;

    documentoIdentificadorPagination: Pagination;

    /**
     * @param _store
     */
    constructor(
        private _store: Store<fromStore.DocumentoIdentificadorEditAppState>
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.documentoIdentificador$ = this._store.pipe(select(fromStore.getDocumentoIdentificador));
        this.pessoa$ = this._store.pipe(select(getPessoa));

        this.documentoIdentificadorPagination = new Pagination();

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

        this.documentoIdentificador$.subscribe(
            documentoIdentificador => this.documentoIdentificador = documentoIdentificador
        );

        if (!this.documentoIdentificador) {
            this.documentoIdentificador = new DocumentoIdentificador();
            this.documentoIdentificador.pessoa = this.pessoa;
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

        const documentoIdentificador = new DocumentoIdentificador();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoIdentificador[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoIdentificador(documentoIdentificador));

    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

}
