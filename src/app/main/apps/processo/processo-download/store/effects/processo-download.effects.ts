import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as ProcessoDownloadActions
    from 'app/main/apps/processo/processo-download/store/actions/processo-download.actions';

import {ProcessoService} from '@cdk/services/processo.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable()
export class ProcessoDownloadEffect {
    routerState: any;
    /**
     * @type {Observable<any>}
     */
    downloadProcesso: any = createEffect(() => this._actions.pipe(
        ofType<ProcessoDownloadActions.DownloadProcesso>(ProcessoDownloadActions.DOWNLOAD_PROCESSO),
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
            this._store.dispatch(new ProcessoDownloadActions.DownloadProcessoSuccess(response));

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
            this._store.dispatch(new ProcessoDownloadActions.DownloadProcessoFailed(err))
            return caught
        })
    ), {dispatch: false});

    /**
     * @param _actions
     * @param _processoService
     * @param _store
     * @param _snackBar
     */
    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _store: Store<State>,
        private _snackBar: MatSnackBar
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });

    }
}
