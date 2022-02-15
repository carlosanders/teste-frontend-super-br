import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from '@cdk/models';
import {filter, take, takeUntil, tap} from 'rxjs/operators';
import {MatDialog} from '@cdk/angular/material';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {CdkUtils} from '../../../../../../@cdk/utils';

@Component({
    selector: 'usuarios-list',
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuariosListComponent implements OnInit, OnDestroy {

    routerState: any;
    usuarios$: Observable<Usuario[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    actions: Array<string> = [];
    displayedColumns: Array<string> = [];
    deletingIds$: Observable<any>;
    deletingErrors$: Observable<any>;
    deletedIds$: Observable<any>;
    lote: string;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _changeDetectorRef
     * @param _router
     * @param _store
     * @param dialog
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _store: Store<fromStore.UsuariosListAppState>,
        public dialog: MatDialog,
    ) {
        this.usuarios$ = this._store.pipe(select(fromStore.getUsuariosList));
        this.pagination$ = this._store.pipe(select(fromStore.getPagination));
        this.loading$ = this._store.pipe(select(fromStore.getIsLoading));
        this.deletingIds$ = this._store.pipe(select(fromStore.getDeletingIds));
        this.deletingErrors$ = this._store.pipe(select(fromStore.getDeletingErrors));
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.params['generoHandle'] === 'nacional' ||
                (this.routerState.params['generoHandle'] === 'unidade' && !this.routerState.params['setorHandle'])) {
                this.actions = ['create', 'edit', 'lotacoes', 'afastamentos', 'resetaSenhaColaborador', 'coordenadores'];
                this.displayedColumns = ['select', 'id', 'username', 'nome', 'email', 'colaborador.modalidadeColaborador.valor', 'colaborador.cargo.nome', 'enabled', 'actions'];
            }
            if (this.routerState.params['generoHandle'] === 'local' || this.routerState.params['setorHandle']) {
                this.actions = ['afastamentos'];
                this.displayedColumns = ['id', 'username', 'nome', 'email', 'colaborador.modalidadeColaborador.valor', 'colaborador.cargo.nome', 'enabled', 'actions'];
            }
        });
    }

    ngOnInit(): void {
        this.pagination$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe((pagination) => {
            this.pagination = pagination;
        });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
        this._store.dispatch(new fromStore.UnloadUsuarios());
    }

    reload(params): void {
        this._store.dispatch(new fromStore.GetUsuarios({
            ...this.pagination,
            filter: {
                ...this.pagination.filter,
            },
            gridFilter: {
                ...params.gridFilter
            },
            sort: params.sort,
            limit: params.limit,
            offset: params.offset,
            populate: this.pagination.populate,
            context: this.pagination.context
        }));
    }

    create(): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]).then();
    }

    edit(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + usuarioId]).then();
    }

    lotacoes(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/lotacoes`)]).then();
    }

    afastamentos(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/afastamentos`)]).then();
    }

    resetaSenha(usuarioId: number): void {
        const dialogRef = this.dialog.open(CdkConfirmDialogComponent, {
            data: {
                title: 'Redefinição de senha',
                confirmLabel: 'Sim',
                cancelLabel: 'Não',
                message: 'Uma nova senha segura será gerada e enviada ao usuário por e-mail.'
            },
            hasBackdrop: false,
            closeOnNavigation: true
        });

        dialogRef.afterClosed()
            .pipe(
                tap(
                    (value) => {
                        if (value) {
                            const usuario = new Usuario();
                            usuario.id = usuarioId;
                            this._store.dispatch(new fromStore.ResetSenha(usuario));
                        }
                    }
                ),
                tap(() => dialogRef.close()),
                take(1)
            ).subscribe();
    }

    delete(usuarioId: number, loteId: string = null): void {
        const operacaoId = CdkUtils.makeId();
        this._store.dispatch(new fromStore.DeleteUsuario({
            usuarioId: usuarioId,
            operacaoId: operacaoId,
            loteId: loteId,
        }));
    }

    deleteBloco(ids: number[]): void {
        this.lote = CdkUtils.makeId();
        ids.forEach((id: number) => this.delete(id, this.lote));
    }

    coordenadores(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/coordenadores`)]).then();
    }
}
