import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ModeloEditDadosBasicosComponent} from './modelo-edit-dados-basicos.component';
import {DocumentoModeloEditDadosBasicosStoreModule} from './store/store.module';
import {ModeloService} from '@cdk/services/modelo.service';
import {CdkModeloFormModule} from '@cdk/components/modelo/cdk-modelo-form/cdk-modelo-form.module';

const routes: Routes = [
    {
        path: '',
        component: ModeloEditDadosBasicosComponent
    }
];

const path = 'app/main/apps/documento/modelo-edit/dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ModeloEditDadosBasicosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoModeloEditDadosBasicosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkModeloFormModule,
    ],
    providers: [
        ModeloService,
    ],
    exports: [
        ModeloEditDadosBasicosComponent
    ]
})
export class ModeloEditDadosBasicosModule {
}
