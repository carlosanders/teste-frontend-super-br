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
import {GrupoContatoListComponent} from './grupo-contato-list.component';
import {GrupoContatoService} from '@cdk/services/grupo-contato.service';
import {RouterModule, Routes} from '@angular/router';
import {GrupoContatoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkGrupoContatoGridModule} from '@cdk/components/grupo-contato/cdk-grupo-contato-grid/cdk-grupo-contato-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {LoginService} from '../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: GrupoContatoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/grupo-contato/grupo-contato-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        GrupoContatoListComponent
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

        CdkGrupoContatoGridModule,

        GrupoContatoListStoreModule,
        PathModule,
    ],
    providers: [
        GrupoContatoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        GrupoContatoListComponent
    ]
})
export class GrupoContatoListModule {
}
