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
    Acao,
    Criteria,
    DocumentoAvulso,
    Etiqueta, ModalidadeAcaoEtiqueta,
    Pagination,
    Pessoa,
    Setor
} from "@cdk/models";
import {getModalidadeAcaoEtiqueta} from "../store/selectors";


// @ts-ignore
@Component({
    selector: 'acao-trigger-004',
    templateUrl: './acao-trigger-004.component.html',
    styleUrls: ['./acao-trigger-004.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AcaoTrigger004Component implements OnInit, OnDestroy {

    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
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
    modalidadeAcaoEtiqueta: ModalidadeAcaoEtiqueta;
    modalidadeAcaoEtiqueta$: Observable<ModalidadeAcaoEtiqueta>;

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
        private _store: Store<fromStore.AcaoEditAppState>
    ) {

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.modalidadeAcaoEtiqueta$ = this._store.pipe(select(getModalidadeAcaoEtiqueta));
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
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks

    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.modalidadeAcaoEtiqueta$.subscribe(
            modalidadeAcaoEtiqueta => this.modalidadeAcaoEtiqueta = modalidadeAcaoEtiqueta
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
        const acao = new Acao();
        const etiqueta = new Etiqueta();
        etiqueta.id = this.routerState.params.etiquetaHandle;
        acao.etiqueta = etiqueta;
        acao.modalidadeAcaoEtiqueta = this.modalidadeAcaoEtiqueta;
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
        this._router.navigate([this.routerState.url + '/pessoa']).then();
    }

    editPessoaDestino(pessoaId: number): void {
        this._router.navigate([this.routerState.url + '/pessoa/editar/' + pessoaId]).then();
    }
}
