import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ComponenteDigitalEmptyComponent} from './componente-digital-empty.component';
import {MatIconModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ComponenteDigitalEmptyComponent
    }
];

const path = 'app/main/apps/documento/componente-digital/componente-digital-empty';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ComponenteDigitalEmptyComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        MatIconModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
    ]
})
export class ComponenteDigitalEmptyModule {
}
