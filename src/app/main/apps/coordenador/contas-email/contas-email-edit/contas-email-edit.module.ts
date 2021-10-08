import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ContasEmailEditComponent} from './contas-email-edit.component';
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
import {ContaEmailEditStoreModule} from './store/store.module';
import {ContaEmailService} from '@cdk/services/conta-email.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {CdkContaEmailFormModule} from '@cdk/components/conta-email/cdk-conta-email-form/cdk-conta-email-form.module';

const routes: Routes = [
    {
        path: ':contaEmailHandle',
        component: ContasEmailEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/contas-email/contas-email-edit';

modulesConfig.forEach((module) => {
    if (module['routes'].hasOwnProperty(path)) {
        module['routes'][path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ContasEmailEditComponent],
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
        ContaEmailEditStoreModule,
        CdkContaEmailFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        ContaEmailService,
    ]
})
export class ContasEmailEditModule {
}
