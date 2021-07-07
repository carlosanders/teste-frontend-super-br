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
import {HistoricoListComponent} from './historico-list.component';
import {HistoricoService} from '@cdk/services/historico.service';
import {RouterModule, Routes} from '@angular/router';
import {HistoricoListStoreModule} from 'app/main/apps/processo/processo-edit/historico/historico-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/historico/historico-list/store/guards';
import {modulesConfig} from 'modules/modules-config';
import {CdkHistoricoGridModule} from '@cdk/components/historico/cdk-historico-grid/cdk-historico-grid.module';

const routes: Routes = [
    {
        path: '',
        component: HistoricoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/historico/historico-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        HistoricoListComponent
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

        HistoricoListStoreModule,
        CdkHistoricoGridModule,
    ],
    providers: [
        HistoricoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        HistoricoListComponent
    ]
})
export class ProcessoHistoricoListModule {
}
