import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {select, Store} from '@ngrx/store';
import * as fromStore from './store';
import {Router} from '@angular/router';
import {getRouterState} from '../../../../../store/reducers';
import {takeUntil} from 'rxjs/operators';
import {Back} from '../../../../../store/actions';

@Component({
    selector: 'vincular-pessoa',
    templateUrl: './vincular-pessoa.component.html',
    styleUrls: ['./vincular-pessoa.component.scss']
})
export class VincularPessoaComponent implements OnInit {


    private _unsubscribeAll: Subject<any> = new Subject();

    action = '';
    routerState: any;

    constructor(
        private _store: Store<fromStore.VinculacaoPessoaUsuarioAppState>,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
    }

    ngOnInit(): void {
        this._store
            .pipe(
                select(getRouterState),
                takeUntil(this._unsubscribeAll)
            ).subscribe(routerState => {
            if (routerState) {
                this.routerState = routerState.state;
                if (this.routerState.url.indexOf('vinculacao-pessoa-usuario/listar') > -1) {
                    this.action = 'listar';
                }
                if (this.routerState.url.indexOf('vinculacao-pessoa-usuario/editar/criar') > -1) {
                    this.action = 'criar';
                }
                this._changeDetectorRef.markForCheck();
            }
        });
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
