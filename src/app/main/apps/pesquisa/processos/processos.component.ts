import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {fuseAnimations} from '@fuse/animations';
import {Processo} from '@cdk/models/processo.model';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from 'app/main/apps/pesquisa/processos/store';
import {getRouterState} from 'app/store/reducers';
import {LoginService} from '../../../auth/login/login.service';

@Component({
    selector: 'processos',
    templateUrl: './processos.component.html',
    styleUrls: ['./processos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class ProcessosComponent implements OnInit {

    routerState: any;
    processos$: Observable<Processo[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;
    NUPHandle: any;
    colunas: any[] = ['id', 'NUP', 'actions'];

    private _profile: any;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param _loginService
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.ProcessosAppState>,
        private _loginService: LoginService,
    ) {
        this.processos$ = this._store.pipe(select(fromStore.getProcessos));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this._profile = _loginService.getUserProfile();

        if (_loginService.isGranted('ROLE_COLABORADOR')) {
            this.colunas = ['select', 'id', 'NUP', 'setorAtual.nome', 'unidade', 'actions'];
        }
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                    this.NUPHandle = this.routerState.params.NUPHandle;
                    if (this.routerState.params.NUPHandle) {
                        this.reload({
                            ...this.pagination,
                            gridFilter: {NUP: 'like:' + this.routerState.params.NUPHandle + '%'}
                        });
                    }
                }
            });
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetProcessos({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: {
                ...params.context
            }
        }));
    }

    view(emissao: {id: number, chave_acesso?: string}): void {
        const chaveAcesso = emissao.chave_acesso ? '/' + emissao.chave_acesso : '';
        this._router.navigate(['apps/processo/' + emissao.id + '/visualizar' + chaveAcesso]);
    }

    edit(processoId: number): void {
        this._router.navigate(['apps/processo/' + processoId + '/editar']);
    }
}
