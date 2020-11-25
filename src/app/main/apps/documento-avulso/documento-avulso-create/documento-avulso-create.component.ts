import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {DocumentoAvulso} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import * as moment from 'moment';
import {LoginService} from '../../../auth/login/login.service';
import {Processo} from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {filter, takeUntil} from 'rxjs/operators';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {Usuario} from '@cdk/models/usuario.model';
import {Back} from '../../../../store/actions';
import {modulesConfig} from '../../../../../modules/modules-config';
import {GetDocumentos as GetDocumentosProcesso, UnloadDocumentos} from '../../processo/processo-view/store/actions';
import {GetDocumentos as GetDocumentosAtividade} from '../../tarefas/tarefa-detail/atividades/atividade-create/store/actions';
import {GetDocumentos as GetDocumentosAvulsos} from '../../tarefas/tarefa-detail/oficios/store/actions';

@Component({
    selector: 'documento-avulso-create',
    templateUrl: './documento-avulso-create.component.html',
    styleUrls: ['./documento-avulso-create.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DocumentoAvulsoCreateComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    documentoAvulso: DocumentoAvulso;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<any>;
    processo: Processo;

    tarefa$: Observable<any>;
    tarefa: Tarefa;

    _profile: Usuario;

    especieDocumentoAvulsoPagination: Pagination;
    setorDestinoPagination: Pagination;
    modeloPagination: Pagination;

    routerState: any;

    pessoaDestino: Pessoa;

    routeOficioDocumento = 'oficio';

    /**
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoCreateAppState>,
        public _loginService: LoginService,
        private _router: Router
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));

        this._profile = _loginService.getUserProfile();

        this.especieDocumentoAvulsoPagination = new Pagination();
        this.especieDocumentoAvulsoPagination.populate = ['generoDocumentoAvulso'];

        this.setorDestinoPagination = new Pagination();
        this.setorDestinoPagination.filter = {parent: 'isNull'};

        this.modeloPagination = new Pagination();
        // this.modeloPagination.filter = {'documento.tipoDocumento.nome': 'eq:OFÍCIO'};

        this.processo$ = this._store.pipe(select(fromStore.getProcesso));
        this.tarefa$ = this._store.pipe(select(fromStore.getTarefa));
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(processo => {
            this.processo = processo;
        });

        this.tarefa$.pipe(
            takeUntil(this._unsubscribeAll),
            filter((tarefa) => !!tarefa)
        ).subscribe(tarefa => {
            this.tarefa = tarefa;

            if (tarefa.especieTarefa.generoTarefa.nome === 'ADMINISTRATIVO') {
                this.especieDocumentoAvulsoPagination.filter = {'generoDocumentoAvulso.nome': 'eq:ADMINISTRATIVO'};
            } else {
                this.especieDocumentoAvulsoPagination.filter = {'generoDocumentoAvulso.nome': 'in:ADMINISTRATIVO,' + tarefa.especieTarefa.generoTarefa.nome.toUpperCase()};
            }
        });

        this.documentoAvulso = new DocumentoAvulso();
        this.documentoAvulso.mecanismoRemessa = 'interna';
        this.documentoAvulso.dataHoraInicioPrazo = moment();
        this.documentoAvulso.dataHoraFinalPrazo = moment().add(5, 'days').set({hour: 20, minute: 0, second: 0});

        if (this.processo) {
            this.documentoAvulso.processo = this.processo;
        }

        if (this.tarefa) {
            this.documentoAvulso.tarefaOrigem = this.tarefa;
            this.documentoAvulso.processo = this.tarefa.processo;
        }

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        const pathDocumento = 'app/main/apps/documento/documento-edit';
        modulesConfig.forEach((module) => {
            if (module.routerLinks.hasOwnProperty(pathDocumento) &&
                module.routerLinks[pathDocumento].hasOwnProperty('oficio') &&
                module.routerLinks[pathDocumento]['oficio'].hasOwnProperty(this.routerState.params.generoHandle)) {
                this.routeOficioDocumento = module.routerLinks[pathDocumento]['oficio'][this.routerState.params.generoHandle];
            }
        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

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
    
    submit(values): void {

        const documentoAvulso = new DocumentoAvulso();

        Object.entries(values).forEach(
            ([key, value]) => {
                documentoAvulso[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveDocumentoAvulso({
            documentoAvulso: documentoAvulso,
            routeOficio: this.routeOficioDocumento
        }));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }

}
