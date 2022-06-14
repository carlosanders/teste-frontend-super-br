import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfigModuloEditAdminComponent} from './config-modulo-edit-admin.component';
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
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {CdkSidebarModule} from '../../../../../../@cdk/components';
import {BreadcrumbsModule} from '../../../../../../@cdk/components/breadcrumbs/breadcrumbs.module';
import {ConfigModuloService} from '../../../../../../@cdk/services/config-modulo.service';
import {
    CdkConfigModuloFormModule
} from '../../../../../../@cdk/components/config-modulo/cdk-config-modulo-form/cdk-config-modulo-form.module';
import {ConfigModuleEditStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: ':configModuleHandle',
        component: ConfigModuloEditAdminComponent,
        canActivate: [fromGuards.ResolveGuard],
        data: {
            breadcrumb: {
                label: 'config-modulo-admin {{configModuleHandle}}',
                url: '',
                module: 'admin'
            }
        }
    }
];

const path = 'app/main/apps/admin/config-modulo/config-modulo-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ConfigModuloEditAdminComponent],
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
        CdkSharedModule,
        BreadcrumbsModule,
        ConfigModuleEditStoreModule,
        CdkConfigModuloFormModule
    ],
    providers: [
        ResolveGuard,
        ConfigModuloService
    ]
})
export class ConfigModuloEditAdminModule {
}
