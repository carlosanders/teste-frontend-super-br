import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';

import {Observable, of} from 'rxjs';
import {catchError, mergeMap, map} from 'rxjs/operators';

import * as ComponenteDigitalActions from '../actions/componentes-digitais.actions';

import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {AddData} from '@cdk/ngrx-normalizr';
import {componenteDigital as componenteDigitalSchema} from '@cdk/normalizr/componente-digital.schema';
import {ComponenteDigital} from '@cdk/models/componente-digital.model';
import {select, Store} from '@ngrx/store';
import {getRouterState, State} from 'app/store/reducers';
import * as OperacoesActions from 'app/store/actions/operacoes.actions';

@Injectable()
export class ComponenteDigitalEffect {
    routerState: any;
    componenteDigitalId: number;

    constructor(
        private _actions: Actions,
        private _componenteDigitalService: ComponenteDigitalService,
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
     * Get ComponentesDigitais with router parameters
     * @type {Observable<any>}
     */
    @Effect()
    createComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.CreateComponenteDigital>(ComponenteDigitalActions.CREATE_COMPONENTE_DIGITAL),
                map(action => {

                    const componenteDigital = new ComponenteDigital();
                    componenteDigital.modelo = action.payload.modelo;
                    componenteDigital.tarefaOrigem = action.payload.tarefaOrigem;
                    componenteDigital.fileName = action.payload.modelo.nome + '.html';

                    return new ComponenteDigitalActions.SaveComponenteDigital(componenteDigital);
                }),
            );

    /**
     * Save ComponenteDigital
     * @type {Observable<any>}
     */
    @Effect()
    saveComponenteDigital: any =
        this._actions
            .pipe(
                ofType<ComponenteDigitalActions.SaveComponenteDigital>(ComponenteDigitalActions.SAVE_COMPONENTE_DIGITAL),
                mergeMap((action) => {
                    return this._componenteDigitalService.save(action.payload).pipe(
                        mergeMap((response: ComponenteDigital) => [
                            new ComponenteDigitalActions.SaveComponenteDigitalSuccess(response),
                            new AddData<ComponenteDigital>({data: [{...action.payload, ...response}], schema: componenteDigitalSchema}),
                            new OperacoesActions.Resultado({
                                type: 'componenteDigital',
                                content: `Componente Digital id ${response.id} criado com sucesso!`,
                                success: true,
                                dateTime: response.criadoEm
                            })
                        ]),
                        catchError((err) => {
                            console.log (err);
                            return of(new ComponenteDigitalActions.SaveComponenteDigitalFailed(action.payload));
                        })
                    );
                })
            );

}
