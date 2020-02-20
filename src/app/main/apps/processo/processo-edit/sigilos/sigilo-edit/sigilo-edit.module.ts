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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {FuseSidebarModule} from '@fuse/components';

import {SigiloEditComponent} from './sigilo-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkSigiloFormModule} from '@cdk/components/sigilo/cdk-sigilo-form/cdk-sigilo-form.module';
import {SigiloEditStoreModule} from './store/store.module';
import {SigiloService} from '@cdk/services/sigilo.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':sigiloHandle',
        component: SigiloEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        SigiloEditComponent
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

        CdkSigiloFormModule,

        SigiloEditStoreModule,

        TranslateModule,

        FuseSharedModule,
        FuseSidebarModule,
    ],
    providers: [
        SigiloService,
        fromGuards.ResolveGuard
    ]
})
export class SigiloEditModule {
}
