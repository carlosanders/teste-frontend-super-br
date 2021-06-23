import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkFolderFormComponent} from './cdk-folder-form.component';
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
        MatTooltipModule,

        NgxUpperCaseDirectiveModule,

        CdkModalidadeFolderAutocompleteModule,
        CdkModalidadeFolderGridsearchModule,

        CdkSharedModule,
    ],
    providers: [],
    exports: [
        CdkFolderFormComponent
    ]
})
export class CdkFolderFormModule {
}
