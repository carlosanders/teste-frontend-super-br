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
import {CdkVinculacaoRoleAutocompleteModule} from '../cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-autocomplete.module';
import {CdkVinculacaoRoleGridsearchModule} from '../cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-gridsearch/cdk-vinculacao-role-gridsearch.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleFormComponent} from './cdk-vinculacao-role-form.component';
import {CdkLogentryGridsearchModule} from '../../logentry/cdk-logentry-grid/cdk-logentry-gridsearch/cdk-logentry-gridsearch.module';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from "@angular/material/select";

@NgModule({
    declarations: [
        CdkVinculacaoRoleFormComponent,
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

        CdkVinculacaoRoleAutocompleteModule,
        CdkVinculacaoRoleGridsearchModule,

        CdkSharedModule,
        CdkLogentryGridsearchModule,
        MatCardModule,
        MatSelectModule,
    ],
    providers: [
        VinculacaoRoleService
    ],
    exports: [
        CdkVinculacaoRoleFormComponent
    ]
})
export class CdkVinculacaoRoleFormModule {
}
