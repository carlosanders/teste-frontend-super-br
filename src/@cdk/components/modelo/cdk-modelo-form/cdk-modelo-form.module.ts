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
import { CdkModeloFormComponent } from './cdk-modelo-form.component';
import {CdkTemplateAutocompleteModule} from '../../template/cdk-template-autocomplete/cdk-template-autocomplete.module';
import {CdkTemplateGridsearchModule} from '../../template/cdk-template-autocomplete/cdk-template-gridsearch/cdk-template-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkModeloFormComponent,
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

        NgxUpperCaseDirectiveModule,

        CdkTemplateAutocompleteModule,
        CdkTemplateGridsearchModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkModeloFormComponent
    ]
})
export class CdkModeloFormModule {
}
