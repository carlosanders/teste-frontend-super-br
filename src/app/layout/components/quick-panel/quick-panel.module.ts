import {NgModule} from '@angular/core';
import {MatDividerModule, MatListModule, MatSlideToggleModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';

import {QuickPanelComponent} from './quick-panel.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
    declarations: [
        QuickPanelComponent
    ],
    imports: [
        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        CdkSharedModule,
        MatCardModule,
        MatProgressBarModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
