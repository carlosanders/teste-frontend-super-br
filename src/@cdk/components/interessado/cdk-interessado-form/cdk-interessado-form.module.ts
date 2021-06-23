import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeInteressadoService} from '@cdk/services/modalidade-interessado.service';
import {CdkInteressadoFormComponent} from './cdk-interessado-form.component';
import {CdkModalidadeInteressadoAutocompleteModule} from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import {CdkModalidadeInteressadoGridsearchModule} from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-gridsearch/cdk-modalidade-interessado-gridsearch.module';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {InteressadoService} from '@cdk/services/interessado.service';

@NgModule({
    declarations: [
        CdkInteressadoFormComponent,
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
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatExpansionModule,
        MatTooltipModule,

        CdkModalidadeInteressadoAutocompleteModule,
        CdkModalidadeInteressadoGridsearchModule,
        CdkPessoaAutocompleteModule,

        CdkSharedModule,
    ],
    providers: [
        ModalidadeInteressadoService,
        InteressadoService
    ],
    exports: [
        CdkInteressadoFormComponent
    ]
})
export class CdkInteressadoFormModule {
}
