import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ComponenteDigitalCkeditorComponent} from './componente-digital-ckeditor.component';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalCkeditorModule} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-componente-digital-ckeditor.module';
import {ComponenteDigitalStoreModule} from '../store/store.module';
import {MatProgressBarModule} from '@cdk/angular/material';
import {modulesConfig} from 'modules/modules-config';

const routes: Routes = [
    {
        path: 'ckeditor',
        component: ComponenteDigitalCkeditorComponent
    }
];

const path = 'app/main/apps/documento/componente-digital/componente-digital-ckeditor';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [
        ComponenteDigitalCkeditorComponent
    ],
    imports: [
        RouterModule.forChild(routes),

        CdkComponenteDigitalCkeditorModule,
        MatProgressBarModule,

        ComponenteDigitalStoreModule,

        TranslateModule,
        CdkSharedModule,
    ],
    providers: [
        ComponenteDigitalService
    ]
})
export class ComponenteDigitalCkeditorModule {
}
