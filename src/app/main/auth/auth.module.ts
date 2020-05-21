import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';


const routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
    },
    {
        path: 'activate',
        loadChildren: () => import('./activate/activate.module').then(m => m.ActivateModule)
    }
];

@NgModule({
    imports     : [
        RouterModule.forChild(routes),
        CdkSharedModule,
    ]
})
export class AuthModule {

}
