import {NgModule} from '@angular/core';
import {MatDividerModule, MatListModule, MatSlideToggleModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';

import {QuickPanelComponent} from './quick-panel.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";

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
        MatTooltipModule,
        MatButtonModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
