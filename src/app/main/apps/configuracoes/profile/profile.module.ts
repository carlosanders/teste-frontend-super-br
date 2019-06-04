import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {ProfileComponent} from './profile.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkProfileFormModule} from '@cdk/components/profile/cdk-profile-form/cdk-profile-form.module';
import {ProfileStoreModule} from './store/store.module';
import {LoginService} from '../../../auth/login/login.service';


const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
    }
];

@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,

        CdkProfileFormModule,

        ProfileStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        LoginService
    ]
})
export class ProfileModule {
}
