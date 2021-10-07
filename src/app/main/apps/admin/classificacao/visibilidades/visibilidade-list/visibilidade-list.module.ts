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
import {VisibilidadeListComponent} from './visibilidade-list.component';
import {RouterModule, Routes} from '@angular/router';
import {VisibilidadeListStoreModule} from './store/store.module';
import * as fromGuards from './store/guards';
import {CdkVisibilidadeListModule} from '@cdk/components/visibilidade/cdk-visibilidade-list/cdk-visibilidade-list.module';
import {modulesConfig} from 'modules/modules-config';
import {ClassificacaoService} from '@cdk/services/classificacao.service';

const routes: Routes = [
    {
        path: '',
        component: VisibilidadeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/classificacao/visibilidades/visibilidade-list';

modulesConfig.forEach((module) => {
    if (module['routes'].hasOwnProperty(path)) {
        module['routes'][path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        VisibilidadeListComponent
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

        CdkVisibilidadeListModule,

        VisibilidadeListStoreModule,
    ],
    providers: [
        ClassificacaoService,
        fromGuards.ResolveGuard
    ],
    exports: [
        VisibilidadeListComponent
    ]
})
export class VisibilidadeListModule {
}
