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
import {Modelo} from '@cdk/models';

@Component({
    selector: 'modelos-especie-setor',
    templateUrl: './modelos-especie-setor.component.html',
    styleUrls: ['./modelos-especie-setor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class ModelosEspecieSetorComponent implements OnInit, OnDestroy {

    modelo$: Observable<Modelo>;
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
        private _store: Store<fromStore.ModelosEspecieSetorState>,
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

        this.modelo$ = this._store.pipe(select(fromStore.getModelo));
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
            this._router.navigate([this.routerState.url.replace(('editar/' + this.routerState.params.modeloEspecieSetorHandle), 'listar')]).then();
        }
        if (this.action === 'criar') {
            this._router.navigate([this.routerState.url.replace('editar/criar', 'listar')]).then();
        }
    }
}
