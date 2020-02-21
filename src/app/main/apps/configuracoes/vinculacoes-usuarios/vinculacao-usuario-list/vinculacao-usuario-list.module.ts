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
import {VinculacaoUsuarioListComponent} from './vinculacao-usuario-list.component';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoUsuarioListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkVinculacaoUsuarioGridModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-grid/cdk-vinculacao-usuario-grid.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoUsuarioListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [
        VinculacaoUsuarioListComponent
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

        CdkVinculacaoUsuarioGridModule,

        VinculacaoUsuarioListStoreModule,
    ],
    providers: [
        VinculacaoUsuarioService,
        LoginService,
        fromGuards.ResolveGuard
    ],
    exports: [
        VinculacaoUsuarioListComponent
    ]
})
export class VinculacaoUsuarioListModule {
}
