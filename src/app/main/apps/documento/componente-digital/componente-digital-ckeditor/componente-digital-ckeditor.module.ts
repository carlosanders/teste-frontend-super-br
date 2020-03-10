import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ComponenteDigitalCkeditorComponent} from './componente-digital-ckeditor.component';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalCkeditorModule} from '@cdk/components/componente-digital/cdk-componente-digital-ckeditor/cdk-componente-digital-ckeditor.module';
import {ComponenteDigitalStoreModule} from '../store/store.module';
import {MatProgressBarModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: 'ckeditor',
        component: ComponenteDigitalCkeditorComponent
    }
];

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
