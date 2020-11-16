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
import {RegraListComponent} from './regra-list.component';
import {RouterModule, Routes} from '@angular/router';
import {RegraListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {RegraService} from '@cdk/services/regra.service';
import {modulesConfig} from 'modules/modules-config';
import {CdkRegraGridModule} from '@cdk/components/regra/cdk-regra-grid/cdk-regra-grid.module';

const routes: Routes = [
    {
        path: '',
        component: RegraListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/coordenador/etiquetas/etiqueta-edit/regras/regra-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RegraListComponent
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

        RegraListStoreModule,

        CdkRegraGridModule,
    ],
    providers: [
        RegraService,
        fromGuards.ResolveGuard
    ]
})
export class RegraListModule {
}
