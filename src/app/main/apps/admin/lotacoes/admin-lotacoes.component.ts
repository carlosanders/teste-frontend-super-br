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
import {Setor} from '@cdk/models';
import {Back} from 'app/store/actions';

@Component({
    selector: 'admin-lotacoes',
    templateUrl: './admin-lotacoes.component.html',
    styleUrls: ['./admin-lotacoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class AdminLotacoesComponent implements OnInit, OnDestroy {

    setor$: Observable<Setor>;
    setor: Setor;

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
        private _store: Store<fromStore.RootLotacoesState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this.setor$ = this._store.pipe(select(fromStore.getSetor));
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
        });

        this.setor$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(setor => this.setor = setor);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }

    getTitulo(): string {
        if (this.action === 'listar') {
            return 'Lotações - ' + this.setor.nome + ' - ' + this.setor.unidade.nome;
        } else if (this.action === 'criar') {
            return 'Nova Lotação - ' + this.setor.nome + ' - ' + this.setor.unidade.nome;
        } else if (this.action === 'editar') {
            return 'Alterar Lotação - ' + this.setor.nome + ' - ' + this.setor.unidade.nome;
        }
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
