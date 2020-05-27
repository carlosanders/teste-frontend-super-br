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
import {AdminCoordenadoresListComponent} from './admin-coordenadores-list.component';
import {CoordenadorService} from '@cdk/services/coordenador.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkCoordenadorGridModule} from '@cdk/components/coordenador/cdk-coordenador-grid/cdk-coordenador-grid.module';
import {AdminCoordenadoresListStoreModule} from './store/store.module';
import { LoginService } from '../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: AdminCoordenadoresListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        AdminCoordenadoresListComponent
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

        AdminCoordenadoresListStoreModule,
        CdkCoordenadorGridModule,
    ],
    providers: [
        CoordenadorService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AdminCoordenadoresListComponent
    ]
})
export class AdminCoordenadoresListModule {
}
