import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RepositorioEditDadosBasicosComponent} from './repositorio-edit-dados-basicos.component';

import {CdkModeloFormModule} from '@cdk/components/modelo/cdk-modelo-form/cdk-modelo-form.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {DocumentoRepositorioEditDadosBasicosStoreModule} from './store/store.module';
import {CdkRepositorioFormModule} from '@cdk/components/repositorio/cdk-repositorio-form/cdk-repositorio-form.module';

const routes: Routes = [
    {
        path: '',
        component: RepositorioEditDadosBasicosComponent
    }
];

const path = 'app/main/apps/documento/repositorio-edit/dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        RepositorioEditDadosBasicosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoRepositorioEditDadosBasicosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkModeloFormModule,
        CdkRepositorioFormModule,
    ],
    providers: [
        RepositorioService,
    ],
    exports: [
        RepositorioEditDadosBasicosComponent
    ]
})
export class RepositorioEditDadosBasicosModule {
}
