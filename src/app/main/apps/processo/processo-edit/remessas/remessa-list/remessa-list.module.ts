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
import {RemessaListComponent} from './remessa-list.component';
import {TramitacaoService} from '@cdk/services/tramitacao.service';
import {RouterModule, Routes} from '@angular/router';
import {RemessaListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkRemessaGridModule} from '@cdk/components/remessa/cdk-remessa-grid/cdk-remessa-grid.module';

const routes: Routes = [
    {
        path: '',
        component: RemessaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        RemessaListComponent
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

        CdkRemessaGridModule,

        RemessaListStoreModule,
    ],
    providers: [
        TramitacaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        RemessaListComponent
    ]
})
export class RemessaListModule {
}
