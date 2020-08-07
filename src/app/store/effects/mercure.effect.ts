import {Injectable} from '@angular/core';
import {Effect, Actions, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';
import * as MercureActions from 'app/store/actions/mercure.action';
import {Observable, of} from 'rxjs';
import {AddData} from '../../../@cdk/ngrx-normalizr';
import {Notificacao, OrigemDados} from '../../../@cdk/models';
import {
    notificacao as notificacaoSchema,
    origemDados as origemDadosSchema
} from '../../../@cdk/normalizr';
import {plainToClass} from 'class-transformer';

@Injectable()
export class MercureEffects {

    /**
     * Constructor
     */
    constructor(
        private _actions$: Actions
    ) {}

    @Effect()
    message: Observable<any> =
        this._actions$
            .pipe(
                ofType<MercureActions.Message>(MercureActions.MESSAGE),
                switchMap((action): any => {
                    if (typeof action.payload.message?.addData !== undefined) {
                        switch (action.payload.message.addData.type) {
                            case 'Notificacao':
                                return new AddData<Notificacao>({data: [plainToClass(Notificacao, action.payload.message.addData)], schema: notificacaoSchema});
                            case 'OrigemDados':
                                return new AddData<OrigemDados>({data: [plainToClass(OrigemDados, action.payload.message.addData)], schema: origemDadosSchema});
                        }
                    }
                    return of(false);
                })
            );


}
