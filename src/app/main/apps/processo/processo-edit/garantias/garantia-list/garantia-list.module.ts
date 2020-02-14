import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatAutocompleteModule,
    MatExpansionModule
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {GarantiaListComponent} from './garantia-list.component';
import {GarantiaService} from '@cdk/services/garantia.service';
import {RouterModule, Routes} from '@angular/router';
import {GarantiaListStoreModule} from 'app/main/apps/processo/processo-edit/garantias/garantia-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/garantias/garantia-list/store/guards';
import {CdkGarantiaGridModule} from '@cdk/components/garantia/cdk-garantia-grid/cdk-garantia-grid.module';

const routes: Routes = [
    {
        path: '',
        component: GarantiaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,

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
