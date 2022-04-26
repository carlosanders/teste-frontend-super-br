import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {tap} from 'rxjs/operators';
import * as MercureActions from 'app/store/actions/mercure.action';
import {Observable} from 'rxjs';
import {AddData} from '@cdk/ngrx-normalizr';
import * as models from '@cdk/models';
import * as schemas from '@cdk/normalizr';
import {plainToClass} from 'class-transformer';
import {Store} from '@ngrx/store';
import {State} from '../reducers';
import {GetNotificacaoSuccess, SetCount, SnackbarExibirNotificacao} from '../actions';

@Injectable()
export class MercureEffects {

    message: Observable<any> = createEffect(() => this._actions.pipe(
        ofType<MercureActions.Message>(MercureActions.MESSAGE),
        tap((action): any => {
            if (action.payload.type === 'addData') {
                try {
                    const modelClass = models[action.payload.content['@type']];
                    const data = <typeof modelClass>plainToClass(modelClass, action.payload.content);
                    const schema = schemas[action.payload.content['@type'].replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()]

                    this._store.dispatch(new AddData<typeof modelClass>({
                        data: [data],
                        schema: schema
                    }));
                } catch (err) {
                    // não faz nada... push veio de outro module
                }

                switch (action.payload.content['@type']) {
                    case 'Notificacao':
                        this._store.dispatch(new GetNotificacaoSuccess(action.payload.content));

                        if (action.payload.content.dataHoraLeitura == null) {
                            this._store.dispatch(new SnackbarExibirNotificacao({
                                exibir: true,
                                notificacao: plainToClass(models.Notificacao, action.payload.content)
                            }));
                        }
                        break;
                }
            }

            if (action.payload.type === 'counter') {
                this._store.dispatch(new SetCount(action.payload.content));
            }
        })
    ), {dispatch: false});

    /**
     * Constructor
     */
    constructor(
        private _actions: Actions,
        private _store: Store<State>
    ) {
    }

}
