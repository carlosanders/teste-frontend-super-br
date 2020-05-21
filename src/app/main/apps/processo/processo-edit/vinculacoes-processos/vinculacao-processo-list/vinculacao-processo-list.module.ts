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
import {VinculacaoProcessoListComponent} from './vinculacao-processo-list.component';
import {VinculacaoProcessoService} from '@cdk/services/vinculacao-processo.service';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoProcessoListStoreModule} from 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-list/store/store.module';
import {ModalidadeVinculacaoProcessoService} from '@cdk/services/modalidade-vinculacao-processo.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-list/store/guards';
import {CdkVinculacaoProcessoGridModule} from '@cdk/components/vinculacao-processo/cdk-vinculacao-processo-grid/cdk-vinculacao-processo-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoProcessoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/vinculacoes-processos/vinculacao-processo-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VinculacaoProcessoListComponent
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

        CdkVinculacaoProcessoGridModule,

        VinculacaoProcessoListStoreModule,
    ],
    providers: [
        VinculacaoProcessoService,
        ModalidadeVinculacaoProcessoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        VinculacaoProcessoListComponent
    ]
})
export class VinculacaoProcessoListModule {
}
