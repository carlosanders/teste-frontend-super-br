import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {TransicaoService} from '@cdk/services/transicao.service';
import {CdkTransicaoGridFilterComponent} from './cdk-transicao-grid-filter.component';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeTransicaoAutocompleteModule} from '@cdk/components/modalidade-transicao/cdk-modalidade-transicao-autocomplete/cdk-modalidade-transicao-autocomplete.module';

@NgModule({
    declarations: [
        CdkTransicaoGridFilterComponent,
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

        FuseSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkProcessoAutocompleteModule,
        CdkModalidadeTransicaoAutocompleteModule,
    ],
    providers: [
        TransicaoService,
    ],
    exports: [
        CdkTransicaoGridFilterComponent
    ]
})
export class CdkTransicaoGridFilterModule {
}
