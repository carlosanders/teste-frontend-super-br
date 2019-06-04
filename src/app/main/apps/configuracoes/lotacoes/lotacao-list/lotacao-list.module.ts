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
import {LotacaoListComponent} from './lotacao-list.component';
import {LotacaoService} from '@cdk/services/lotacao.service';
import {RouterModule, Routes} from '@angular/router';
import {LotacaoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkLotacaoGridModule} from '@cdk/components/lotacao/cdk-lotacao-grid/cdk-lotacao-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: LotacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        LotacaoListComponent
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

        CdkLotacaoGridModule,

        LotacaoListStoreModule,
    ],
    providers: [
        LotacaoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        LotacaoListComponent
    ]
})
export class LotacaoListModule {
}