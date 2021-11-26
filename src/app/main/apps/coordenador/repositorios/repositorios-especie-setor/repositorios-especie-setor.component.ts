import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';

import {cdkAnimations} from '@cdk/animations';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {getRouterState} from 'app/store/reducers';
import {Router} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';
import {Repositorio} from '@cdk/models';

@Component({
    selector: 'repositorios-especie-setor',
    templateUrl: './repositorios-especie-setor.component.html',
    styleUrls: ['./repositorios-especie-setor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class RepositoriosEspecieSetorComponent implements OnInit, OnDestroy {

    repositorio$: Observable<Repositorio>;

    action = '';
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

    /**
     *
     * @param _store
     * @param _changeDetectorRef
     * @param _router
     */
    constructor(
        private _store: Store<fromStore.RepositoriosEspecieSetorState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
    }


    /**
     * On init
     */
    ngOnInit(): void {
        this._store.pipe(
            select(getRouterState),
            takeUntil(this._unsubscribeAll),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
            if (this.routerState.url.indexOf('especie-setor/listar') > -1) {
                this.action = 'listar';
            }
            if (this.routerState.url.indexOf('especie-setor/editar') > -1) {
                this.action = 'editar';
            }
            if (this.routerState.url.indexOf('especie-setor/editar/criar') > -1) {
                this.action = 'criar';
            }
            this._changeDetectorRef.markForCheck();
        });

        this.repositorio$ = this._store.pipe(select(fromStore.getRepositorio));
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        if (this.action === 'listar') {
            return 'Vinculações de Espécies de Setor';
        } else if (this.action === 'criar') {
            return 'Nova Vinculação de Espécie de Setor';
        } else if (this.action === 'editar') {
            return 'Alterar Vinculação de Espécie de Setor';
        }
    }

    goBack(): void {
        if (this.action === 'editar') {
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.repositorioEspecieSetorHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }
}
