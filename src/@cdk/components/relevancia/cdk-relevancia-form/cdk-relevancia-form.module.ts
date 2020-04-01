import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {EspecieRelevanciaService} from '@cdk/services/especie-relevancia.service';
import {CdkRelevanciaFormComponent} from './cdk-relevancia-form.component';
import {CdkEspecieRelevanciaAutocompleteModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-autocomplete.module';
import {CdkEspecieRelevanciaGridsearchModule} from '@cdk/components/especie-relevancia/cdk-especie-relevancia-autocomplete/cdk-especie-relevancia-gridsearch/cdk-especie-relevancia-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from "ngx-upper-case-directive";

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
