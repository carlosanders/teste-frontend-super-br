import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';
import * as fromStore from './store';
import {Documento, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'documento-edit-dados-basicos',
    templateUrl: './documento-edit-dados-basicos.component.html',
    styleUrls: ['./documento-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditDadosBasicosComponent implements OnInit, OnDestroy {

    documento$: Observable<Documento>;
    documento: Documento;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    private _unsubscribeAll: Subject<any> = new Subject();
    logEntryPagination: Pagination;

    /**
     *
     * @param _store
     * @param _location
     * @param _componenteDigitalService
     * @param _ref
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditDadosBasicosAppState>,
        private _location: Location,
        private _componenteDigitalService: ComponenteDigitalService,
        private _ref: ChangeDetectorRef
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.logEntryPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.pipe(
            filter(documento => !!documento),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
            this.documento = documento;
            this.logEntryPagination.filter = {
                entity: 'SuppCore\\AdministrativoBackend\\Entity\\Documento',
                id: + this.documento.id
            };
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const documento = new Documento();

        Object.entries(values).forEach(
            ([key, value]) => {
                documento[key] = value;
            }
        );
        const populate = JSON.stringify([
            'componentesDigitais.assinaturas',
            'tarefaOrigem.usuarioResponsavel',
            'tarefaOrigem.vinculacoesEtiquetas',
            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
            'repositorio.modalidadeRepositorio',
            'documentoAvulsoRemessa.especieDocumentoAvulso',
            'documentoAvulsoRemessa.processo',
            'documentoAvulsoRemessa.processo.especieProcesso',
            'documentoAvulsoRemessa.processo.especieProcesso.generoProcesso',
            'documentoAvulsoRemessa.setorDestino',
            'documentoAvulsoRemessa.pessoaDestino',
            'documentoAvulsoRemessa.usuarioRemessa',
            'vinculacoesEtiquetas.etiqueta'
        ]);

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveDocumento({
            documento: documento,
            populate: populate,
            operacaoId: operacaoId
        }));
    }

}
