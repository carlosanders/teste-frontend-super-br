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
import {CdkConfirmDialogComponent} from '@cdk/components/confirm-dialog/confirm-dialog.component';
import {CdkConfirmDialogModule} from '@cdk/components';
import {SnackBarDesfazerComponent} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.component';
import {SnackBarDesfazerModule} from '@cdk/components/snack-bar-desfazer/snack-bar-desfazer.module';

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
        CdkConfirmDialogModule,
        SnackBarDesfazerModule,

        CdkLoginFormModule
    ],
    providers      : [
        fromGuards.ResolveGuard
    ],
    entryComponents: [
        CdkLoginDialogComponent,
        CdkConfirmDialogComponent,
        SnackBarDesfazerComponent
    ]
})
export class LoginModule {
}
