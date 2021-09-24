import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, concatMap} from 'rxjs/operators';
import {State} from 'app/store/reducers';
import * as fromStore from '../index';
import {EmailClientService} from '../../services/email-client.service';

@Injectable()
export class FolderEffects {

    constructor(private _actions: Actions,
                private _store: Store<State>,
                private _emailClientService: EmailClientService)
    {
    }

    getFolders: Observable<any> = createEffect(() => {
        return this._actions
            .pipe(
                ofType<fromStore.GetFolders>(fromStore.GET_FOLDERS),
                concatMap(
                    action => this._emailClientService.getDefaultFolders(action.payload)
                        .pipe(
                            concatMap(response => [
                                new fromStore.GetFoldersSuccess({
                                    folders: response['entities'],
                                    total: response['total'],
                                    contaEmailId: action.payload
                                })
                            ]),
                            catchError((err) => {
                                return of(new fromStore.GetFoldersFailed(err));
                            })
                        )
                )
            );
    });

}
