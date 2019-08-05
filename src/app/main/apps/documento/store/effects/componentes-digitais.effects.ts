import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, switchMap} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import {DocumentoService} from '@cdk/services/documento.service';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';
import * as fromStore from '../index';

@Injectable()
export class ComponenteDigitalEffect {
    routerState: any;
    componenteDigitalId: number;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
        private _documentoService: DocumentoService,
        private _store: Store<State>
    ) {
        this._store
            .pipe(select(getRouterState))
            .subscribe(routerState => {
                if (routerState) {
                    this.routerState = routerState.state;
                }
            });
    }

    /**
     * Save ComponenteDigital
     * @type {Observable<any>}
     */
    @Effect()
    saveComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
                switchMap((action) => {
                    return this._componenteDigitalService.save(action.payload).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new AddData<ComponenteDigital>({data: [{...action.payload, ...response}], schema: componenteDigitalSchema}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criado com sucesso!`,
                                dateTime: response.criadoEm
                            }),
                            new fromStore.GetDocumentosVinculados()
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(err));
                        })
                    );
                })
            );

}
