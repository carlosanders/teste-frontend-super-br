import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation

} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Processo} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {Colaborador} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getProcesso} from './store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Pessoa} from '@cdk/models';
import { takeUntil } from 'rxjs/operators';
import {Usuario} from "../../../../../../@cdk/models/usuario.model";

@Component({
    selector: 'dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Usuario;

    especieProcessoPagination: Pagination;
    setorAtualPagination: Pagination;
    classificacaoPagination: Pagination;

    routerState: any;

    procedencia: Pessoa;

    logEntryPagination: Pagination;
    // Private
    private _unsubscribeAll: Subject<any>;


    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.DadosBasicosAppState>,
        private _router: Router,
        public _loginService: LoginService,

    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = this._loginService.getUserProfile();

        this.especieProcessoPagination = new Pagination();
        this.logEntryPagination = new Pagination();
        this.setorAtualPagination = new Pagination();
        this.classificacaoPagination = new Pagination();
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.processo$.subscribe(
            processo => this.processo = processo
        );

        if (!this.processo) {
            this.processo = new Processo();
            this.processo.unidadeArquivistica = 1;
            this.processo.tipoProtocolo = 1;
        }

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this.logEntryPagination.filter = {entity: 'SuppCore\\AdministrativoBackend\\Entity\\Processo', id: + this.processo.id};
        this.especieProcessoPagination.filter = {'generoProcesso.nome': 'eq:ADMINISTRATIVO'};
        this.especieProcessoPagination.populate = ['generoProcesso'];
        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.classificacaoPagination.populate = ['parent'];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {

        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    submit(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveProcesso(processo));

    }

    post(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.PostProcesso(processo));

    }

    put(values): void {
        const processo = new Processo();

        Object.entries(values).forEach(
            ([key, value]) => {
                processo[key] = value;
            }
        );

        this._store.dispatch(new fromStore.PutProcesso(processo));

    }

    onActivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.procedencia = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void  {
        if (componentReference.select) {
            componentReference.select.unsubscribe();
        }
    }

    gerirProcedencia(): void {
        this._router.navigate([this.routerState.url + '/pessoa']).then();
    }

    editProcedencia(pessoaId: number): void {
        this._router.navigate([this.routerState.url + '/pessoa/editar/' + pessoaId]).then();
    }

}
