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
import {TramitacaoListComponent} from './tramitacao-list.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {TramitacaoListStoreModule} from 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-list/store/store.module';
import * as fromGuards from 'app/main/apps/processo/processo-edit/tramitacoes/tramitacao-list/store/guards';
import {CdkTramitacaoGridModule} from '@cdk/components/tramitacao/cdk-tramitacao-grid/cdk-tramitacao-grid.module';

const routes: Routes = [
    {
        path: '',
        component: TramitacaoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        TramitacaoListComponent
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

        CdkTramitacaoGridModule,

        TramitacaoListStoreModule,
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TramitacaoListComponent
    ]
})
export class TramitacaoListModule {
}
