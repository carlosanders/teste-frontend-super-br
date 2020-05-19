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
import {Back} from 'app/store/actions';

@Component({
    selector: 'coordenador-lotacoes',
    templateUrl: './coordenador-lotacoes.component.html',
    styleUrls: ['./coordenador-lotacoes.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations
})
export class CoordenadorLotacoesComponent implements OnInit, OnDestroy {

    private _unsubscribeAll: Subject<any> = new Subject();

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
                this._changeDetectorRef.markForCheck();
            }
        });

        this.usuario$.subscribe(usuario => this.usuario = usuario);
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goBack(): void {
        this._store.dispatch(new Back());
    }
}
