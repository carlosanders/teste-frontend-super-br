import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VinculacaoRoleService} from '@cdk/services/vinculacao-role.service';
import {CdkVinculacaoRoleFilterComponent} from './cdk-vinculacao-role-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';
import {CdkVinculacaoRoleAutocompleteModule} from "../../cdk-vinculacao-role-autocomplete/cdk-vinculacao-role-autocomplete.module";


@NgModule({
    declarations: [
        CdkVinculacaoRoleFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
        CdkVinculacaoRoleAutocompleteModule,
    ],
    providers: [
        VinculacaoRoleService,
    ],
    exports: [
        CdkVinculacaoRoleFilterComponent
    ]
})
export class CdkVinculacaoRoleFilterModule {
}
