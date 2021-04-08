import {NgModule} from '@angular/core';
import {
    MatButtonModule, MatCheckboxModule, MatIconModule,
    MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkComponenteDigitalCardComponent } from './cdk-componente-digital-card.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
    declarations: [
        CdkComponenteDigitalCardComponent,
    ],
    imports: [

        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,

        CdkSharedModule,
        MatTooltipModule,
        DragDropModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCardComponent
    ]
})
export class CdkComponenteDigitalCardModule {
}
