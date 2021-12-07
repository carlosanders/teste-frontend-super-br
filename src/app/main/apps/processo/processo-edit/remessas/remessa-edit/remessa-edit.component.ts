import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable, Subject} from 'rxjs';

import {Pagination, Pessoa, Processo, Tramitacao, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {getProcesso} from '../../../store';
import {ActivatedRoute, Router} from '@angular/router';
import {getRouterState} from '../../../../../../store';
import {Back} from '../../../../../../store';
import {LoginService} from '../../../../../auth/login/login.service';
import {CdkUtils} from '../../../../../../../@cdk/utils';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
    selector: 'remessa-edit',
    templateUrl: './remessa-edit.component.html',
    styleUrls: ['./remessa-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RemessaEditComponent implements OnInit, OnDestroy {

    tramitacao$: Observable<Tramitacao>;
    tramitacao: Tramitacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    processo$: Observable<Processo>;
    processo: Processo;

    routerState: any;

    _profile: Usuario;
    pessoaDestino: Pessoa;

    setorOrigemPagination: Pagination;
    setorOrigemPaginationTree: Pagination;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     * @param _store
     * @param _router
     * @param _loginService
     * @param activatedRoute
     */
    constructor(
        private _store: Store<fromStore.RemessaEditAppState>,
        private _router: Router,
        public _loginService: LoginService,
        public activatedRoute: ActivatedRoute
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.tramitacao$ = this._store.pipe(select(fromStore.getTramitacao));
        this.processo$ = this._store.pipe(select(getProcesso));
        this._profile = this._loginService.getUserProfile();
        this.setorOrigemPagination = new Pagination();
        this.setorOrigemPaginationTree = new Pagination();
        this.setorOrigemPagination.populate = ['unidade', 'parent'];
        this.setorOrigemPagination.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
        this.setorOrigemPaginationTree.filter = {id: 'in:' + this._profile.colaborador.lotacoes.map(lotacao => lotacao.setor.unidade.id).join(',')};

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
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
        ).subscribe(processo => this.processo = processo);

        this.tramitacao$.pipe(
            filter(tramitacao => !!tramitacao),
            takeUntil(this._unsubscribeAll)
        ).subscribe(tramitacao => this.tramitacao = tramitacao);

        if (!this.tramitacao) {
            this.tramitacao = new Tramitacao();
            this.tramitacao.processo = this.processo;
            this.tramitacao.setorOrigem = this.processo.setorAtual;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadStore());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    onActivate(componentReference): void {
        if (componentReference.select) {
            componentReference.select.subscribe((pessoa: Pessoa) => {
                this.pessoaDestino = pessoa;
                this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
            });
        }
    }

    onDeactivate(componentReference): void {
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

    submit(values): void {

        const tramitacao = new Tramitacao();

        Object.entries(values).forEach(
            ([key, value]) => {
                tramitacao[key] = value;
            }
        );

        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.SaveTramitacao({
            tramitacao: tramitacao,
            operacaoId: operacaoId
        }));
    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
