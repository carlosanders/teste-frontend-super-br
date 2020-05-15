import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProtocoloExternoEmptyComponent} from './protocolo-externo-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: ProtocoloExternoEmptyComponent
    }
];

@NgModule({
    declarations: [
        ProtocoloExternoEmptyComponent
    ],
    imports: [

        RouterModule.forChild(routes),

        MatIconModule,

        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatProgressSpinnerModule,
    ],
    providers: [
    ]
})
export class ProtocoloExternoEmptyModule {
}
