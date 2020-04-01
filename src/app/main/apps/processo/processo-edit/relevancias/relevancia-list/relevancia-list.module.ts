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
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {RelevanciaListComponent} from './relevancia-list.component';
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {RouterModule, Routes} from '@angular/router';
import {RelevanciaListStoreModule} from 'app/main/apps/processo/processo-edit/relevancias/relevancia-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/relevancias/relevancia-list/store/guards';
import {CdkRelevanciaGridModule} from '@cdk/components/relevancia/cdk-relevancia-grid/cdk-relevancia-grid.module';

const routes: Routes = [
    {
        path: '',
        component: RelevanciaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RelevanciaListComponent
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

        CdkRelevanciaGridModule,

        RelevanciaListStoreModule,
    ],
    providers: [
        RelevanciaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RelevanciaListComponent
    ]
})
export class RelevanciaListModule {
}
