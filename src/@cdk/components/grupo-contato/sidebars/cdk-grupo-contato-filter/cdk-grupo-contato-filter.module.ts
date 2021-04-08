import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkGrupoContatoFilterComponent } from './cdk-grupo-contato-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {GrupoContatoService} from "../../../../services/grupo-contato.service";

@NgModule({
    declarations: [
        CdkGrupoContatoFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,
        CdkSharedModule,
    ],
    providers: [
        GrupoContatoService,
    ],
    exports: [
        CdkGrupoContatoFilterComponent
    ]
})
export class CdkGrupoContatoFilterModule {
}
