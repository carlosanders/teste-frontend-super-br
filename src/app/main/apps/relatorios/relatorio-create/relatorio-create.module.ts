import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {RelatorioCreateComponent} from './relatorio-create.component';
import {RouterModule, Routes} from '@angular/router';
import {CdkRelatorioFormModule} from '@cdk/components/relatorio/cdk-relatorio-form/cdk-relatorio-form.module';
import {RelatorioCreateStoreModule} from './store/store.module';
import {RelatorioService} from '@cdk/services/relatorio.service';
import * as fromGuards from './store/guards';
import {CdkVisibilidadePluginModule} from '@cdk/components/visibilidade/cdk-visibilidade-plugin/cdk-visibilidade-plugin.module';
import {modulesConfig} from 'modules/modules-config';
import {GeneroRelatorioService} from '@cdk/services/genero-relatorio.service';

const routes: Routes = [
    {
        path: '',
        component: RelatorioCreateComponent
    },
    {
        path: '',
        component: RelatorioCreateComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/relatorios/relatorio-create';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RelatorioCreateComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,
        MatDialogModule,

        CdkRelatorioFormModule,
        CdkVisibilidadePluginModule,

        RelatorioCreateStoreModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
        RelatorioService,
        GeneroRelatorioService,
        fromGuards.ResolveGuard
    ]
})
export class RelatorioCreateModule {
}
