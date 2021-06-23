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
import {ContatoListComponent} from './contato-list.component';
import {ContatoService} from '@cdk/services/contato.service';
import {RouterModule, Routes} from '@angular/router';
import {ContatoListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkContatoGridModule} from '@cdk/components/contato/cdk-contato-grid/cdk-contato-grid.module';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';
import {LoginService} from '../../../../../auth/login/login.service';

const routes: Routes = [
    {
        path: '',
        component: ContatoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/configuracoes/contato/contato-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ContatoListComponent
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

        CdkContatoGridModule,

        ContatoListStoreModule,
        PathModule,
    ],
    providers: [
        ContatoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        ContatoListComponent
    ]
})
export class ContatoListModule {
}
