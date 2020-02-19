import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {DesentranhamentoService} from '@cdk/services/desentranhamento.service';
import {CdkDesentranhamentoGridFilterComponent} from './cdk-desentranhamento-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '@cdk/components/usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkProcessoAutocompleteModule} from '@cdk/components/processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkJuntadaAutocompleteModule} from '@cdk/components/juntada/cdk-juntada-autocomplete/cdk-juntada-autocomplete.module';

@NgModule({
    declarations: [
        CdkDesentranhamentoGridFilterComponent,
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
        CdkJuntadaAutocompleteModule,
        CdkProcessoAutocompleteModule,
    ],
    providers: [
        DesentranhamentoService,
    ],
    exports: [
        CdkDesentranhamentoGridFilterComponent
    ]
})
export class CdkDesentranhamentoGridFilterModule {
}
