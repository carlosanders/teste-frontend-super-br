import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {filter, tap} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as AssinaturaActions from 'app/store/actions/assinatura.actions';
import * as fromStore from '../';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {DocumentoService} from '@cdk/services/documento.service';

@Injectable()
export class AssinaturasEffects {
    routerState: any;
    /**
     * Ações relacionadas a assinatura de minutas com sucesso
     */
    assinaDocumentoSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_SUCCESS),
        tap(action => this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload)))
    ), {dispatch: false});
    /**
     * Ações referentes a sucesso na assinatura eletrônica de componente digital
     */
    assinaDocumentoEletronicamenteSuccess: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.AssinaDocumentoEletronicamenteSuccess>(AssinaturaActions.ASSINA_DOCUMENTO_ELETRONICAMENTE_SUCCESS),
        tap(action => this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload)))
    ), {dispatch: false});
    /**
     * Ações relacionadas a remoção de assinatura de documento bem sucedida
     */
    removeAssinaturaDocumento: any = createEffect(() => this._actions.pipe(
        ofType<AssinaturaActions.RemoveAssinaturaDocumentoSuccess>(AssinaturaActions.REMOVE_ASSINATURA_DOCUMENTO_SUCCESS),
        tap(action => this._store.dispatch(new fromStore.AtualizaEtiquetaMinuta(action.payload)))
    ), {dispatch: false});

    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _assinaturaService: AssinaturaService,
        private _store: Store<State>
    ) {
        this._store.pipe(
            select(getRouterState),
            filter(routerState => !!routerState)
        ).subscribe((routerState) => {
            this.routerState = routerState.state;
        });
    }
}
