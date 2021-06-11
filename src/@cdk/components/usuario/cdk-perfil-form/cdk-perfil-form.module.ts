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
    MatProgressSpinnerModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {ModalidadeColaboradorService} from '@cdk/services/modalidade-colaborador.service';
import {CdkPerfilFormComponent} from './cdk-perfil-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {ColaboradorService} from '@cdk/services/colaborador.service';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {PipesModule} from "../../../pipes/pipes.module";

@NgModule({
    declarations: [
        CdkPerfilFormComponent,
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
        PipesModule,

        CdkSharedModule,
        NgxUpperCaseDirectiveModule,
    ],
    providers: [
        ModalidadeColaboradorService,
        ColaboradorService
    ],
    exports: [
        CdkPerfilFormComponent
    ]
})
export class CdkPerfilFormModule {
}
