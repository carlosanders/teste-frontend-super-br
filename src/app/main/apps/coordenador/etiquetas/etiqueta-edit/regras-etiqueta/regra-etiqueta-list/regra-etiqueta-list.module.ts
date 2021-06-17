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
import {RegraEtiquetaListComponent} from './regra-etiqueta-list.component';
import {RouterModule, Routes} from '@angular/router';
import {RegraEtiquetaListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {modulesConfig} from 'modules/modules-config';
import {CdkRegraEtiquetaGridModule} from '@cdk/components/regra-etiqueta/cdk-regra-etiqueta-grid/cdk-regra-etiqueta-grid.module';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: RegraEtiquetaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/etiquetas/etiqueta-edit/regras-etiqueta/regra-etiqueta-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RegraEtiquetaListComponent
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

        RegraEtiquetaListStoreModule,

        CdkRegraEtiquetaGridModule,
        PathModule,
    ],
    providers: [
        RegraEtiquetaService,
        fromGuards.ResolveGuard
    ]
})
export class RegraEtiquetaListModule {
}
