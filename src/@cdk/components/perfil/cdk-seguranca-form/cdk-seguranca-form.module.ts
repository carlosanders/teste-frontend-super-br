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
    MatExpansionModule, MatSlideToggleModule

} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkSegurancaFormComponent} from './cdk-seguranca-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {UsuarioService} from '../../../services/usuario.service';

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

        FuseSharedModule,
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
