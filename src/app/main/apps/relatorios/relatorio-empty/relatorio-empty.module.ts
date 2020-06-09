import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {RelatorioEmptyComponent} from './relatorio-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: RelatorioEmptyComponent
    }
];

const path = 'app/main/apps/relatorios/relatorio-empty';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelatorioEmptyComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatIconModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatProgressSpinnerModule,
    ],
    providers: [
    ]
})
export class RelatorioEmptyModule {
}
