import {NgModule} from '@angular/core';
import {MatDividerModule, MatListModule, MatSlideToggleModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';

import {QuickPanelComponent} from './quick-panel.component';

@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports: [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        CdkSharedModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
