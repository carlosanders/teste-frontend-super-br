import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {Observable} from 'rxjs';

import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Usuario, Setor, Lotacao} from '@cdk/models';
import {LoginService} from 'app/main/auth/login/login.service';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Back} from 'app/store/actions';

@Component({
    selector: 'coordenador-lotacao-edit',
    templateUrl: './coordenador-lotacao-edit.component.html',
    styleUrls: ['./coordenador-lotacao-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorLotacaoEditComponent implements OnInit, OnDestroy {

    routerState: any;
    lotacao$: Observable<Lotacao>;
    lotacao: Lotacao;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;
    usuario: Usuario;
    usuario$: Observable<Usuario>;
    setor$: Observable<Setor>;
    setor: Setor;
    setorPagination: Pagination;
    colaboradorPagination: Pagination;
    modulo: string;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.LotacaoEditAppState>,
        private _router: Router,
        public _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.lotacao$ = this._store.pipe(select(fromStore.getLotacao));
        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
        this.usuario = this._loginService.getUserProfile();

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    if(this.routerState.url.includes('unidades')) {
                        this.modulo = "unidades";
                    }
                    else if(this.routerState.url.includes('usuarios')) {
                        this.modulo = "usuarios";
                    }
                    else {
                        this.modulo = "lotacoes";
                    }
                }
            });

        this.setorPagination = new Pagination();
        this.colaboradorPagination = new Pagination();

        this.setorPagination.populate = ['populateAll'];
        this.colaboradorPagination.populate = ['populateAll'];
        this.setorPagination.filter = {
            'parent.id': 'isNotNull'
        };
        if (this.routerState.params['unidadeHandle'] || this.routerState.params['generoHandle'] === 'unidade') {
            const unidade = this.routerState.params['unidadeHandle'] ?
                this.routerState.params['unidadeHandle'] :
                this.routerState.params['entidadeHandle'];
            this.setorPagination.filter = {
                ...this.setorPagination.filter,
                'unidade.id': 'eq:' + unidade
            };
        } else {
            this.setorPagination.filter = {
                ...this.setorPagination.filter,
                'unidade.modalidadeOrgaoCentral.id': 'eq:' + this.routerState.params.entidadeHandle
            };
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this.lotacao$.subscribe(
            lotacao => this.lotacao = lotacao
        );

        this.setor$.subscribe(
            setor => this.setor = setor
        );

        if (!this.lotacao) {
            this.lotacao = new Lotacao();
            this.lotacao.setor = this.setor;
            this.lotacao.peso = 100;
        }
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    doAbort(): void {
        this._store.dispatch(new Back());
    }

    submit(values): void {

        const lotacao = new Lotacao();
        Object.entries(values).forEach(
            ([key, value]) => {
                lotacao[key] = value;
            }
        );

        this._store.dispatch(new fromStore.SaveLotacao(lotacao));

    }

}
