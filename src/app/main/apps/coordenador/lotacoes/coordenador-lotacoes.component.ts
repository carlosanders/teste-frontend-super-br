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
import {Usuario} from '@cdk/models';

@Component({
    selector: 'coordenador-lotacoes',
    templateUrl: './coordenador-lotacoes.component.html',
    styleUrls: ['./coordenador-lotacoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorLotacoesComponent implements OnInit, OnDestroy {

    usuario$: Observable<Usuario>;
    usuario: Usuario;

    action = '';
    entidade = '';
    routerState: any;
    private _unsubscribeAll: Subject<any> = new Subject();

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
            this._changeDetectorRef.markForCheck();
        });

        this.usuario$.pipe(
            takeUntil(this._unsubscribeAll)
        ).subscribe(usuario => this.usuario = usuario);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(true);
        this._unsubscribeAll.complete();
    }
}
