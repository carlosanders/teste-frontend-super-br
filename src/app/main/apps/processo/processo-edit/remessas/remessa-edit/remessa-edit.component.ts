import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {Pagination, Tramitacao, Usuario} from '@cdk/models';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Processo} from '@cdk/models';
import {getProcesso} from '../../../store/selectors';
import {Pessoa} from '@cdk/models';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../../store/reducers';
import {Back} from '../../../../../../store/actions';
import {LoginService} from '../../../../../auth/login/login.service';

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

    /**
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.RemessaEditAppState>,
        private _router: Router,
        public _loginService: LoginService,
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

        this.tramitacao$.subscribe(
            tramitacao => this.tramitacao = tramitacao
        );

        if (!this.tramitacao) {
            this.tramitacao = new Tramitacao();
            this.tramitacao.processo = this.processo;
            this.tramitacao.setorOrigem = this.processo.setorAtual;
        }

        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._store.dispatch(new fromStore.UnloadStore());
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

        this._store.dispatch(new fromStore.SaveTramitacao(tramitacao));

    }

    doAbort(): void {
        this._store.dispatch(new Back());
    }
}
