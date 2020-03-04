import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule

} from '@cdk/angular/material';

import { CdkSharedModule } from '@cdk/shared.module';
import { CdkNomeFormComponent } from './cdk-nome-form.component';
import {CdkPessoaAutocompleteModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-autocomplete.module';
import {CdkPessoaGridsearchModule} from '../../pessoa/cdk-pessoa-autocomplete/cdk-pessoa-gridsearch/cdk-pessoa-gridsearch.module';

@NgModule({
    declarations: [
        CdkNomeFormComponent,
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
        CdkPessoaAutocompleteModule,
        CdkPessoaGridsearchModule,
        CdkSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkNomeFormComponent
    ]
})
export class CdkNomeFormModule {
}
