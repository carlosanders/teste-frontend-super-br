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
import {HistoricoConfigListComponent} from './historico-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {CdkHistoricoGridModule} from '../../../../../../@cdk/components/historico/cdk-historico-grid/cdk-historico-grid.module';
import {HistoricoConfigListStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: HistoricoConfigListComponent
    }
];

const path = 'app/main/apps/configuracoes/historico/historico-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        HistoricoConfigListComponent
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

        CdkHistoricoGridModule,

        HistoricoConfigListStoreModule,
        PathModule,
    ],
    providers: [
        fromGuards.ResolveGuard
    ],
    exports: [
        HistoricoConfigListComponent
    ]
})
export class HistoricoConfigListModule {
}
