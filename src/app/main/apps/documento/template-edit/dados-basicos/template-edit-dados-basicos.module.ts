import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {modulesConfig} from 'modules/modules-config';
import {MatIconModule} from '@cdk/angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TemplateEditDadosBasicosComponent} from './template-edit-dados-basicos.component';

import * as fromGuards from './store/guards';

import {CdkTemplateFormModule} from '@cdk/components/template/cdk-template-form/cdk-template-form.module';
import {DocumentoTemplateEditDadosBasicosStoreModule} from './store/store.module';
import {TemplateService} from '@cdk/services/template.service';

const routes: Routes = [
    {
        path: '',
        component: TemplateEditDadosBasicosComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/documento/template-edit/dados-basicos';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        TemplateEditDadosBasicosComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,
        MatButtonModule,
        MatMenuModule,

        DocumentoTemplateEditDadosBasicosStoreModule,

        TranslateModule,
        CdkSharedModule,
        MatTooltipModule,
        CdkTemplateFormModule,
    ],
    providers: [
        TemplateService,
        fromGuards.ResolveGuard
    ],
    exports: [
        TemplateEditDadosBasicosComponent
    ]
})
export class TemplateEditDadosBasicosModule {
}
