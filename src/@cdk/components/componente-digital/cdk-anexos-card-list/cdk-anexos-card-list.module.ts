import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAnexosCardListComponent} from './cdk-anexos-card-list.component';
import {CdkAnexosCardModule} from './cdk-anexos-card/cdk-anexos-card.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkAnexosCardListComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,

        CdkAnexosCardModule,
        CdkSharedModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    providers: [
    ],
    exports: [
        CdkAnexosCardListComponent
    ]
})
export class CdkAnexosCardListModule {
}
