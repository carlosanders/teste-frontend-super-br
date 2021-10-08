import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServidorEmailEditComponent} from './servidor-email-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {ServidorEmailEditStoreModule} from './store/store.module';
import {ServidorEmailService} from '@cdk/services/servidor-email.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {CdkServidorEmailFormModule} from '@cdk/components/servidor-email/cdk-servidor-email-form/cdk-servidor-email-form.module';

const routes: Routes = [
    {
        path: ':servidorEmailHandle',
        component: ServidorEmailEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/servidor-email/servidor-email-edit';

modulesConfig.forEach((module) => {
    if (module['routes'].hasOwnProperty(path)) {
        module['routes'][path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ServidorEmailEditComponent],
    imports: [
        CommonModule,
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


        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        ServidorEmailEditStoreModule,
        CdkServidorEmailFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        ServidorEmailService,
    ]
})
export class ServidorEmailEditModule {
}
