import {NgModule} from '@angular/core';
import {MatButtonModule, MatCardModule, MatIconModule,} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalCardListComponent} from './cdk-componente-digital-card-list.component';
import {CdkComponenteDigitalCardModule} from './cdk-componente-digital-card/cdk-componente-digital-card.module';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
    declarations: [
        CdkComponenteDigitalCardListComponent
    ],
    imports: [

        MatButtonModule,
        MatIconModule,
        MatCardModule,

        CdkComponenteDigitalCardModule,

        CdkSharedModule,
        MatTooltipModule,
        DragDropModule,
    ],
    providers: [
    ],
    exports: [
        CdkComponenteDigitalCardListComponent
    ]
})
export class CdkComponenteDigitalCardListModule {
}
