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
import {TransicaoListComponent} from './transicao-list.component';
import {TransicaoService} from '@cdk/services/transicao.service';
import {RouterModule, Routes} from '@angular/router';
import {TransicaoListStoreModule} from 'app/main/apps/processo/processo-edit/transicoes/transicao-list/store/store.module';
import {ModalidadeTransicaoService} from '@cdk/services/modalidade-transicao.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/transicoes/transicao-list/store/guards';
import {CdkTransicaoGridModule} from '@cdk/components/transicao/cdk-transicao-grid/cdk-transicao-grid.module';

const routes: Routes = [
    {
        path: '',
        component: TransicaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

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
