import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Observable} from 'rxjs';

import {cdkAnimations} from '@cdk/animations';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Usuario} from '@cdk/models';
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import { take, tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'usuarios-list',
    templateUrl: './usuarios-list.component.html',
    styleUrls: ['./usuarios-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class UsuariosListComponent implements OnInit {

    routerState: any;
    usuarios$: Observable<Usuario[]>;
    loading$: Observable<boolean>;
    pagination$: Observable<any>;
    pagination: any;
    actions: Array<string> = [];
    deletingIds$: Observable<any>;
    deletedIds$: Observable<any>;

    /**
     * @param _changeDetectorRef
     * @param _router
     * @param _store
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
        this.deletedIds$ = this._store.pipe(select(fromStore.getDeletedIds));

        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    ngOnInit(): void {
        this.pagination$.subscribe(pagination => {
            this.pagination = pagination;
        });
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
        this._router.navigate([this.routerState.url.replace('listar', 'editar/criar')]);
    }

    edit(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', 'editar/') + usuarioId]);
    }

    lotacoes(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/lotacoes`)]);
    }

    afastamentos(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/afastamentos`)]);
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

    coordenadores(usuarioId: number): void {
        this._router.navigate([this.routerState.url.replace('listar', `${usuarioId}/coordenadores`)]);
    }

    delete(usuarioId: number): void {
        this._store.dispatch(new fromStore.DeleteUsuario(usuarioId));
    }

    doDistribuirTarefas(usuario: Usuario): void {
        this._store.dispatch(new fromStore.DistribuirTarefasUsuario(usuario));
    }
}
