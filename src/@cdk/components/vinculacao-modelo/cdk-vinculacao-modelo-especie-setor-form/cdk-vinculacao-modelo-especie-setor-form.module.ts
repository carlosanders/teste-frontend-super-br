import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVinculacaoModeloEspecieSetorFormComponent} from './cdk-vinculacao-modelo-especie-setor-form.component';
import {CdkEspecieSetorAutocompleteModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-autocomplete.module';
import {CdkEspecieSetorGridsearchModule} from '../../especie-setor/cdk-especie-setor-autocomplete/cdk-especie-setor-gridsearch/cdk-especie-setor-gridsearch.module';
import {EspecieSetorService} from '../../../services/especie-setor.service';

@NgModule({
    declarations: [
        CdkVinculacaoModeloEspecieSetorFormComponent
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

        CdkEspecieSetorAutocompleteModule,
        CdkEspecieSetorGridsearchModule,

        CdkSharedModule
    ],
    providers: [
        EspecieSetorService,
    ],
    exports: [
        CdkVinculacaoModeloEspecieSetorFormComponent
    ]
})
export class CdkVinculacaoModeloEspecieSetorFormModule {
}
