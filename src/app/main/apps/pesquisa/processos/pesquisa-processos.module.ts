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
import {ProcessoService} from '@cdk/services/processo.service';
import {RouterModule, Routes} from '@angular/router';
import {CdkProcessoGridModule} from '@cdk/components/processo/cdk-processo-grid/cdk-processo-grid.module';
import {ProcessosComponent} from './processos.component';
import {ProcessosStoreModule} from './store/store.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ProcessosComponent
    }
];

const path = 'app/main/apps/pesquisa/processos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ProcessosComponent
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

        ProcessosStoreModule,

        TranslateModule,
        CdkSharedModule,

        CdkProcessoGridModule
    ],
    providers: [
        ProcessoService
    ],
    exports: [
        ProcessosComponent
    ]
})
export class PesquisaProcessosModule {
}
