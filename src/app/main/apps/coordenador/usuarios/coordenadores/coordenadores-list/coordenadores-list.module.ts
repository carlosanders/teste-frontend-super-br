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
import {CoordenadoresListComponent} from './coordenadores-list.component';
import {CoordenadorService} from '@cdk/services/coordenador.service';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {CdkCoordenadorGridModule} from '@cdk/components/coordenador/cdk-coordenador-grid/cdk-coordenador-grid.module';
import {AdminCoordenadoresListStoreModule} from './store/store.module';
import {LoginService} from '../../../../../auth/login/login.service';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: CoordenadoresListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        CoordenadoresListComponent
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
        PathModule,
    ],
    providers: [
        CoordenadorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        CoordenadoresListComponent
    ]
})
export class CoordenadoresListModule {
}
