import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {AnexarCopiaComponent} from './anexar-copia.component';
import {RouterModule, Routes} from '@angular/router';
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatTooltipModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';
import {CdkSearchBarModule} from "../../../../../@cdk/components";
import {CdkProcessoSearchAutocompleteModule} from "../../../../../@cdk/components/processo/cdk-processo-search-autocomplete/cdk-processo-search-autocomplete.module";
import {MatAutocompleteModule} from "@angular/material/autocomplete";

const routes: Routes = [
    {
        path: ':processoCopiaHandle',
        component: AnexarCopiaComponent,
        children: [
            {
                path: 'visualizar',
                loadChildren: () => import('app/main/apps/processo/processo-view/processo-view.module').then(m => m.ProcessoViewModule)
            }
        ]
    }
];

const path = 'app/main/apps/documento/anexar-copia';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        AnexarCopiaComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        TranslateModule,
        CdkSharedModule,
        MatAutocompleteModule,

        MatTooltipModule,
        MatProgressSpinnerModule,
        CdkSearchBarModule,
        CdkProcessoSearchAutocompleteModule

    ],
    providers: [
    ],
    exports: [
        AnexarCopiaComponent
    ]
})
export class AnexarCopiaModule {
}
