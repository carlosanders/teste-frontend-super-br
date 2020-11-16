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
import {CdkCriteriaFormModule} from '../cdk-criteria-form/cdk-criteria-form.module';
import {CdkCriteriaListModule} from '../cdk-criteria-list/cdk-criteria-list.module';
import {MatCardModule} from '@angular/material/card';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

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
        CdkCriteriaFormModule,
        CdkCriteriaListModule,
        MatCardModule,
        NgxUpperCaseDirectiveModule,
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
