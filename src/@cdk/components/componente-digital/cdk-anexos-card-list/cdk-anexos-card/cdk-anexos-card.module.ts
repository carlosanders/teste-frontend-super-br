import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkAnexosCardComponent} from './cdk-anexos-card.component';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkAnexosCardComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        CdkSharedModule,
        MatTooltipModule,
    ],
    providers: [],
    exports: [
        CdkAnexosCardComponent
    ]
})
export class CdkAnexosCardModule {
}
