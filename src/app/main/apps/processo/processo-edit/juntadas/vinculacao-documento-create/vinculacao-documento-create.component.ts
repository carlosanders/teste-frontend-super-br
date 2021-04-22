import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Juntada, VinculacaoDocumento} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../store';
import {Back} from '../../../../../../store';

@Component({
    selector: 'vinculacao-documento-create',
    templateUrl: './vinculacao-documento-create.component.html',
    styleUrls: ['./vinculacao-documento-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class VinculacaoDocumentoCreateComponent implements OnInit, OnDestroy {

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
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.VinculacaoDocumentoCreateAppState>,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.juntada$ = this._store.pipe(select(fromStore.getJuntada));

        this.modalidadeVinculacaoDocumentoPagination = new Pagination();
        this.documentoVinculadoPagination = new Pagination();
        this.documentoVinculadoPagination.populate = [
            'tipoDocumento',
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
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.juntada$.subscribe(
            juntada => {
                this.juntada = juntada;
                this.vinculacaoDocumento = new VinculacaoDocumento();
                this.vinculacaoDocumento.documento = this.juntada.documento;

                this.documentoVinculadoPagination.filter = {
                    'juntadaAtual':'isNotNull',
                    'id':'neq:' + this.juntada.documento.id,
                    'juntadaAtual.ativo':'eq:1',
                    'juntadaAtual.volume.processo.id':'eq:' + this.juntada.volume.processo.id
                };
            }
        );
    }

    doAbort(): void {
        this._store.dispatch(new Back());
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
