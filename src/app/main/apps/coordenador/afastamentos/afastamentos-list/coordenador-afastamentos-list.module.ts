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
import {CoordenadorAfastamentosListComponent} from './coordenador-afastamentos-list.component';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkAfastamentoGridModule} from '@cdk/components/afastamento/cdk-afastamento-grid/cdk-afastamento-grid.module';
import {CoordenadorAfastamentosListStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: CoordenadorAfastamentosListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        CoordenadorAfastamentosListComponent
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

        CoordenadorAfastamentosListStoreModule,
        CdkAfastamentoGridModule,
    ],
    providers: [
        AfastamentoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CoordenadorAfastamentosListComponent
    ]
})
export class CoordenadorAfastamentosListModule {
}
