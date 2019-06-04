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
    MatExpansionModule,
    MatRadioModule

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeInteressadoService } from '@cdk/services/modalidade-interessado.service';
import { CdkInteressadoFormComponent } from './cdk-interessado-form.component';
import { CdkModalidadeInteressadoAutocompleteModule } from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-autocomplete.module';
import { CdkModalidadeInteressadoGridsearchModule } from '@cdk/components/modalidade-interessado/cdk-modalidade-interessado-autocomplete/cdk-modalidade-interessado-gridsearch/cdk-modalidade-interessado-gridsearch.module';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {InteressadoService} from '../../../services/interessado.service';

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
        MatRadioModule,

        CdkModalidadeInteressadoAutocompleteModule,
        CdkModalidadeInteressadoGridsearchModule,
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,

        FuseSharedModule,
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
