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

import {GarantiaEditComponent} from './garantia-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkGarantiaFormModule} from '@cdk/components/garantia/cdk-garantia-form/cdk-garantia-form.module';
import {GarantiaEditStoreModule} from './store/store.module';
import {GarantiaService} from '@cdk/services/garantia.service';

import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: ':garantiaHandle',
        component: GarantiaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/garantias/garantia-edit';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        GarantiaEditComponent
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

        CdkGarantiaFormModule,

        GarantiaEditStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        GarantiaService,
        fromGuards.ResolveGuard
    ]
})
export class GarantiaEditModule {
}
