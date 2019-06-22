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
} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {FuseSharedModule} from '@fuse/shared.module';
import {RelacionamentoListComponent} from './relacionamento-list.component';
import {RelacionamentoPessoalService} from '@cdk/services/relacionamento-pessoal.service';
import {RouterModule, Routes} from '@angular/router';
import {RelacionamentoListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/relacionamentos/relacionamento-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-edit/relacionamentos/relacionamento-list/store/guards';
import {CdkRelacionamentoPessoalGridModule} from '@cdk/components/relacionamento-pessoal/cdk-relacionamento-pessoal-grid/cdk-relacionamento-pessoal-grid.module';

const routes: Routes = [
    {
        path: '',
        component: RelacionamentoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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

        FuseSharedModule,

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
