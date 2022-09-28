import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Assinatura, Documento, Juntada, Processo, VinculacaoDocumento} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import * as AssinaturaStore from 'app/store';
import {getRouterState} from 'app/store/reducers';
import {getProcesso} from '../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';

@Component({
    selector: 'juntada-list',
    templateUrl: './juntada-list.component.html',
    styleUrls: ['./juntada-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class JuntadaListComponent implements OnInit, OnDestroy {

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    routerState: any;
    juntadas$: Observable<Juntada[]>;
    juntadasIds: number[] = [];
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    desentranhadoIds$: Observable<number[]>;
    copiandoIds$: Observable<any>;
    processo$: Observable<Processo>;
    processo: Processo;
    assinandoDocumentosId$: Observable<number[]>;
    removendoAssinaturaDocumentosId$: Observable<number[]>;
    private _unsubscribeAll: Subject<any> = new Subject();

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
        this.desentranhadoIds$ = this._store.pipe(select(fromStore.getDesentranhadoIds));
        this.copiandoIds$ = this._store.pipe(select(fromStore.getCopiandoIds));
        this.processo$ = this._store.pipe(select(getProcesso));
        this.assinandoDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosAssinandoIds));
        this.removendoAssinaturaDocumentosId$ = this._store.pipe(select(AssinaturaStore.getDocumentosRemovendoAssinaturaIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });

        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((processo) => {
            this.processo = processo;
        });

        this.juntadas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((juntadas) => {
            this.juntadasIds = [];
            if (juntadas) {
                const tmp = juntadas?.filter(juntada => juntada.ativo);

                tmp.forEach((juntada) => {
                    this.juntadasIds.push(juntada.id);
                });
            }
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
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
            sort: {
                ...this.pagination.sort,
                ...params.sort
            },
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
        this._router.navigate([this.routerState.url.replace('juntadas/listar', 'juntadas/desentranhar')]).then();
    }

    removerVisibilidades(): void {
        // Percorrer todas as juntadas selecionadas e, uma por uma, remover as visibilidades

    }

    copiar(juntadaId: number[]): void {
        this._store.dispatch(new fromStore.CopiarDocumentoJuntada(juntadaId));
    }

    assinar(result): void {
        if (result.certificadoDigital) {
            this._store.dispatch(new AssinaturaStore.AssinaDocumento([result.documento.id]));
        } else {
            result.documento.componentesDigitais.forEach((componenteDigital) => {
                const assinatura = new Assinatura();
                assinatura.componenteDigital = componenteDigital;
                assinatura.algoritmoHash = 'A1';
                assinatura.cadeiaCertificadoPEM = 'A1';
                assinatura.cadeiaCertificadoPkiPath = 'A1';
                assinatura.assinatura = 'A1';
                assinatura.plainPassword = result.plainPassword;

                const operacaoId = CdkUtils.makeId();
                this._store.dispatch(new AssinaturaStore.AssinaDocumentoEletronicamente({
                    assinatura: assinatura,
                    documento: result.documento,
                    operacaoId: operacaoId
                }));
            });
        }
    }

    editar(documento: Documento): void {
        const sidebar = 'editar/dados-basicos';

        this._router.navigate([
                this.routerState.url +
                '/documento/' + documento.id,
                {
                    outlets: {
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

    removeVinculacao(vinculacaoDocumento: VinculacaoDocumento): void {
        this._store.dispatch(new fromStore.RemoveVinculacaoDocumento(vinculacaoDocumento));
    }

    removerVinculacoes(juntada: Juntada): void {
        juntada.documento.vinculacoesDocumentos.forEach(vinculacao => this.removeVinculacao(vinculacao));
    }

    removerRestricoes(juntada: Juntada): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.RemoveRestricoesDocumento({
            documentoId: juntada.documento.id,
            operacaoId: operacaoId
        }));
    }

    adicionarVinculacao(juntadaId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'vincular/' + juntadaId)]).then();
    }
}
