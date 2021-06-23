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
import {TramitacaoListComponent} from './tramitacao-list.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {TramitacaoListStoreModule} from 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-list/store/guards';
import {CdkTramitacaoGridModule} from '@cdk/components/tramitacao/cdk-tramitacao-grid/cdk-tramitacao-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: TramitacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TramitacaoListComponent
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

        CdkTramitacaoGridModule,

        TramitacaoListStoreModule,
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TramitacaoListComponent
    ]
})
export class TramitacaoListModule {
}
