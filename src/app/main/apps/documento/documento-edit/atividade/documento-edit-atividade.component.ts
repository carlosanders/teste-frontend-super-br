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
import {Atividade, Documento, Pagination, Tarefa} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as moment from 'moment';
import {getTarefa} from '../../../tarefas/tarefa-detail/store';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {Back, getRouterState} from '../../../../../store';
import {filter, takeUntil} from 'rxjs/operators';
import {CdkUtils} from '@cdk/utils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'documento-edit-atividade',
    templateUrl: './documento-edit-atividade.component.html',
    styleUrls: ['./documento-edit-atividade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoEditAtividadeComponent implements OnInit, OnDestroy {

    routerState: any;

    tarefa$: Observable<Tarefa>;
    tarefa: Tarefa;

    documento$: Observable<Documento>;
    documento: Documento;

    atividade: Atividade;
    form: FormGroup;

    atividadeIsSaving$: Observable<boolean>;
    atividadeErrors$: Observable<any>;

    documentos$: Observable<Documento[]>;
    minutas: Documento[] = [];
    selectedDocumentos$: Observable<Documento[]>;
    selectedMinutas: Documento[] = [];
    selectedIds$: Observable<number[]>;
    disabledIds: number[] = [];

    especieAtividadePagination: Pagination;
    unidadeAprovacaoPagination: Pagination;
    setorAprovacaoPagination: Pagination;
    usuarioAprovacaoPagination: Pagination;

    values: any;

    routeAtividadeDocumento = 'atividade';

    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _componenteDigitalService
     * @param _changeDetectorRef
     * @param _router
     * @param _formBuilder
     * @param _activatedRoute
     */
    constructor(
        private _store: Store<fromStore.DocumentoEditAtividadeAppState>,
        private _componenteDigitalService: ComponenteDigitalService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

        this.form = this._formBuilder.group({
            id: [null],
            encerraTarefa: [null],
            destinacaoMinutas: [null],
            respostaDocumentoAvulso: [null],
            especieAtividade: [null, [Validators.required]],
            dataHoraConclusao: [null, [Validators.required]],
            usuario: [null, [Validators.required]],
            observacao: [null, [Validators.maxLength(255)]],
            documento: [null],
            tarefa: [null],
            unidadeAprovacao: [null, [Validators.required]],
            setorAprovacao: [null, [Validators.required]],
            usuarioAprovacao: [null, [Validators.required]]
        });
        this.documento$ = this._store.pipe(select(fromStore.getDocumento));

        this.tarefa$ = this._store.pipe(select(getTarefa));

        this.atividadeIsSaving$ = this._store.pipe(select(fromStore.getAtividadeIsSaving));
        this.atividadeErrors$ = this._store.pipe(select(fromStore.getAtividadeErrors));

        this.documentos$ = this._store.pipe(select(fromStore.getDocumentos));
        this.selectedDocumentos$ = this._store.pipe(select(fromStore.getSelectedDocumentos));
        this.selectedIds$ = this._store.pipe(select(fromStore.getSelectedDocumentoIds));

        this.especieAtividadePagination = new Pagination();
        this.especieAtividadePagination.populate = ['generoAtividade'];

        this.unidadeAprovacaoPagination = new Pagination();
        this.unidadeAprovacaoPagination.filter = {parent: 'isNull'};

        this.setorAprovacaoPagination = new Pagination();
        this.setorAprovacaoPagination.filter = {parent: 'isNotNull'};
        this.setorAprovacaoPagination.populate = ['unidade', 'parent'];

        this.usuarioAprovacaoPagination = new Pagination();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.atividade = new Atividade();
        this.atividade.encerraTarefa = true;
        this.atividade.dataHoraConclusao = moment();

        this.tarefa$.pipe(
            filter(tarefa => !!tarefa)
        ).subscribe((tarefa) => {
            this.tarefa = tarefa;

            this.atividade.tarefa = this.tarefa;
            this.atividade.usuario = this.tarefa.usuarioResponsavel;
            this.atividade.setor = this.tarefa.setorResponsavel;
            if (this.tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'eq:ADMINISTRATIVO'};
            } else {
                this.especieAtividadePagination.filter = {'generoAtividade.nome': 'in:ADMINISTRATIVO,' + this.tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
            }

            // caso tarefa seja de workflow verificar espécies permitidas
            this.especieAtividadePagination['context'] = {};
            if (tarefa.workflow) {
                this.especieAtividadePagination.filter = {
                    'transicoesWorkflow.workflow.id': 'eq:' + tarefa.workflow.id
                };
                this.especieAtividadePagination['context'] = {tarefaId: tarefa.id};
            }
        });

        this.documento$.pipe(
            filter(documento => !!documento),
            takeUntil(this._unsubscribeAll)
        ).subscribe((documento) => {
            this.documento = documento;
            // Encerra Tarefa não está marcada, selecionar a minuta atual e desabilitar a sua desseleção/clique
            if (!this.atividade.encerraTarefa) {
                this.changedSelectedIds([this.documento.id]);
                this.disabledIds = [this.documento.id];
            }
        });

        this.selectedDocumentos$.pipe(
            filter(selectedDocumentos => !!selectedDocumentos),
            takeUntil(this._unsubscribeAll)
        ).subscribe((selectedDocumentos) => {
            this.selectedMinutas = selectedDocumentos.filter(documento => documento.minuta && !documento.documentoAvulsoRemessa);
        });

        this.documentos$.pipe(
            filter(cd => !!cd),
            takeUntil(this._unsubscribeAll)
        ).subscribe(
            (documentos) => {
                this.minutas = documentos.filter(documento =>
                    (!documento.documentoAvulsoRemessa && documento.minuta && !documento.apagadoEm));
                if (this.atividade.encerraTarefa) {
                    // Tarefa está marcada como encerrada, selecionar todas as minutas e desmarcar sua desseleção/clique
                    this.changedSelectedIds(this.minutas.map(minuta => minuta.id));
                    this.disabledIds = this.minutas.map(minuta => minuta.id);
                }
                this._changeDetectorRef.markForCheck();
            }
        );

        this._componenteDigitalService.completedEditorSave.pipe(takeUntil(this._unsubscribeAll)).subscribe((value) => {
            if (value === this.documento.id) {
                this.submitAtividade();
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadDocumentos());
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    preSubmitAtividade(values): void {
        delete values.unidadeAprovacao;
        const atividade = new Atividade();
        Object.entries(values).forEach(
            ([key, value]) => {
                atividade[key] = value;
            }
        );

        if (atividade.encerraTarefa) {
            atividade.documentos = this.minutas;
        } else {
            atividade.documentos = this.selectedMinutas;
        }

        this.values = atividade;
        if (!this.documento.assinado && this.documento.componentesDigitais[0].editavel) {
            this._componenteDigitalService.doEditorSave.next(this.documento.id);
        } else {
            this.submitAtividade();
        }
    }

    submitAtividade(): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveAtividade({
            atividade: this.values,
            operacaoId: operacaoId
        }));
    }

    changedSelectedIds(selectedIds): void {
        this._store.dispatch(new fromStore.ChangeSelectedDocumentos(selectedIds));
    }

    onClicked(documento): void {
        if (!this.disabledIds.includes(documento.id)) {
            let primary: string;
            primary = 'componente-digital/';
            let componenteDigital = null;

            if (documento.componentesDigitais[0]) {
                componenteDigital = documento.componentesDigitais[0];
                primary += componenteDigital.id;
            } else {
                primary += '0';
            }

            if (componenteDigital && componenteDigital.editavel && !componenteDigital.assinado && !componenteDigital.apagadoEm) {
                primary += '/editor/ckeditor';
            } else {
                primary += '/visualizar';
            }

            const sidebar = 'editar/' + this.routeAtividadeDocumento;

            this._router.navigate([
                    this.routerState.url.split('/documento/' + this.routerState.params.documentoHandle)[0] +
                    '/documento/' + documento.id,
                    {
                        outlets: {
                            primary: primary,
                            sidebar: sidebar
                        }
                    }],
                {
                    relativeTo: this._activatedRoute.parent,
                    queryParams: {lixeira: null}
                }).then();
        }
    }

    changeEncerramentoTarefa(value: boolean): void {
        this.atividade.encerraTarefa = value;
        if (value) {
            const selectedIds = this.minutas.map(minuta => minuta.id);
            this.changedSelectedIds(selectedIds);
            this.disabledIds = selectedIds;
        } else {
            this.changedSelectedIds([this.documento.id]);
            this.disabledIds = [this.documento.id];
        }
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
