import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkVinculacaoPessoaUsuarioFormComponent} from './cdk-vinculacao-pessoa-usuario-form.component';
import {CdkSharedModule} from '../../../shared.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {MatIconModule} from '@cdk/angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';


@NgModule({
  declarations: [CdkVinculacaoPessoaUsuarioFormComponent],
    imports: [
        CommonModule,
        CdkSharedModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        CdkPessoaAutocompleteModule,
        MatIconModule,
        MatProgressSpinnerModule,
        CdkPessoaGridsearchModule,

        MatButtonModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTooltipModule,

    ],
    exports: [
        CdkVinculacaoPessoaUsuarioFormComponent
    ]
})
export class CdkVinculacaoPessoaUsuarioFormModule { }
