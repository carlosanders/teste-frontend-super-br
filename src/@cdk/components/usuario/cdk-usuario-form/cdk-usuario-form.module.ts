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
    MatExpansionModule

} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkUsuarioFormComponent } from './cdk-usuario-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {UsuarioService} from '@cdk/services/usuario.service';
import {CdkUsuarioAutocompleteModule} from '../cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';

@NgModule({
    declarations: [
        CdkUsuarioFormComponent,
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

        CdkSharedModule,
        NgxUpperCaseDirectiveModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkUsuarioFormComponent
    ]
})
export class CdkUsuarioFormModule {
}
