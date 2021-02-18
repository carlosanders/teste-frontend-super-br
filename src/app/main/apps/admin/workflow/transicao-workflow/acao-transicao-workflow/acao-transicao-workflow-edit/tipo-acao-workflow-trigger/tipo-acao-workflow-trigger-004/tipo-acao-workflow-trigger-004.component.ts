import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {Observable} from "rxjs";
import * as fromStore from '../../store';
import {getRouterState} from "../../../../../../../../../store/reducers";
import {
    AcaoTransicaoWorkflow,
    Criteria,
    DocumentoAvulso,
    Pagination,
    Pessoa,
    Setor, TipoAcaoWorkflow, TransicaoWorkflow
} from "@cdk/models";
import {getTipoAcaoWorkflow} from "../store/selectors";


@Component({
    selector: 'tipo-acao-workflow-trigger-004',
    templateUrl: './tipo-acao-workflow-trigger-004.component.html',
    styleUrls: ['./tipo-acao-workflow-trigger-004.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class TipoAcaoWorkflowTrigger004Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    tipoAcaoWorkflow$: Observable<TipoAcaoWorkflow>;
    tipoAcaoWorkflow: TipoAcaoWorkflow;
    form: FormGroup;
    formState: string = 'form';
    routerState: any;
    documentoAvulso: DocumentoAvulso;
    especieDocumentoAvulsoPagination: Pagination;
    setorDestinoPagination: Pagination;
    modeloPagination: Pagination;
    destinatarios = [];
    destinatariosSave = [];
    destinos: any[] = [];
    pessoaDestino: Pessoa;
    logEntryPagination: Pagination;
    saving: any;
    prazoCriteriaList: Criteria[] = [];
    criteriasTemplate: any[] = [
        {
            descricao: '5 dias',
            value: 5
        },
        {
            descricao: '10 dias',
            value: 10
        },
        {
            descricao: '15 dias',
            value: 15
        }
    ];

    /**
     * @param _router
     * @param _formBuilder
     * @param _store
     */
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _store: Store<fromStore.AcaoTransicaoWorkflowEditAppState>
    ) {

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.especieDocumentoAvulsoPagination = new Pagination();
        this.especieDocumentoAvulsoPagination.populate = ['generoDocumentoAvulso'];
        this.setorDestinoPagination = new Pagination();
        this.setorDestinoPagination.filter = {parent: 'isNull'};
        this.modeloPagination = new Pagination();
        this.criteriasTemplate.forEach((criteria) => {
            let newCriteria = new Criteria();
            newCriteria.descricao = criteria.descricao;
            newCriteria.valor = criteria.value;
            this.prazoCriteriaList.push(newCriteria);
        });
        this.tipoAcaoWorkflow$ = this._store.pipe(select(getTipoAcaoWorkflow));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.tipoAcaoWorkflow$.subscribe(
            tipoAcaoWorkflow => {
                this.tipoAcaoWorkflow = tipoAcaoWorkflow
            }
        );
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
        let contexto = {};

        contexto["especieDocumentoAvulsoId"] = values.especieDocumentoAvulso.id
        contexto["prazoFinal"] = values.prazoFinal
        contexto["modeloId"] = values.modelo.id
        contexto["mecanismoRemessa"] = values.mecanismoRemessa

        if (values.setorDestino && !values.blocoDestinatarios) {
            contexto['setorDestinoId'] = values.setorDestino.id
        }

        if (values.pessoaDestino && !values.blocoDestinatarios) {
            contexto['pessoaDestinoId'] = values.pessoaDestino.id
        }

        if (values.observacao) {
            contexto['observacao'] = values.observacao;
        }
        if ((this.destinatariosSave.length < this.destinatarios.length) && (values.blocoDestinatarios)) {
            this.destinatariosSave.push(values);
        }

        if (this.destinatariosSave.length == this.destinatarios.length && values.blocoDestinatarios) {
            this.destinos = [];
            this.destinatarios.forEach((destinatario) => {
                let destino = {};
                if (destinatario instanceof Setor) {
                    destino['id'] = destinatario.id;
                    destino['tipo'] = 'setor';
                }
                if (destinatario instanceof Pessoa) {
                    destino['id'] = destinatario.id;
                    destino['tipo'] = 'pessoa';
                }
                this.destinos.push(destino);
            });
            contexto['blocoResponsaveis'] = this.destinos;
            this._store.dispatch(new fromStore.SaveAcao(this.tratarValores(contexto)));
        } else if (!values.blocoDestinatarios) {
            this._store.dispatch(new fromStore.SaveAcao(this.tratarValores(contexto)));
        }
    }

    tratarValores(values): any {
        const acao = new AcaoTransicaoWorkflow();
        const transicaoWorkflow = new TransicaoWorkflow();
        transicaoWorkflow.id = this.routerState.params.transicaoWorkflowHandle;
        acao.transicaoWorkflow = transicaoWorkflow;
        acao.tipoAcaoWorkflow = this.tipoAcaoWorkflow;
        values.contexto = JSON.stringify(values);
        Object.entries(values).forEach(
            ([key, value]) => {
                acao[key] = value;
            }
        );
        return acao;
    }

    doAbort(): void {
        this._router.navigate([this.routerState.url.replace('/4/trigger', '')]);
    }


    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.pessoaDestino = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    gerirPessoaDestino(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa']).then();
    }

    editPessoaDestino(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }
}
