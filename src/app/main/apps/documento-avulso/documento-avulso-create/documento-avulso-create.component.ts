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
import {Colaborador} from '@cdk/models';
import {LoginService} from '../../../auth/login/login.service';
import {Processo} from '@cdk/models';
import {Tarefa} from '@cdk/models';
import {takeUntil} from 'rxjs/operators';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../store/reducers';
import {Usuario} from "../../../../../@cdk/models/usuario.model";

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

    /**
     * @param _store
     * @param _loginService
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.DocumentoAvulsoCreateAppState>,
        private _loginService: LoginService,
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
            takeUntil(this._unsubscribeAll)
        ).subscribe(tarefa => {
            this.tarefa = tarefa;
        });

        this.documentoAvulso = new DocumentoAvulso();
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

        this._store.dispatch(new fromStore.SaveDocumentoAvulso(documentoAvulso));

    }

}
