import {NgModule} from '@angular/core';
import {CdkProcessoAutocompleteActionFilterComponent} from './cdk-processo-autocomplete-action-filter.component';
import {CommonModule} from '@angular/common';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    declarations: [
        CdkProcessoAutocompleteActionFilterComponent,
    ],
    imports: [
        CommonModule,
        MatTooltipModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
    ],
    providers: [
    ],
    exports: [
        CdkProcessoAutocompleteActionFilterComponent
    ]
})
export class CdkProcessoAutocompleteActionFilterModule {
}
