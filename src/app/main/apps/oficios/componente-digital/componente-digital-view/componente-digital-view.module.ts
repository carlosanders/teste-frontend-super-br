import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ComponenteDigitalViewComponent} from './componente-digital-view.component';
import {CdkComponenteDigitalViewModule} from '@cdk/components/componente-digital/cdk-componente-digital-view/cdk-componente-digital-view.module';
import {ComponenteDigitalStoreModule} from '../store/store.module';
import {MatProgressSpinnerModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: '',
        component: ComponenteDigitalViewComponent
    }
];

const path = 'app/main/apps/oficios/componente-digital/componente-digital-view';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ComponenteDigitalViewComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkComponenteDigitalViewModule,

        ComponenteDigitalStoreModule,

        MatProgressSpinnerModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
    ]
})
export class ComponenteDigitalViewModule {
}
