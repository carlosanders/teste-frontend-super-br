import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';

import {environment} from 'environments/environment';
import {reducers, effects, CustomSerializer} from 'app/store';

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, {
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot(effects),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        StoreRouterConnectingModule.forRoot()
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        }
    ]
})

export class AppStoreModule {
}
