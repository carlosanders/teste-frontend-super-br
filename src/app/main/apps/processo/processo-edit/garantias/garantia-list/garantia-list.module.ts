import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {GarantiaListComponent} from './garantia-list.component';
import {GarantiaService} from '@cdk/services/garantia.service';
import {RouterModule, Routes} from '@angular/router';
import {GarantiaListStoreModule} from 'app/main/apps/processo/processo-edit/garantias/garantia-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/garantias/garantia-list/store/guards';
import {CdkGarantiaGridModule} from '@cdk/components/garantia/cdk-garantia-grid/cdk-garantia-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: GarantiaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/garantias/garantia-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        GarantiaListComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        TranslateModule,

        CdkSharedModule,

        CdkGarantiaGridModule,

        GarantiaListStoreModule,
    ],
    providers: [
        GarantiaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        GarantiaListComponent
    ]
})
export class GarantiaListModule {
}
