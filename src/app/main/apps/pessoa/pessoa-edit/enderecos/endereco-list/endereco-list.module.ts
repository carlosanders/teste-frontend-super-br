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
import {EnderecoListComponent} from './endereco-list.component';
import {EnderecoService} from '@cdk/services/endereco.service';
import {RouterModule, Routes} from '@angular/router';
import {EnderecoListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/enderecos/endereco-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-edit/enderecos/endereco-list/store/guards';
import {CdkEnderecoGridModule} from '@cdk/components/endereco/cdk-endereco-grid/cdk-endereco-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: EnderecoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/enderecos/endereco-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        EnderecoListComponent
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

        CdkEnderecoGridModule,

        EnderecoListStoreModule,
    ],
    providers: [
        EnderecoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        EnderecoListComponent
    ]
})
export class EnderecoListModule {
}
