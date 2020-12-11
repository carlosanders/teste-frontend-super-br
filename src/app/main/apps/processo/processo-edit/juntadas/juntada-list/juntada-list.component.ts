import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Assinatura, Documento, Juntada, Processo} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {getProcesso} from '../../../store/selectors';

@Component({
    selector: 'juntada-list',
    templateUrl: './juntada-list.component.html',
    styleUrls: ['./juntada-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class JuntadaListComponent implements OnInit {

    routerState: any;
    juntadas$: Observable<Juntada[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    desentranhandoIds$: Observable<any>;
    copiandoIds$: Observable<any>;
    processo$: Observable<Processo>;
    processo: Processo;
    assinandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _activatedRoute
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.JuntadaListAppState>,
        private _activatedRoute: ActivatedRoute
    ) {
        this.juntadas$ = this._store.pipe(select(fromStore.getJuntadaList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.desentranhandoIds$ = this._store.pipe(select(fromStore.getDesentranhandoIds));
        this.copiandoIds$ = this._store.pipe(select(fromStore.getCopiandoIds));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(fromStore.getRemovendoAssinaturaDocumentosId));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });

        this.processo$.subscribe(processo => {
            this.processo = processo;
        });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate
        }));
    }

    excluded(params): void {
        this._store.dispatch(new fromStore.GetJuntadas({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: params.context
        }));
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    onComplete(): void {
        this._store.dispatch(new fromStore.GetJuntadas(this.pagination));
    }

    desentranhar(): void {
        this.juntadas$.subscribe(juntadas => {
            this._store.dispatch(new fromStore.DesentranharJuntada(juntadas));
        });
    }

    copiar(juntadaId: number[]): void {
        this._store.dispatch(new fromStore.CopiarDocumentoJuntada(juntadaId));
    }

    assinar(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new fromStore.AssinaDocumento(result.documento.id));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';

                this._store.dispatch(new fromStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    password: result.password
                }));
            });
        }
    }

    editar(documento: Documento): void {
        let primary: string;
        primary = 'componente-digital/';
        if (documento.componentesDigitais[0]) {
            primary += documento.componentesDigitais[0].id;
        } else {
            primary += '0';
        }
        const sidebar = 'editar/dados-basicos';

        this._router.navigate([
                this.routerState.url +
                '/documento/' + documento.id,
                {
                    outlets: {
                        primary: primary,
                        sidebar: sidebar
                    }
                }],
            {
                relativeTo: this._activatedRoute.parent
            }).then();
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    removeVinculacao(vinculacaoDocumentoId: number): void {
        this._store.dispatch(new fromStore.RemoveVinculacaoDocumento(vinculacaoDocumentoId));
    }

    removerVinculacoes(juntada: Juntada): void {
        juntada.documento.vinculacoesDocumentos.forEach(vinculacao => this.removeVinculacao(vinculacao.id));
    }

    adicionarVinculacao(juntadaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'vincular/' + juntadaId)]).then();
    }

    removeAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.RemoveAssinaturaDocumento(documentoId));
    }
}
