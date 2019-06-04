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

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeColaboradorService } from '@cdk/services/modalidade-colaborador.service';
import { CdkProfileFormComponent } from './cdk-profile-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {ColaboradorService} from '../../../services/colaborador.service';

@NgModule({
    declarations: [
        CdkProfileFormComponent,
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
        ModalidadeColaboradorService,
        ColaboradorService
    ],
    exports: [
        CdkProfileFormComponent
    ]
})
export class CdkProfileFormModule {
}
