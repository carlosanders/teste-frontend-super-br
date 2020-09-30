import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

import {MatButtonModule} from '@cdk/angular/material';
import {MatIconModule} from '@cdk/angular/material';

import {CdkSearchBarComponent} from './search-bar.component';
import {CdkProcessoSearchAutocompleteModule} from '../processo/cdk-processo-search-autocomplete/cdk-processo-search-autocomplete.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkProcessoAutocompleteModule} from '../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    declarations: [
        CdkSearchBarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatInputModule,
        CdkProcessoSearchAutocompleteModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        CdkProcessoAutocompleteModule,
        ReactiveFormsModule
    ],
    exports: [
        CdkSearchBarComponent
    ]
})
export class CdkSearchBarModule {
}
