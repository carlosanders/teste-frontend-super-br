import {NgModule} from '@angular/core';

import {LoginModule} from 'app/main/auth/login/login.module';
import {LoginStoreModule} from './login/store/store.module';
import {RouterModule} from '@angular/router';
import {CdkSharedModule} from '../../../@cdk/shared.module';


const routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    }
];

@NgModule({
    /*imports: [
        // Authentication
        LoginModule,
        LoginStoreModule
    ]*/

    imports     : [
        RouterModule.forChild(routes),
        CdkSharedModule,
    ]
})
export class AuthModule {

}
