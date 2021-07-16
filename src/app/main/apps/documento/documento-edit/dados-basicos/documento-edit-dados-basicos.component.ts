import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';
import * as fromStore from './store';
import {Documento} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {filter} from "rxjs/operators";
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'documento-edit-dados-basicos',
    templateUrl: './documento-edit-dados-basicos.component.html',
    styleUrls: ['./documento-edit-dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditDadosBasicosComponent implements OnInit, OnDestroy, AfterViewInit {

    documento$: Observable<Documento>;
    documento: Documento;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.documento$.pipe(
            filter(documento => !!documento)
        ).subscribe(documento => this.documento = documento);
    }

    ngAfterViewInit(): void {
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
        const documento = new Documento();

        Object.entries(values).forEach(
            ([key, value]) => {
                documento[key] = value;
            }
        );
        const populate = JSON.stringify([
            'populateAll',
            'componentesDigitais.assinaturas',
            'componentesDigitais.modelo',
            'modelo.template',
            'modelo.modalidadeModelo',
            'tarefaOrigem.usuarioResponsavel',
            'tarefaOrigem.vinculacoesEtiquetas',
            'tarefaOrigem.vinculacoesEtiquetas.etiqueta',
            'repositorio.modalidadeRepositorio',
            'documentoAvulsoRemessa.especieDocumentoAvulso',
            'documentoAvulsoRemessa.processo',
            'documentoAvulsoRemessa.processo.especieProcesso',
            'documentoAvulsoRemessa.processo.especieProcesso.generoProcesso',
            'documentoAvulsoRemessa.modelo',
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
