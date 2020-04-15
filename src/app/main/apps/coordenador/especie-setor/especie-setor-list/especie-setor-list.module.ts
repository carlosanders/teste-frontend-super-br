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
import {EspecieSetorListComponent} from './especie-setor-list.component';
import {AfastamentoService} from '@cdk/services/afastamento.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {CdkEspecieSetorGridModule} from '@cdk/components/especie-setor/cdk-especie-setor-grid/cdk-especie-setor-grid.module';
import {EspecieSetorListStoreModule} from './store/store.module';

const routes: Routes = [
    {
        path: '',
        component: EspecieSetorListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        EspecieSetorListComponent
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

        EspecieSetorListStoreModule,
        CdkEspecieSetorGridModule,
    ],
    providers: [
        AfastamentoService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        EspecieSetorListComponent
    ]
})
export class EspecieSetorListModule {
}
