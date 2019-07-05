import {
    ChangeDetectionStrategy,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {fuseAnimations} from '@fuse/animations';
import {Observable} from 'rxjs';

import {Processo} from '@cdk/models/processo.model';
import {select, Store} from '@ngrx/store';

import * as fromStore from './store';
import {Pagination} from '@cdk/models/pagination';
import {Colaborador} from '@cdk/models/colaborador.model';
import {LoginService} from 'app/main/auth/login/login.service';
import {getProcesso} from './store/selectors';
import {Router} from '@angular/router';
import {getRouterState} from 'app/store/reducers';
import {Pessoa} from '@cdk/models/pessoa.model';

@Component({
    selector: 'dados-basicos',
    templateUrl: './dados-basicos.component.html',
    styleUrls: ['./dados-basicos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class DadosBasicosComponent implements OnInit, OnDestroy {

    processo$: Observable<Processo>;
    processo: Processo;
    isSaving$: Observable<boolean>;
    errors$: Observable<any>;

    _profile: Colaborador;

    especieProcessoPagination: Pagination;
    setorAtualPagination: Pagination;

    routerState: any;

    /**
     *
     * @param _store
     * @param _router
     * @param _loginService
     */
    constructor(
        private _store: Store<fromStore.DadosBasicosAppState>,
        private _router: Router,
        private _loginService: LoginService
    ) {
        this.isSaving$ = this._store.pipe(select(fromStore.getIsSaving));
        this.errors$ = this._store.pipe(select(fromStore.getErrors));
        this.processo$ = this._store.pipe(select(getProcesso));

        this._profile = this._loginService.getUserProfile();

        this.especieProcessoPagination = new Pagination();
        this.especieProcessoPagination.populate = ['generoProcesso'];
        this.setorAtualPagination = new Pagination();
        this.setorAtualPagination.populate = ['unidade'];
        this.setorAtualPagination.filter = {'id': 'in:' + this._profile.lotacoes.map(lotacao => lotacao.setor.id).join(',')};
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
            this.processo.novo = true;
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

    onActivate(componentReference): void  {
        componentReference.select.subscribe((pessoa: Pessoa) => {
            const processo = new Processo();
            processo.procedencia = pessoa;
            this.processo = processo;
            this._router.navigate([this.routerState.url.split('/pessoa')[0]]).then();
        });
    }

    onDeactivate(componentReference): void  {
        componentReference.select.unsubscribe();
    }

    gerirProcedencia(): void {
        this._router.navigate([this.routerState.url + '/pessoa']).then();
    }

    editProcedencia(): void {
        if (this.processo.procedencia) {
            this._router.navigate([this.routerState.url + '/pessoa/editar/' + this.processo.procedencia.id]).then();
        }
    }

}
