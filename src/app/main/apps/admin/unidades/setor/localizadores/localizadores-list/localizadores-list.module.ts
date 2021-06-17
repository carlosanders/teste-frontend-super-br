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
import {LocalizadoresListComponent} from './localizadores-list.component';
import {LocalizadorService} from '@cdk/services/localizador.service';
import {RouterModule, Routes} from '@angular/router';
import {RootLocalizadoresListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkLocalizadorGridModule} from '@cdk/components/localizador/cdk-localizador-grid/cdk-localizador-grid.module';
import {LoginService} from '../../../../../../auth/login/login.service';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: LocalizadoresListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/unidades/setor/localizadores/localizadores-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        LocalizadoresListComponent
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
        CdkLocalizadorGridModule,
        RootLocalizadoresListStoreModule,
        PathModule,
    ],
    providers: [
        LocalizadorService,
        fromGuards.ResolveGuard
    ],
    exports: [
        LocalizadoresListComponent
    ]
})
export class LocalizadoresListModule {
}
