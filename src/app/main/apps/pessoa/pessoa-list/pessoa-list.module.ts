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
import {PessoaListComponent} from './pessoa-list.component';
import {PessoaService} from '@cdk/services/pessoa.service';
import {RouterModule, Routes} from '@angular/router';
import {PessoaListStoreModule} from 'app/main/apps/pessoa/pessoa-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-list/store/guards';
import {CdkPessoaGridModule} from '@cdk/components/pessoa/cdk-pessoa-grid/cdk-pessoa-grid.module';

const routes: Routes = [
    {
        path: '',
        component: PessoaListComponent
    }
];

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
        PessoaService,
        fromGuards.ResolveGuard
    ],
    exports: [
        PessoaListComponent
    ]
})
export class PessoaListModule {
}
