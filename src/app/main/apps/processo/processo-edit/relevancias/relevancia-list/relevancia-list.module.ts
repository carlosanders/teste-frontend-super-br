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
import {RelevanciaListComponent} from './relevancia-list.component';
import {RelevanciaService} from '@cdk/services/relevancia.service';
import {RouterModule, Routes} from '@angular/router';
import {RelevanciaListStoreModule} from 'app/main/apps/processo/processo-edit/relevancias/relevancia-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/relevancias/relevancia-list/store/guards';
import {CdkRelevanciaGridModule} from '@cdk/components/relevancia/cdk-relevancia-grid/cdk-relevancia-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RelevanciaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/relevancias/relevancia-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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
