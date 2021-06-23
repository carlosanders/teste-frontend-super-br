import {NgModule} from '@angular/core';
import {MatDividerModule, MatIconModule, MatListModule, MatSlideToggleModule} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';

import {QuickPanelComponent} from './quick-panel.component';
import {MatCardModule} from '@angular/material/card';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';

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
        MatCheckboxModule,
        MatMenuModule,
        MatSelectModule,
    ],
    exports: [
        QuickPanelComponent
    ]
})
export class QuickPanelModule {
}
