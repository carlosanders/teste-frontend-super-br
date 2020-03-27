import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ComponenteDigitalViewComponent} from './componente-digital-view.component';
import {ComponenteDigitalService} from '@cdk/services/componente-digital.service';
import {CdkComponenteDigitalViewModule} from '@cdk/components/componente-digital/cdk-componente-digital-view/cdk-componente-digital-view.module';
import {ComponenteDigitalStoreModule} from '../store/store.module';
import {MatProgressSpinnerModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: ComponenteDigitalViewComponent
    }
];

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
        ComponenteDigitalService
    ]
})
export class ComponenteDigitalViewModule {
}
