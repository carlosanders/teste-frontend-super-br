import {NgModule} from '@angular/core';

import {LoginModule} from 'app/main/auth/login/login.module';
import {LoginStoreModule} from './login/store/store.module';
import {EsqueciSenhaModule} from './esqueci-senha/esqueci-senha.module';
import {EsqueciSenhaStoreModule} from './esqueci-senha/store/store.module';
import {RouterModule} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

const routes = [
    {
        path: 'login',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'esqueci-senha',
        loadChildren: () => import('./esqueci-senha/esqueci-senha.module').then(m => m.EsqueciSenhaModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CdkSharedModule,
        // Authentication
        LoginModule,
        EsqueciSenhaModule,
    ]
})
export class AuthModule {
}
