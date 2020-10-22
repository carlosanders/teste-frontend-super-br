import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRegraFormComponent} from './cdk-regra-form.component';
import {RegraService} from '@cdk/services/regra.service';

@NgModule({
    declarations: [
        CdkRegraFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatRadioModule,
        MatTooltipModule,

        CdkSharedModule,
    ],
    providers: [
        RegraService
    ],
    exports: [
        CdkRegraFormComponent
    ]
})
export class CdkRegraFormModule {
}
