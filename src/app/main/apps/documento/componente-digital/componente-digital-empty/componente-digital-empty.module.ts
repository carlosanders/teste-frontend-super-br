import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CdkSharedModule} from '@cdk/shared.module';

import {TranslateModule} from '@ngx-translate/core';
import {ComponenteDigitalEmptyComponent} from './componente-digital-empty.component';
import {MatIconModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: ComponenteDigitalEmptyComponent
    }
];

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
