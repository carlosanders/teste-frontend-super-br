import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeMeioService} from '@cdk/services/modalidade-meio.service';
import {CdkVolumeFormComponent} from './cdk-volume-form.component';
import {CdkModalidadeMeioAutocompleteModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {CdkModalidadeMeioGridsearchModule} from '@cdk/components/modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-gridsearch/cdk-modalidade-meio-gridsearch.module';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';

@NgModule({
    declarations: [
        CdkVolumeFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        CdkModalidadeMeioAutocompleteModule,
        CdkModalidadeMeioGridsearchModule,
        CdkSharedModule,
        CdkLogentryGridsearchModule,
    ],
    providers: [
        ModalidadeMeioService,
    ],
    exports: [
        CdkVolumeFormComponent
    ]
})
export class CdkVolumeFormModule {
}
