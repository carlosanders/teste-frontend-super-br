import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Atividade, Pagination} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';

import * as fromStore from 'app/main/apps/tarefas/atividade-create-bloco/store';
import {LoginService} from 'app/main/auth/login/login.service';
import {Tarefa} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {Documento} from '@cdk/models';
import {getRouterState, getMercureState, getOperacoesState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Colaborador} from '@cdk/models';
import {UpdateData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Back} from '../../../../store/actions';
import {getSelectedTarefas} from '../store/selectors';

@Component({
    selector: 'atividade-create-bloco',
    templateUrl: './atividade-create-bloco.component.html',
    styleUrls: ['./atividade-create-bloco.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AtividadeCreateBlocoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    tarefas$: Observable<Tarefa[]>;
    tarefas: Tarefa[];

    operacoes: any[] = [];

    atividade: Atividade;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    private _profile: Colaborador;

    routerState: any;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    oficios: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedOficios: Documento[] = [];
    deletingDocumentosId$: Observable<number[]>;
    assinandoDocumentosId$: Observable<number[]>;
    assinandoDocumentosId: number[] = [];
    convertendoDocumentosId$: Observable<number[]>;
    javaWebStartOK = false;

    @ViewChild('ckdUpload', {static: false})
    cdkUpload;

    especieAtividadePagination: Pagination;

    assinaturaInterval = null;

        /**
     *
     * @param _store
     * @param _loginService
     * @param _router
     * @param _changeDetectorRef
     */
    constructor(
        private _store: Store<fromStore.AtividadeCreateBlocoAppState>,
        public _loginService: LoginService,
        private _router: Router,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.tarefas$ = this._store.pipe(select(getSelectedTarefas));

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll),
        ).subscribe((tarefas) => {
            this.tarefas = tarefas;
        });

        this._store
            .pipe(
                select(getOperacoesState),
                takeUntil(this._unsubscribeAll),
                filter(op => !!op && !!op.content && op.type === 'atividade')
            )
            .subscribe(
                operacao => {
                    this.operacoes.push(operacao);
                    this._changeDetectorRef.markForCheck();
                }
            );

        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this._profile = _loginService.getUserProfile().colaborador;

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.deletingDocumentosId$ = this._store.pipe(select(fromStore.getDeletingDocumentosId));
        this.assinandoDocumentosId$ = this._store.pipe(select(fromStore.getAssinandoDocumentosId));

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.operacoes = [];
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();

        this.tarefas$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefas => {
            this.tarefas = tarefas;
            this.atividade.usuario = tarefas[0].usuarioResponsavel;
            this.atividade.setor = tarefas[0].setorResponsavel;

            if (tarefas[0].especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
            } else {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + tarefas[0].especieTarefa.generoTarefa.nome.toUpperCase()};
            }
        });

        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll)
        ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
            }
        });

        this._store
            .pipe(
                select(getMercureState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(message => {
            if (message && message.type === 'assinatura') {
                switch (message.content.action) {
                    case 'assinatura_iniciada':
                        this.javaWebStartOK = true;
                        break;
                    case 'assinatura_cancelada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_erro':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoFailed(message.content.documentoId));
                        break;
                    case 'assinatura_finalizada':
                        this.javaWebStartOK = false;
                        this._store.dispatch(new fromStore.AssinaDocumentoSuccess(message.content.documentoId));
                        this._store.dispatch(new UpdateData<Documento>({id: message.content.documentoId, schema: documentoSchema, changes: {assinado: true}}));
                        break;
                }
            }
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe(selectedDocumentos => {
            this.selectedMinutas = selectedDocumentos.filter(documento => documento.minuta && !documento.documentoAvulsoRemessa);
            this.selectedOficios = selectedDocumentos.filter(documento => documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            documentos => {
                this.minutas = documentos.filter(documento => (!documento.documentoAvulsoRemessa && !documento.juntadaAtual));
                this.oficios = documentos.filter(documento => documento.documentoAvulsoRemessa);
                this._changeDetectorRef.markForCheck();
            }
        );

        this.assinandoDocumentosId$.subscribe(assinandoDocumentosId => {
            if (assinandoDocumentosId.length > 0) {
                this.assinaturaInterval = setInterval(() => {
                    // monitoramento do java
                    if (!this.javaWebStartOK && (assinandoDocumentosId.length > 0)) {
                        assinandoDocumentosId.forEach(
                            documentoId => this._store.dispatch(new fromStore.AssinaDocumentoFailed(documentoId))
                        );
                    }
                }, 30000);
            } else {
                clearInterval(this.assinaturaInterval);
            }
            this.assinandoDocumentosId = assinandoDocumentosId;
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadDocumentos());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {

        delete values.unidadeAprovacao;

        this.operacoes = [];

        this.tarefas.forEach(tarefa => {
            const atividade = new Atividade();

            Object.entries(values).forEach(
                ([key, value]) => {
                    atividade[key] = value;
                }
            );

            atividade.tarefa = tarefa;
            atividade.usuario = tarefa.usuarioResponsavel;
            atividade.setor = tarefa.setorResponsavel;
            atividade.documentos = this.minutas.filter((minuta) => minuta.tarefaOrigem.id === tarefa.id);

            this._store.dispatch(new fromStore.SaveAtividade(atividade));
        });
    }

    upload(): void {
        this.cdkUpload.upload();
    }

    modelo(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/modelo']).then();
    }

    oficio(): void {
        this._router.navigate([this.routerState.url.split('/atividades/criar')[0] + '/oficio']).then();
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    doDelete(documentoId): void {
        this._store.dispatch(new fromStore.DeleteDocumento(documentoId));
    }

    doVerResposta(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doAssinatura(documentoId): void {
        this._store.dispatch(new fromStore.AssinaDocumento(documentoId));
    }

    onClicked(documento): void {
        this._store.dispatch(new fromStore.ClickedDocumento(documento));
    }

    doConverte(documentoId): void {
        // this._store.dispatch(new fromStore.ConverteToPdf(documentoId));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
