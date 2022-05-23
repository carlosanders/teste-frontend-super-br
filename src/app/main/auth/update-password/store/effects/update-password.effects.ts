import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import * as UpdatePasswordActions from '../actions/update-password.actions';
import {UpdatePasswordService} from '../../services/update-password.service';

@Injectable()
export class UpdatePasswordEffects {

    updatePassword: Observable<UpdatePasswordActions.UpdatePasswordActionsAll> = createEffect(() => this._actions.pipe(
        ofType<UpdatePasswordActions.UpdatePassword>(UpdatePasswordActions.UPDATE_PASSWORD),
        switchMap(action => this._updatePasswordService.updatePassword(action.payload.token, action.payload.oldPassword, action.payload.newPassword)
            .pipe(
                map(data => new UpdatePasswordActions.UpdatePasswordSuccess(data)),
                catchError((error) => {
                    return of(new UpdatePasswordActions.UpdatePasswordFailed(error));
                })
            )
        )
    ));

    constructor(
        private _actions: Actions,
        private _router: Router,
        private _updatePasswordService: UpdatePasswordService
    ) {
    }

}
