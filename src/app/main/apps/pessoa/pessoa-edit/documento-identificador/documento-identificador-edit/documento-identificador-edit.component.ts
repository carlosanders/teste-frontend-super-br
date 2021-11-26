import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {DocumentoIdentificador, Pagination, Pessoa} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getPessoa} from '../../dados-pessoa-edit/store';
import {Back} from '../../../../../../store';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

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
    private _unsubscribeAll: Subject<any> = new Subject();

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
        this.pessoa$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(pessoa => !!pessoa)
        ).subscribe(pessoa => this.pessoa = pessoa);

        this.documentoIdentificador$.pipe(
            takeUntil(this._unsubscribeAll),
            filter(documentoIdentificador => !!documentoIdentificador)
        ).subscribe(documentoIdentificador => this.documentoIdentificador = documentoIdentificador);

        if (!this.documentoIdentificador) {
            this.documentoIdentificador = new DocumentoIdentificador();
            this.documentoIdentificador.pessoa = this.pessoa;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveDocumentoIdentificador({
            documentoIdentificador: documentoIdentificador,
            operacaoId: operacaoId
        }));
    }

    cancel(): void {
        this._store.dispatch(new Back());
    }

}
