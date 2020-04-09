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

import { CdkSharedModule } from '@cdk/shared.module';
import { ModalidadeDestinacaoService } from '@cdk/services/modalidade-destinacao.service';
import { CdkClassificacaoGridFilterComponent } from './cdk-classificacao-grid-filter.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {ModalidadeDestinacao} from '@cdk/models';
import {CdkClassificacaoAutocompleteModule} from '../../cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {CdkModalidadeDestinacaoAutocompleteModule} from '../../../modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';

@NgModule({
    declarations: [
        CdkClassificacaoGridFilterComponent,
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

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkModalidadeDestinacaoAutocompleteModule,
        CdkClassificacaoAutocompleteModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
    ],
    exports: [
        CdkClassificacaoGridFilterComponent
    ]
})
export class CdkClassificacaoGridFilterModule {
}
