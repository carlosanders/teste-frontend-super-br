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
import {NomeListComponent} from './nome-list.component';
import {NomeService} from '@cdk/services/nome.service';
import {RouterModule, Routes} from '@angular/router';
import {NomeListStoreModule} from 'app/main/apps/pessoa/pessoa-edit/nomes/nome-list/store/store.module';
import * as fromGuards from 'app/main/apps/pessoa/pessoa-edit/nomes/nome-list/store/guards';
import {CdkNomeGridModule} from '@cdk/components/nome/cdk-nome-grid/cdk-nome-grid.module';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: NomeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/pessoa/pessoa-edit/nomes/nome-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        NomeListComponent
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

        CdkNomeGridModule,

        NomeListStoreModule,
    ],
    providers: [
        NomeService,
        fromGuards.ResolveGuard
    ],
    exports: [
        NomeListComponent
    ]
})
export class NomeListModule {
}
