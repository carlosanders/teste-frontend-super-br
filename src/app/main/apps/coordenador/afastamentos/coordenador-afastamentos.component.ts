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
import {Usuario} from '@cdk/models';

@Component({
    selector: 'coordenador-afastamentos',
    templateUrl: './coordenador-afastamentos.component.html',
    styleUrls: ['./coordenador-afastamentos.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorAfastamentosComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

    usuario$: Observable<Usuario>;

    action = '';
    routerState: any;

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.AfastamentosState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {}

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
                if (this.routerState.url.indexOf('afastamentos/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('afastamentos/editar') > -1) {
                    this.action = 'editar';
                }
                if (this.routerState.url.indexOf('afastamentos/editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });

        this.usuario$ = this._store.pipe(select(fromStore.getUsuario));
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        if (this.action === 'listar') {
            return 'Afastamentos';
        } else if (this.action === 'criar') {
            return 'Novo Afastamento';
        } else if (this.action === 'editar') {
            return 'Alterar Afastamento';
        }
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.afastamentoHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }
}
