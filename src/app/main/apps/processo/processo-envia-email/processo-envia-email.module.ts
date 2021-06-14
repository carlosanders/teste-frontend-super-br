import {NgModule} from '@angular/core';
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

import {ProcessoEnviaEmailComponent} from './processo-envia-email.component';
import {RouterModule, Routes} from '@angular/router';
import {EnviaEmailStoreModule} from './store/store.module';
import {CdkEnviaEmailFormModule} from '@cdk/components/juntada/cdk-envia-email-form/cdk-envia-email-form.module';
import {modulesConfig} from 'modules/modules-config';
import * as fromGuards from './store/guards';
import {JuntadaService} from '@cdk/services/juntada.service';

const routes: Routes = [
    {
        path: ':juntadaHandle',
        component: ProcessoEnviaEmailComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-view/envia-email';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessoEnviaEmailComponent
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

        CdkEnviaEmailFormModule,

        TranslateModule,

        EnviaEmailStoreModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        fromGuards.ResolveGuard,
        JuntadaService
    ]
})
export class ProcessoEnviaEmailModule {
}
