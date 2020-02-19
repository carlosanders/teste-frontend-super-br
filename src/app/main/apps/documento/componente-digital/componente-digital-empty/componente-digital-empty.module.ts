import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FuseSharedModule} from '@fuse/shared.module';

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
        FuseSharedModule,
    ],
    providers: [
    ]
})
export class ComponenteDigitalEmptyModule {
}
