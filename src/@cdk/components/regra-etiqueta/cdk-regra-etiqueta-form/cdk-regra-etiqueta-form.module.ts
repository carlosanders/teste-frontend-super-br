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
    MatRadioModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRegraEtiquetaFormComponent} from './cdk-regra-etiqueta-form.component';
import {RegraEtiquetaService} from '@cdk/services/regra-etiqueta.service';
import {CdkCriteriaFormModule} from '../cdk-criteria-form/cdk-criteria-form.module';
import {CdkCriteriaListModule} from '../cdk-criteria-list/cdk-criteria-list.module';
import {MatCardModule} from '@angular/material/card';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkRegraEtiquetaFormComponent,
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
        CdkCriteriaFormModule,
        CdkCriteriaListModule,
        MatCardModule,
        NgxUpperCaseDirectiveModule,
    ],
    providers: [
        RegraEtiquetaService
    ],
    exports: [
        CdkRegraEtiquetaFormComponent
    ]
})
export class CdkRegraEtiquetaFormModule {
}
