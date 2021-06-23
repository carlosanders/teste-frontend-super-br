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
import {AdminAfastamentosListComponent} from './admin-afastamentos-list.component';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkAfastamentoGridModule} from '@cdk/components/afastamento/cdk-afastamento-grid/cdk-afastamento-grid.module';
import {AdminAfastamentosListStoreModule} from './store/store.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: AdminAfastamentosListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AdminAfastamentosListComponent
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

        AdminAfastamentosListStoreModule,
        CdkAfastamentoGridModule,
        PathModule,
    ],
    providers: [
        AfastamentoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AdminAfastamentosListComponent
    ]
})
export class AdminAfastamentosListModule {
}
