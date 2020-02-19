import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {RepositorioService} from '@cdk/services/repositorio.service';
import {CdkRepositorioGridFilterComponent} from './cdk-repositorio-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeRepositorioAutocompleteModule} from '@cdk/components/modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-autocomplete.module';
import {CdkDocumentoAutocompleteModule} from '@cdk/components/documento/cdk-documento-autocomplete/cdk-documento-autocomplete.module';

@NgModule({
    declarations: [
        CdkRepositorioGridFilterComponent,
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
        MatCheckboxModule,

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkModalidadeRepositorioAutocompleteModule,
        CdkDocumentoAutocompleteModule,
    ],
    providers: [
        RepositorioService,
    ],
    exports: [
        CdkRepositorioGridFilterComponent
    ]
})
export class CdkRepositorioGridFilterModule {
}
