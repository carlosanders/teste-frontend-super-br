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
import {VinculacaoPessoaBarramentoListComponent} from './vinculacao-pessoa-barramento-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards/';
import {VinculacaoPessoaBarramentoService} from "@cdk/services/vinculacao-pessoa-barramento.service";
import {CdkVinculacaoPessoaBarramentoGridModule} from "@cdk/components/vinculacao-pessoa-barramento/cdk-vinculacao-pessoa-barramento-grid/cdk-vinculacao-pessoa-barramento-grid.module";
import {VinculacaoPessoaBarramentoListStoreModule} from "./store/store.module";

const routes: Routes = [
    {
        path: '',
        component: VinculacaoPessoaBarramentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VinculacaoPessoaBarramentoListComponent
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

        CdkVinculacaoPessoaBarramentoGridModule,

        VinculacaoPessoaBarramentoListStoreModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        VinculacaoPessoaBarramentoListComponent
    ]
})
export class VinculacaoPessoaBarramentoListModule {
}
