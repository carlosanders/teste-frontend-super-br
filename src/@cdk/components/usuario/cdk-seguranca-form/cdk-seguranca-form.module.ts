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
    MatProgressSpinnerModule,
    MatSlideToggleModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSegurancaFormComponent} from './cdk-seguranca-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {UsuarioService} from '@cdk/services/usuario.service';

@NgModule({
    declarations: [
        CdkSegurancaFormComponent,
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
        MatSlideToggleModule,

        CdkSharedModule,
    ],
    providers: [
        UsuarioService
    ],
    exports: [
        CdkSegurancaFormComponent
    ]
})
export class CdkSegurancaFormModule {
}
