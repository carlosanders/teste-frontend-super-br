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

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { ModalidadeDestinacaoService } from '@cdk/services/modalidade-destinacao.service';
import { CdkClassificacaoFormComponent } from './cdk-classificacao-form.component';
import { CdkModalidadeDestinacaoAutocompleteModule } from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-autocomplete.module';
import { CdkModalidadeDestinacaoGridsearchModule } from '@cdk/components/modalidade-destinacao/cdk-modalidade-destinacao-autocomplete/cdk-modalidade-destinacao-gridsearch/cdk-modalidade-destinacao-gridsearch.module';
import {CdkUsuarioAutocompleteModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkUsuarioGridsearchModule} from '../../usuario/cdk-usuario-autocomplete/cdk-usuario-gridsearch/cdk-usuario-gridsearch.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {CdkClassificacaoAutocompleteModule} from '../cdk-classificacao-autocomplete/cdk-classificacao-autocomplete.module';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {CdkClassificacaoGridsearchModule} from '../cdk-classificacao-autocomplete/cdk-classificacao-gridsearch/cdk-classificacao-gridsearch.module';

@NgModule({
    declarations: [
        CdkClassificacaoFormComponent,
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

        CdkModalidadeDestinacaoAutocompleteModule,
        CdkModalidadeDestinacaoGridsearchModule,
        CdkUsuarioAutocompleteModule,
        CdkUsuarioGridsearchModule,
        CdkClassificacaoAutocompleteModule,
        CdkClassificacaoGridsearchModule,

        FuseSharedModule,
    ],
    providers: [
        ModalidadeDestinacaoService,
        ClassificacaoService
    ],
    exports: [
        CdkClassificacaoFormComponent
    ]
})
export class CdkClassificacaoFormModule {
}
