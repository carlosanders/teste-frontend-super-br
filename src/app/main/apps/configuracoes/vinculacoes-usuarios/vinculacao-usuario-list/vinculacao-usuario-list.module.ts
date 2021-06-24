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
import {VinculacaoUsuarioListComponent} from './vinculacao-usuario-list.component';
import {VinculacaoUsuarioService} from '@cdk/services/vinculacao-usuario.service';
import {RouterModule, Routes} from '@angular/router';
import {VinculacaoUsuarioListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkVinculacaoUsuarioGridModule} from '@cdk/components/vinculacao-usuario/cdk-vinculacao-usuario-grid/cdk-vinculacao-usuario-grid.module';
import {LoginService} from '../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: VinculacaoUsuarioListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/vinculacoes-usuarios/vinculacao-usuario-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

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

        CdkSharedModule,

        CdkVinculacaoUsuarioGridModule,

        VinculacaoUsuarioListStoreModule,
        PathModule,
    ],
    providers: [
        VinculacaoUsuarioService,
        fromGuards.ResolveGuard
    ],
    exports: [
        VinculacaoUsuarioListComponent
    ]
})
export class VinculacaoUsuarioListModule {
}
