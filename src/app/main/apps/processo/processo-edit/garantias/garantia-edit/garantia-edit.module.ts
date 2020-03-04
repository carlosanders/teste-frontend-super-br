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

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {GarantiaEditComponent} from './garantia-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkGarantiaFormModule} from '@cdk/components/garantia/cdk-garantia-form/cdk-garantia-form.module';
import {GarantiaEditStoreModule} from './store/store.module';
import {GarantiaService} from '@cdk/services/garantia.service';

import * as fromGuards from './store/guards';

const routes: Routes = [
    {
        path: ':garantiaHandle',
        component: GarantiaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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
