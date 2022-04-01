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
import {AcompanhamentoListComponent} from './acompanhamento-list.component';
import {AcompanhamentoService} from '@cdk/services/acompanhamento.service';
import {RouterModule, Routes} from '@angular/router';
import {AcompanhamentoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkAcompanhamentoGridModule} from '@cdk/components/acompanhamento/cdk-acompanhamento-grid/cdk-acompanhamento-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {VinculacaoEtiquetaService} from '@cdk/services/vinculacao-etiqueta.service';

const routes: Routes = [
    {
        path: '',
        component: AcompanhamentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/acompanhamentos/acompanhamento-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AcompanhamentoListComponent
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

        CdkAcompanhamentoGridModule,

        AcompanhamentoListStoreModule,
        PathModule,
    ],
    providers: [
        AcompanhamentoService,
        VinculacaoEtiquetaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AcompanhamentoListComponent
    ]
})
export class AcompanhamentoListModule {
}
