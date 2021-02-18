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
import * as fromGuards from './store/guards'
import {LoginService} from './login.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
        MatProgressSpinnerModule
    ],
    providers      : [
        LoginService,
        fromGuards.ResolveGuard
    ]
})
export class LoginModule {
}
