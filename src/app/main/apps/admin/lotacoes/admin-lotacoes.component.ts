import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, OnDestroy, OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Setor, Usuario} from '@cdk/models';

@Component({
    selector: 'admin-lotacoes',
    templateUrl: './admin-lotacoes.component.html',
    styleUrls: ['./admin-lotacoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminLotacoesComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    setor$: Observable<Setor>;
    setor: Setor;
    usuario$: Observable<Usuario>;
    usuario: Usuario;

    action = '';
    entidade = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.LotacoesState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
    }

    /**
     * On init
     */
    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('lotacoes/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('lotacoes/editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('lotacoes/editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });

        this.usuario$.subscribe(usuario => this.usuario = usuario);
        this.setor$.subscribe(setor => this.setor = setor);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        this.entidade = this.setor ? this.setor.nome : this.usuario.nome;
        if (this.action === 'listar') {
            return 'Lotações - ' + this.entidade;
        } else if (this.action === 'criar') {
            return 'Nova Lotação - ' + this.entidade;
        } else if (this.action === 'editar') {
            return 'Alterar Lotação - ' + this.entidade;
        }
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.lotacaoHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }
}
