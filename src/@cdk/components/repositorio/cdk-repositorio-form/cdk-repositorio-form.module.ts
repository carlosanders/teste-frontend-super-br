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
import { CdkRepositorioFormComponent } from './cdk-repositorio-form.component';
import {CdkModalidadeRepositorioAutocompleteModule} from '../../modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-autocomplete.module';
import {CdkModalidadeRepositorioGridsearchModule} from '../../modalidade-repositorio/cdk-modalidade-repositorio-autocomplete/cdk-modalidade-repositorio-gridsearch/cdk-modalidade-repositorio-gridsearch.module';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';

@NgModule({
    declarations: [
        CdkRepositorioFormComponent,
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

        CdkModalidadeRepositorioAutocompleteModule,
        CdkModalidadeRepositorioGridsearchModule,

        FuseSharedModule,
    ],
    providers: [

    ],
    exports: [
        CdkRepositorioFormComponent
    ]
})
export class CdkRepositorioFormModule {
}
