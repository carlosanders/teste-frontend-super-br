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
import {RelacionamentoListComponent} from './relacionamento-list.component';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {RouterModule, Routes} from '@angular/router';
import {RelacionamentoListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/relacionamentos/relacionamento-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-edit/relacionamentos/relacionamento-list/store/guards';
import {CdkRelacionamentoPessoalGridModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-grid/cdk-relacionamento-pessoal-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RelacionamentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/relacionamentos/relacionamento-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelacionamentoListComponent
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

        CdkRelacionamentoPessoalGridModule,

        RelacionamentoListStoreModule,
    ],
    providers: [
        RelacionamentoPessoalService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RelacionamentoListComponent
    ]
})
export class RelacionamentoListModule {
}
