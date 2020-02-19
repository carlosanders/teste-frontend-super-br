import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@cdk/angular/material';
import { MatListModule } from '@cdk/angular/material';

import { FuseDemoContentComponent } from './demo-content/demo-content.component';
import { FuseDemoSidebarComponent } from './demo-sidebar/demo-sidebar.component';

@NgModule({
    declarations: [
        FuseDemoContentComponent,
        FuseDemoSidebarComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule
    ],
    exports     : [
        FuseDemoContentComponent,
        FuseDemoSidebarComponent
    ]
})
export class FuseDemoModule
{
}
