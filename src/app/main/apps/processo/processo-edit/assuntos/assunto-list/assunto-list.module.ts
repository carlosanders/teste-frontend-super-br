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
import {AssuntoListComponent} from './assunto-list.component';
import {AssuntoService} from '@cdk/services/assunto.service';
import {RouterModule, Routes} from '@angular/router';
import {AssuntoListStoreModule} from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store/store.module';
import {AssuntoAdministrativoService} from '@cdk/services/assunto-administrativo.service';
import * as fromGuards from 'app/main/apps/processo/processo-edit/assuntos/assunto-list/store/guards';
import {CdkAssuntoGridModule} from '@cdk/components/assunto/cdk-assunto-grid/cdk-assunto-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: AssuntoListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/processo/processo-edit/assuntos/assunto-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AssuntoListComponent
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

        CdkAssuntoGridModule,

        AssuntoListStoreModule,
    ],
    providers: [
        AssuntoService,
        AssuntoAdministrativoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        AssuntoListComponent
    ]
})
export class AssuntoListModule {
}
