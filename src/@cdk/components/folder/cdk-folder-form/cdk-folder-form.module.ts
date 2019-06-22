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

} from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';
import { CdkFolderFormComponent } from './cdk-folder-form.component';
import {CdkModalidadeFolderAutocompleteModule} from '../../modalidade-folder/cdk-modalidade-folder-autocomplete/cdk-modalidade-folder-autocomplete.module';
import {CdkModalidadeFolderGridsearchModule} from '../../modalidade-folder/cdk-modalidade-folder-autocomplete/cdk-modalidade-folder-gridsearch/cdk-modalidade-folder-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkFolderFormComponent,
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

        CdkModalidadeFolderAutocompleteModule,
        CdkModalidadeFolderGridsearchModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkFolderFormComponent
    ]
})
export class CdkFolderFormModule {
}
