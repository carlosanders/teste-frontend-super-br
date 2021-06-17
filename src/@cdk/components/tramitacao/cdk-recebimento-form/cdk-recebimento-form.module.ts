import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatRadioModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRecebimentoFormComponent} from './cdk-recebimento-form.component';
import {MatOptionModule} from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkSetorAutocompleteModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';
import {CdkSetorTreeModule} from '../../setor/cdk-setor-tree/cdk-setor-tree.module';
import {CdkSetorGridsearchModule} from '../../setor/cdk-setor-autocomplete/cdk-setor-gridsearch/cdk-setor-gridsearch.module';
import {MatInputModule} from '@angular/material/input';
import {CdkSetorTreeService} from '../../setor/cdk-setor-tree/services/cdk-setor-tree.service';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';

@NgModule({
    declarations: [
        CdkRecebimentoFormComponent,
    ],
    imports: [

        MatFormFieldModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatIconModule,
        CdkSharedModule,
        MatRadioModule,
        MatOptionModule,
        MatAutocompleteModule,
        CdkSetorAutocompleteModule,
        CdkSetorTreeModule,
        CdkSetorGridsearchModule,
        MatInputModule,
        CdkPessoaAutocompleteModule,
    ],
    providers: [
        CdkSetorTreeService
    ],
    exports: [
        CdkRecebimentoFormComponent
    ]
})
export class CdkRecebimentoFormModule {
}
