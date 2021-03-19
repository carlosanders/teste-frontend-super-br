import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation

} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Processo, Pessoa, Usuario, Classificacao} from '@cdk/models';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Pagination} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {getProcesso} from './store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {MercureService} from '@cdk/services/mercure.service';
import {Back} from '../../../../../store';
import {CdkProcessoModalClassificacaoRestritaComponent} from "@cdk/components/processo/cdk-processo-modal-classificacao-restrita/cdk-processo-modal-classificacao-restrita.component";
import {MatDialog} from "@cdk/angular/material";

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
    configuracaoNupPagination: Pagination;
    logEntryPagination: Pagination;

    routerState: any;

    procedencia: Pessoa;

    private _unsubscribeAll: Subject<any>;

    /**
     *
     * @param _changeDetectorRef
     * @param _store
     * @param _router
     * @param _loginService
     * @param dialog
     * @param _mercureService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _store: Store<fromStore.DadosBasicosAppState>,
        private _router: Router,
        public _loginService: LoginService,
        public dialog: MatDialog,
        private _mercureService: MercureService
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
            processo => {
                if (this.processo && processo && (this.processo.id !== processo.id) && this.processo.origemDados) {
                    this._mercureService.unsubscribe(this.processo.origemDados['@id']);
                }
                if (processo?.origemDados?.status === 0) {
                    this._mercureService.subscribe(processo.origemDados['@id']);
                }
                this.processo = processo;
                this._changeDetectorRef.markForCheck();
            }
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
        this.especieProcessoPagination.populate = ['generoProcesso'];
        this.setorAtualPagination.populate = ['unidade', 'parent'];
        this.setorAtualPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.classificacaoPagination.filter = {permissaoUso: 'eq:true'};
        this.classificacaoPagination.populate = ['parent'];
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        if (this.processo?.origemDados) {
            this._mercureService.unsubscribe(this.processo.origemDados['@id']);
        }
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

        if (this.processo && this.processo.id) {
            processo.setorInicial = this.processo.setorInicial ? this.processo.setorInicial : null;
            processo.NUP = this.processo.NUP
                .replace(/[^\w\-]+/g, '')
                .replace(/-+/g, '');
        }

        this._store.dispatch(new fromStore.SaveProcesso(processo));

    }

    abort(): void {
        this._store.dispatch(new Back());
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

    doSelectClassificacao(classificacao: Classificacao|null): void {
        if (classificacao && classificacao.visibilidadeRestrita === true && this.processo.acessoRestrito !== true) {
            this.dialog.open(CdkProcessoModalClassificacaoRestritaComponent, {
                data: [this.processo],
                hasBackdrop: false,
                closeOnNavigation: true
            });
        }
    }

    gerirProcedencia(): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa']).then();
    }

    editProcedencia(pessoaId: number): void {
        this._router.navigate([this.routerState.url.split('/pessoa')[0] + '/pessoa/editar/' + pessoaId]).then();
    }

}
