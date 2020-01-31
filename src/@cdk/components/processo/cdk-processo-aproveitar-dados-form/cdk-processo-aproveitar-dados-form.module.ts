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
    MatTooltipModule
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {CdkProcessoAproveitarDadosFormComponent} from './cdk-processo-aproveitar-dados-form.component';
import {CdkProcessoAutocompleteModule} from '../cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';

@NgModule({
    declarations: [
        CdkProcessoAproveitarDadosFormComponent,
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
        MatTooltipModule,

        FuseSharedModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
    ],
    providers: [],
    exports: [
        CdkProcessoAproveitarDadosFormComponent
    ]
})
export class CdkProcessoAproveitarDadosFormModule {
}
