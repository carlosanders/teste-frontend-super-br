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

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoIdentificadorFormComponent } from './cdk-documento-identificador-form.component';
import {CdkModalidadeDocumentoIdentificadorAutocompleteModule} from '../../modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-autocomplete.module';
import {CdkModalidadeDocumentoIdentificadorGridsearchModule} from '../../modalidade-documento-identificador/cdk-modalidade-documento-identificador-autocomplete/cdk-modalidade-documento-identificador-gridsearch/cdk-modalidade-documento-identificador-gridsearch.module';

@NgModule({
    declarations: [
        CdkDocumentoIdentificadorFormComponent,
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
        CdkModalidadeDocumentoIdentificadorAutocompleteModule,
        CdkModalidadeDocumentoIdentificadorGridsearchModule,
        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkDocumentoIdentificadorFormComponent
    ]
})
export class CdkDocumentoIdentificadorFormModule {
}
