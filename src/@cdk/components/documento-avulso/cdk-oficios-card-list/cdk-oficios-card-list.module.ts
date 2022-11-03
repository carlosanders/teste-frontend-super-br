import {NgModule} from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkOficiosCardListComponent} from './cdk-oficios-card-list.component';
import {CdkOficiosCardModule} from './cdk-oficios-card/cdk-oficios-card.module';

@NgModule({
    declarations: [
        CdkOficiosCardListComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatCheckboxModule,
        MatMenuModule,
        MatFormFieldModule,
        MatAutocompleteModule,
        MatInputModule,

        CdkOficiosCardModule,
        CdkSharedModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
    ],
    providers: [
    ],
    exports: [
        CdkOficiosCardListComponent
    ]
})
export class CdkOficiosCardListModule {
}
