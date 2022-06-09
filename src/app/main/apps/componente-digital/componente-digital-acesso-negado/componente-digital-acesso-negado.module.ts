import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ComponenteDigitalAcessoNegadoComponent} from './componente-digital-acesso-negado.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ComponenteDigitalAcessoNegadoComponent
    }
];

const path = 'app/main/apps/componente-digital/componente-digital-acesso-negado';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ComponenteDigitalAcessoNegadoComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatIconModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
    ],
    providers: [
    ]
})
export class ComponenteDigitalAcessoNegadoModule {
}
