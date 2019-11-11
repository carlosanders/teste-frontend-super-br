import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit, ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';
import * as fromStore from '../store';
import {Documento} from '@cdk/models/documento.model';
import {select, Store} from '@ngrx/store';
import {Location} from '@angular/common';
import {getMercureState, getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Repositorio} from '@cdk/models/repositorio.model';
import {filter, takeLast} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {Atividade} from '@cdk/models/atividade.model';
import * as moment from 'moment';
import {Tarefa} from '@cdk/models/tarefa.model';
import {getTarefa} from '../../tarefas/tarefa-detail/store/selectors';
import {Visibilidade} from '@cdk/models/visibilidade.model';
import {Pagination} from '@cdk/models/pagination';
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from '../../../auth/login/login.service';

@Component({
    selector: 'documento-edit',
    templateUrl: './documento-edit.component.html',
    styleUrls: ['./documento-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DocumentoEditComponent implements OnInit, OnDestroy {

    documento$: Observable<Documento>;
    documentosVinculados$: Observable<Documento[]>;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    atividadeIsSaving$: Observable<boolean>;
    atividadeErrors$: Observable<any>;

    repositorioIdLoadind$: Observable<number>;
    repositorioIdLoaded$: Observable<number>;

    componenteDigital$: Observable<ComponenteDigital>;

    repositorios$: Observable<Repositorio[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;

    selectedDocumentosVinculados$: Observable<Documento[]>;
    deletingDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId$: Observable<number[]>;
    assinandoDocumentosVinculadosId: number[] = [];
    javaWebStartOK = false;

    documentoPrincipal: Documento;

    documento: Documento;

    activeCard = 'atividade';

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    routerState: any;

    atividade: Atividade;

    visibilidades$: Observable<Visibilidade[]>;
    visibilidade$: Observable<Visibilidade>;
    visibilidade: Visibilidade;
    deletingVisibilidadeIds$: Observable<any>;
    deletedVisibilidadeIds$: Observable<any>;

    unidadePagination: Pagination;
    setorPagination: Pagination;
    usuarioPagination: Pagination;

    _profile: Colaborador;

    formAcessoRestrito = false;
    loadingAcessoRestrito = false;

    juntadaRoute = false;

    /**
     * @param _store
     * @param _location
     * @param _router
     * @param _repositorioService
     * @param _sanitizer
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.DocumentoAppState>,
        private _location: Location,
        private _router: Router,
        private _repositorioService: RepositorioService,
        private _sanitizer: DomSanitizer,
        private _loginService: LoginService
    ) {
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));
        this.componenteDigital$ = this._store.pipe(select(fromStore.getComponenteDigital));
        this.documentosVinculados$ = this._store.pipe(select(fromStore.getDocumentosVinculados));
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.selectedDocumentosVinculados$ = this._store.pipe(select(fromStore.getSelectedDocumentosVinculados));
        this.deletingDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosVinculadosId));
        this.assinandoDocumentosVinculadosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosVinculadosId));

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.tarefa$ = this._store.pipe(select(getTarefa));
            this.atividadeIsSaving$ = this._store.pipe(select(fromStore.getAtividadeIsSaving));
            this.atividadeErrors$ = this._store.pipe(select(fromStore.getAtividadeErrors));
        } else {
            this.juntadaRoute = true;
        }

        this.visibilidades$ = this._store.pipe(select(fromStore.getVisibilidadeList));
        this.visibilidade$ = this._store.pipe(select(fromStore.getVisibilidade));
        this.deletingVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletingVisibilidadeIds));
        this.deletedVisibilidadeIds$ = this._store.pipe(select(fromStore.getDeletedVisibilidadeIds));

        this._profile = _loginService.getUserProfile();

        this.unidadePagination = new Pagination();
        this.unidadePagination.filter = {parent: 'isNull'};

        this.setorPagination = new Pagination();
        this.setorPagination.populate = ['unidade', 'parent'];
        this.setorPagination.filter = {parent: 'isNotNull'};

        this.usuarioPagination = new Pagination();
        this.usuarioPagination.filter = {id: `neq:${this._profile.usuario.id}`};

        this.repositorios$ = this._store.pipe(select(fromStore.getRepositorios));
        this.pagination$ = this._store.pipe(select(fromStore.getRepositoriosPagination));
        this.loading$ = this._store.pipe(select(fromStore.getRepositoriosIsLoading));

        this.repositorioIdLoadind$ = this._store.pipe(select(fromStore.getComponenteDigitalLoading));
        this.repositorioIdLoaded$ = this._store.pipe(select(fromStore.getComponenteDigitalLoaded));

        this._store
            .pipe(
                select(getMercureState),
            ).subscribe(message => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoVinculadoSuccess(message.content.documentoId));
                        break;
                }
            }
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        if (this._router.url.indexOf('/juntadas') === -1) {
            this.atividade = new Atividade();
            this.atividade.encerraTarefa = true;
            this.atividade.dataHoraConclusao = moment();

            this.tarefa$.subscribe(tarefa => {
                this.tarefa = tarefa;
                this.atividade.usuario = tarefa.usuarioResponsavel;
                this.atividade.setor = tarefa.setorResponsavel;
            });
        }

        this.visibilidade$.subscribe(
            visibilidade => this.visibilidade = visibilidade
        );

        if (!this.visibilidade) {
            this.visibilidade = new Visibilidade();
        }

        this.visibilidades$.subscribe(
            () => {
                this.loadingAcessoRestrito = false;
            }
        );

        this.assinandoDocumentosVinculadosId$.subscribe(assinandoDocumentosVinculadosId => {
            if (assinandoDocumentosVinculadosId.length > 0) {
                setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosVinculadosId.length > 0)) {
                        assinandoDocumentosVinculadosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoVinculadoFailed(documentoId))
                        );
                    }
                }, 30000);
            }
            this.assinandoDocumentosVinculadosId = assinandoDocumentosVinculadosId;
        });

        this.documento$.pipe(
            filter(documento => !this.documento || (documento && (documento.id !== this.documento.id)))
        ).subscribe(documento => {
            this.documento = documento;
            if (documento && documento.vinculacaoDocumentoPrincipal) {
                this.documentoPrincipal = documento.vinculacaoDocumentoPrincipal.documento;
                this.activeCard = 'form';
            } else {
                this.activeCard = 'atividade';
            }
        });

        this._store
            .pipe(
                select(getRouterState)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this.pagination$.subscribe(pagination => {
            if (this.pagination && pagination && pagination.ckeditorFilter !== this.pagination.ckeditorFilter && this.activeCard === 'inteligencia') {
                this.pagination = pagination;
                this.reload(this.pagination);
            } else {
                this.pagination = pagination;
            }
        });

        this.componenteDigital$.subscribe(componenteDigital => {
            if (componenteDigital && componenteDigital.conteudo) {
                const html = this.b64DecodeUnicode(componenteDigital.conteudo.split(';base64,')[1]);
                this._store.dispatch(new fromStore.SetRepositorioComponenteDigital(html));
            }
        });

        if (this.juntadaRoute) {
            this.activeCard = 'form';
        }
    }

    b64DecodeUnicode(str): any {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        // tslint:disable-next-line:only-arrow-functions
        return decodeURIComponent(atob(str).split('').map(function(c): any {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    upload(): void {
        this.cdkUpload.upload();
    }

    anexarCopia(): void {
        this._router.navigate([
                this.routerState.url.split(this.routerState.params.documentoHandle + '/editar')[0] +
                this.routerState.params.documentoHandle + '/editar/anexar-copia/' + this.documento.processoOrigem.id + '/visualizar'
            ]
        ).then();
    }

    aprovar(): void {
        this._store.dispatch(new fromStore.ApproveComponenteDigital({
            documentoOrigem:this.documento
        }));

    }

    changedSelectedDocumentosVinculadosId(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentosVinculados(selectedIds));
    }

    doDeleteDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumentoVinculado(documentoId));
    }

    doAssinaturaDocumentoVinculado(documentoId): void {
        this._store.dispatch(new fromStore.AssinaDocumentoVinculado(documentoId));
    }

    onClickedDocumentoVinculado(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumentoVinculado(documento));
    }

    onCompleteDocumentoVinculado(): void {
        this._store.dispatch(new fromStore.GetDocumentosVinculados());
    }

    back(): void {
        this._location.back();
    }

    showAtividade(): void {
        this.activeCard = 'atividade';
    }

    showAnexos(): void {
        this.activeCard = 'anexos';
    }

    showInteligencia(): void {
        this.activeCard = 'inteligencia';
    }

    showAcessoRestrito(): void {
        this.activeCard = 'acesso-restrito';
    }

    showForm(): void {
        this.activeCard = 'form';
    }

    showFormAcessoRestrito(): void {
        this.formAcessoRestrito = !this.formAcessoRestrito;
    }

    submitVisibilidade(visibilidade): void {
        this.loadingAcessoRestrito = true;
        this._store.dispatch(new fromStore.SaveVisibilidadeDocumento({documentoId: this.documento.id, visibilidade: visibilidade}));
        this.formAcessoRestrito = false;
   }

    submit(values): void {

        const documento = new Documento();

        Object.entries(values).forEach(
            ([key, value]) => {
                documento[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumento(documento));
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetRepositorios({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...this.pagination.ckeditorFilter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: [
                ...this.pagination.populate
            ]
        }));
    }

    doDownload(repositorio: Repositorio): void {
        this._store.dispatch(new fromStore.DownloadComponenteDigital({
            componenteDigitalId: repositorio.documento.componentesDigitais[0].id,
            repositorioId: repositorio.id
        }));
    }

    submitAtividade(values): void {

        delete values.unidadeAprovacao;

        const atividade = new Atividade();

        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        atividade.tarefa = this.tarefa;
        atividade.documentos = [this.documento];

        this._store.dispatch(new fromStore.SaveAtividade(atividade));
    }

    deleteVisibilidade(visibilidadeId: number): void {
        this._store.dispatch(new fromStore.DeleteVisibilidade({documentoId: this.routerState.params.documentoHandle, visibilidadeId: visibilidadeId}));
    }

}

