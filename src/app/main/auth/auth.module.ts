import {NgModule} from '@angular/core';

import {LoginModule} from 'app/main/auth/login/login.module';
import {LoginStoreModule} from './login/store/store.module';

@NgModule({
    imports: [
        // Authentication
        LoginModule,
        LoginStoreModule
    ]
})
export class AuthModule {

}
