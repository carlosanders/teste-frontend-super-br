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
import {AdminLotacaoListComponent} from './admin-lotacao-list.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {RootLotacaoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkLotacaoGridModule} from '@cdk/components/lotacao/cdk-lotacao-grid/cdk-lotacao-grid.module';
import {LoginService} from '../../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: AdminLotacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AdminLotacaoListComponent
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

        CdkLotacaoGridModule,

        RootLotacaoListStoreModule,
    ],
    providers: [
        LotacaoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AdminLotacaoListComponent
    ]
})
export class AdminLotacaoListModule {
}
