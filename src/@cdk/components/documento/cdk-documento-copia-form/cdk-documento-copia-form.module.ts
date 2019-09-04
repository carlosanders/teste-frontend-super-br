import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatRadioModule, MatTooltipModule

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDocumentoCopiaFormComponent } from './cdk-documento-copia-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';

@NgModule({
    declarations: [
        CdkDocumentoCopiaFormComponent,
    ],
    imports: [

        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatProgressSpinnerModule,

        FuseSharedModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        MatRadioModule,
        MatTooltipModule
    ],
    providers: [

    ],
    exports: [
        CdkDocumentoCopiaFormComponent
    ]
})
export class CdkDocumentoCopiaFormModule {
}
