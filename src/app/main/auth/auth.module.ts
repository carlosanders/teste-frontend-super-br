import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkLoginDialogComponent} from '@cdk/components/login/cdk-login-dialog/cdk-login-dialog.component';
import {CdkLoginFormComponent} from '@cdk/components/login/cdk-login-form/cdk-login-form.component';

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
    },
    {
        path: 'esqueci-senha',
        loadChildren: () => import('./esqueci-senha/esqueci-senha.module').then(m => m.EsqueciSenhaModule)
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
