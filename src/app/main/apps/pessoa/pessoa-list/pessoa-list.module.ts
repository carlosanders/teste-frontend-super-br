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
import {PessoaListComponent} from './pessoa-list.component';
import {PessoaService} from '@cdk/services/pessoa.service';
import {RouterModule, Routes} from '@angular/router';
import {PessoaListStoreModule} from 'app/main/apps/pessoa/pessoa-list/store/store.module';
import {CdkPessoaGridModule} from '@cdk/components/pessoa/cdk-pessoa-grid/cdk-pessoa-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: PessoaListComponent
    }
];

const path = 'app/main/apps/pessoa/pessoa-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        PessoaListComponent
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

        CdkPessoaGridModule,

        PessoaListStoreModule,
    ],
    providers: [
        PessoaService
    ],
    exports: [
        PessoaListComponent
    ]
})
export class PessoaListModule {
}
