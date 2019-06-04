import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from 'app/main/auth/login/store/reducers';
import { effects } from 'app/main/auth/login/store/effects';

@NgModule({
    imports  : [
        StoreModule.forFeature('login-app', reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: []
})
export class LoginStoreModule
{
}
