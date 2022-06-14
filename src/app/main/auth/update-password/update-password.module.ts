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
import {UpdatePasswordComponent} from './update-password.component';
import {UpdatePasswordStoreModule} from './store/store.module';
import {LoginStoreModule} from '../login/store/store.module';
import {UpdatePasswordService} from './services/update-password.service';
import * as fromGuards from './store/guards';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

const routes = [
    {
        path: '',
        component: UpdatePasswordComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        UpdatePasswordComponent
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
        UpdatePasswordStoreModule,
        LoginStoreModule,
        MatProgressSpinnerModule
    ],
    providers: [
        UpdatePasswordService,
        fromGuards.ResolveGuard
    ]

})
export class UpdatePasswordModule {
}
