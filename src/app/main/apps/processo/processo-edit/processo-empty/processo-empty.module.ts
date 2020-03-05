import {NgModule} from '@angular/core';

import {TranslateModule} from '@ngx-translate/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';

import {ProcessoEmptyComponent} from './processo-empty.component';
import {RouterModule, Routes} from '@angular/router';
import {MatIconModule, MatProgressSpinnerModule} from '@cdk/angular/material';

const routes: Routes = [
    {
        path: '',
        component: ProcessoEmptyComponent
    }
];

@NgModule({
    declarations: [
        ProcessoEmptyComponent
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
export class ProcessoEmptyModule {
}
