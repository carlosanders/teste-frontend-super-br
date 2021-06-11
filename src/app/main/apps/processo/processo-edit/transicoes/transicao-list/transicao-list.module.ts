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
import {TransicaoListComponent} from './transicao-list.component';
import {TransicaoService} from '@cdk/services/transicao.service';
import {RouterModule, Routes} from '@angular/router';
import {TransicaoListStoreModule} from 'app/main/apps/processo/processo-edit/transicoes/transicao-list/store/store.module';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/transicoes/transicao-list/store/guards';
import {CdkTransicaoGridModule} from '@cdk/components/transicao/cdk-transicao-grid/cdk-transicao-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: TransicaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/transicoes/transicao-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TransicaoListComponent
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

        CdkTransicaoGridModule,

        TransicaoListStoreModule,
    ],
    providers: [
        TransicaoService,
        ModalidadeTransicaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TransicaoListComponent
    ]
})
export class TransicaoListModule {
}
