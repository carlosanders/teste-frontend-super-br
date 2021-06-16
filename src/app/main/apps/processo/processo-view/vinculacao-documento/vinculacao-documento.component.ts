import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Juntada, Pagination, VinculacaoDocumento} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store';
import {filter} from "rxjs/operators";

@Component({
    selector: 'processo-view-vinculacao-documento',
    templateUrl: './vinculacao-documento.component.html',
    styleUrls: ['./vinculacao-documento.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoDocumentoComponent implements OnInit, OnDestroy {

    vinculacaoDocumento: VinculacaoDocumento;

    juntada$: Observable<Juntada>;
    juntada: Juntada;

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    modalidadeVinculacaoDocumentoPagination: Pagination;
    documentoVinculadoPagination: Pagination;

    routerState: any;

    displayedColumns = ['juntadaAtual.id', 'tipoDocumento.nome', 'tipoDocumento.especieDocumento.nome', 'componentesDigitais.extensao', 'actions'];

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.ProcessoViewVinculacaoDocumentoAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));

        this.modalidadeVinculacaoDocumentoPagination = new Pagination();
        this.documentoVinculadoPagination = new Pagination();
        this.documentoVinculadoPagination.populate = [
            'tipoDocumento',
            'tipoDocumento.especieDocumento',
            'componentesDigitais.extensao',
            'juntadaAtual',
        ];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.juntada$.pipe(
            filter(juntada => !!juntada)
        ).subscribe(
            (juntada) => {
                this.juntada = juntada;
                this.vinculacaoDocumento = new VinculacaoDocumento();
                this.vinculacaoDocumento.documento = this.juntada.documento;

                this.documentoVinculadoPagination.filter = {
                    'juntadaAtual':'isNotNull',
                    'id':'neq:' + this.juntada.documento.id,
                    'juntadaAtual.ativo':'eq:1',
                    'vinculacoesDocumentos.id':'isNull',
                    'vinculacaoDocumentoPrincipal.id':'isNull',
                    'juntadaAtual.volume.processo.id':'eq:' + this.juntada.volume.processo.id
                };
                this._changeDetectorRef.detectChanges();
            }
        );
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.replace(('vincular/' + this.routerState.params.juntadaHandle), '')]).then();
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

        const vinculacaoDocumento = new VinculacaoDocumento();

        Object.entries(values).forEach(
            ([key, value]) => {
                vinculacaoDocumento[key] = value;
            }
        );

        vinculacaoDocumento.documento = this.juntada.documento;

        this._store.dispatch(new fromStore.SaveVinculacaoDocumento(vinculacaoDocumento));

    }

}