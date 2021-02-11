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
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkComponenteDigitalFormComponent} from './cdk-componente-digital-form.component';

@NgModule({
    declarations: [
        CdkComponenteDigitalFormComponent,
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
        MatTooltipModule,
        CdkSharedModule,
    ],
    providers: [],
    exports: [
        CdkComponenteDigitalFormComponent
    ]
})
export class CdkComponenteDigitalFormModule {
}
