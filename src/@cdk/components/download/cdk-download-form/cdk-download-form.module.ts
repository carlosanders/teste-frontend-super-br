import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatDatepickerModule, MatRadioModule, MatTooltipModule

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkDownloadFormComponent } from './cdk-download-form.component';
import {CdkProcessoAutocompleteModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {CdkProcessoGridsearchModule} from '../../processo/cdk-processo-autocomplete/cdk-processo-gridsearch/cdk-processo-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkDownloadFormComponent,
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
        MatSlideToggleModule,
    ],
    providers: [

    ],
    exports: [
        CdkDownloadFormComponent
    ]
})
export class CdkDownloadFormModule {
}
