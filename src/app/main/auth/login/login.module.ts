import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule
} from '@cdk/angular/material';
import {HttpClientModule} from '@angular/common/http';
import {CdkSharedModule} from '@cdk/shared.module';
import {LoginComponent} from './login.component';
import {LoginStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {LoginService} from './login.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {CdkLoginFormModule} from '@cdk/components/login/cdk-login-form/cdk-login-form.module';
import {MatDialogModule} from '@angular/material/dialog';
import {CdkLoginDialogComponent} from '@cdk/components/login/cdk-login-dialog/cdk-login-dialog.component';
import {CdkLoginFormComponent} from '@cdk/components/login/cdk-login-form/cdk-login-form.component';

const routes = [
    {
        path: '',
        component: LoginComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        HttpClientModule,

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressBarModule,
        CdkSharedModule,
        LoginStoreModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatDialogModule,

        CdkLoginFormModule
    ],
    providers      : [
        LoginService,
        fromGuards.ResolveGuard
    ],
    entryComponents: [
        CdkLoginDialogComponent
    ]
})
export class LoginModule {
}
