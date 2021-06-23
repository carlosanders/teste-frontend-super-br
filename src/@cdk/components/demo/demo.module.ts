import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {MatDividerModule, MatListModule} from '@cdk/angular/material';

import {CdkDemoContentComponent} from './demo-content/demo-content.component';
import {CdkDemoSidebarComponent} from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        CdkDemoContentComponent,
        CdkDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        CdkDemoContentComponent,
        CdkDemoSidebarComponent
    ]
})
export class CdkDemoModule
{
}
