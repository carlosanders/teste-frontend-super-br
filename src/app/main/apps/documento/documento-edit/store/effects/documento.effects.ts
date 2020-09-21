import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, switchMap, tap, withLatestFrom} from 'rxjs/operators';

import {getRouterState, State} from 'app/store/reducers';
import * as DocumentoActions from '../actions/documento.actions';
import * as DocumentoSelectors from '../selectors/documento.selectors';

import {DocumentoService} from '@cdk/services/documento.service';
import {LoginService} from 'app/main/auth/login/login.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {documento as documentoSchema} from '@cdk/normalizr';
import {Documento} from '@cdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {ModeloService} from '@cdk/services/modelo.service';
import {RepositorioService} from '@cdk/services/repositorio.service';
import * as AssinaturaActions from '../../../store/actions/assinaturas.actions';
import {AssinaturaService} from '@cdk/services/assinatura.service';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

@Injectable()
export class DocumentoEffects {
    routerState: any;
    private _profile: any;

    /**
     *
     * @param _actions
     * @param _documentoService
     * @param _modeloService
     * @param _repositorioService
     * @param _assinaturaService
     * @param _loginService
     * @param _vinculacaoEtiquetaService
     * @param _router
     * @param _store
     * @param activatedRoute
     */
    constructor(
        private _actions: Actions,
        private _documentoService: DocumentoService,
        private _modeloService: ModeloService,
        private _repositorioService: RepositorioService,
        private _assinaturaService: AssinaturaService,
        public _loginService: LoginService,
        private _vinculacaoEtiquetaService: VinculacaoEtiquetaService,
        private _router: Router,
        private _store: Store<State>,
        public activatedRoute: ActivatedRoute
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });

        this._profile = _loginService.getUserProfile();
    }
}
