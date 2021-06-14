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
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {CdkRelevanciaFormComponent} from './cdk-relevancia-form.component';
import {CdkEspecieRelevanciaAutocompleteModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-autocomplete.module';
import {CdkEspecieRelevanciaGridsearchModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-gridsearch/cdk-especie-relevancia-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkRelevanciaFormComponent,
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

        CdkEspecieRelevanciaAutocompleteModule,
        CdkEspecieRelevanciaGridsearchModule,

        CdkSharedModule,
        NgxUpperCaseDirectiveModule,
    ],
    providers: [
        EspecieRelevanciaService,
    ],
    exports: [
        CdkRelevanciaFormComponent
    ]
})
export class CdkRelevanciaFormModule {
}
