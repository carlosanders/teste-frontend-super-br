import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatDatepickerModule, MatRadioModule, MatTooltipModule

} from '@cdk/angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDesentranhamentoFormComponent } from './cdk-desentranhamento-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkDesentranhamentoFormComponent,
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

        FuseSharedModule,
        CdkProcessoAutocompleteModule,
        CdkProcessoGridsearchModule,
        MatRadioModule,
        MatTooltipModule,
        NgxUpperCaseDirectiveModule,
    ],
    providers: [

    ],
    exports: [
        CdkDesentranhamentoFormComponent
    ]
})
export class CdkDesentranhamentoFormModule {
}
