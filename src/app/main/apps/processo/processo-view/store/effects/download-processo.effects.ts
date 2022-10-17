import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {ProcessoService} from '@cdk/services/processo.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';

import {getRouterState, RouterStateUrl, State} from 'app/store/reducers';

import {of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';
import * as fromStore from '../index';

@Injectable()
export class DownloadProcessoEffects {
    routerState: RouterStateUrl;

    constructor(
        private _actions: Actions,
        private _store: Store<State>,
        private _router: Router,
        private _snackBar: MatSnackBar,
        private _processoService: ProcessoService,
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }

    downloadProcesso: any = createEffect(() => this._actions.pipe(
        ofType<fromStore.DownloadProcesso>(fromStore.DOWNLOAD_PROCESSO),
        switchMap((action) => {
            let handle = {
                id: '',
                value: ''
            };
            const routeParams = of('processoHandle');
            routeParams.subscribe((param) => {
                if (this.routerState.params[param]) {
                    handle = {
                        id: param,
                        value: this.routerState.params[param]
                    };
                }
            });
            return this._processoService.download(
                handle.value,
                (action.payload?.sequencial ? action.payload?.sequencial : 'all'),
                action.payload.tipoDownload
            );
        }),
        tap((response) => {
            this._store.dispatch(new fromStore.DownloadProcessoSuccess(response));
            this._store.dispatch(new fromStore.UnloadSelectedJuntadasId());
            this._store.dispatch(new fromStore.SetActiveCard('juntadas'));

            this._snackBar.open(
                'O download será gerado em segundo plano e você será notificado quando pronto!',
                'Fechar',
                {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top',
                    panelClass: ['cdk-white-bg', 'processo-download-snackbar']
                }
            );
        }),
        catchError((err , caught) => {
            this._store.dispatch(new fromStore.DownloadProcessoFailed(err))
            return caught
        })
    ), {dispatch: false});
}
