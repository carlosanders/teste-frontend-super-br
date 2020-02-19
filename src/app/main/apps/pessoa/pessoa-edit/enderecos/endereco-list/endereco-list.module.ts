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

import {FuseSharedModule} from '@fuse/shared.module';
import {EnderecoListComponent} from './endereco-list.component';
import {EnderecoService} from '@cdk/services/endereco.service';
import {RouterModule, Routes} from '@angular/router';
import {EnderecoListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/enderecos/endereco-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-edit/enderecos/endereco-list/store/guards';
import {CdkEnderecoGridModule} from '@cdk/components/endereco/cdk-endereco-grid/cdk-endereco-grid.module';

const routes: Routes = [
    {
        path: '',
        component: EnderecoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,

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
