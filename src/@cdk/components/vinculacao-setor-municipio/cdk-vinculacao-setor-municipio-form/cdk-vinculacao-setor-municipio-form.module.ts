import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkVinculacaoSetorMunicipioFormComponent} from './cdk-vinculacao-setor-municipio-form.component';
import {CdkMunicipioAutocompleteModule} from '../../municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridsearchModule} from '../../municipio/cdk-municipio-autocomplete/cdk-municipio-gridsearch/cdk-municipio-gridsearch.module';

@NgModule({
    declarations: [
        CdkVinculacaoSetorMunicipioFormComponent,
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
        MatSlideToggleModule,
        MatTooltipModule,

        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridsearchModule,

        CdkSharedModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkVinculacaoSetorMunicipioFormComponent
    ]
})
export class CdkVinculacaoSetorMunicipioFormModule {
}
