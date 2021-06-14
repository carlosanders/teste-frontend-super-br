import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {ProcessoService} from '@cdk/services/processo.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';
import {select, Store} from '@ngrx/store';


import {getRouterState, State} from 'app/store/reducers';
import {Router} from '@angular/router';

@Injectable()
export class ArquivistaDetailEffects {
    routerState: any;

    constructor(
        private _actions: Actions,
        private _processoService: ProcessoService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _store: Store<State>,
        private _router: Router
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe((routerState) => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }


}
