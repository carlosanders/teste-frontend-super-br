import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkCriarLembreteChipsComponent} from './cdk-criar-lembrete-chips.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {CdkLembreteAutocompleteModule} from '../cdk-lembrete-autocomplete/cdk-lembrete-autocomplete.module';
import {CdkSharedModule} from '../../../shared.module';
import {LembreteService} from '../../../services/lembrete.service';


@NgModule({
    declarations: [
        CdkCriarLembreteChipsComponent
    ],
    imports: [
        CommonModule,

        MatFormFieldModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatIconModule,

        CdkLembreteAutocompleteModule,
        CdkSharedModule
    ],
    providers: [
        LembreteService
    ],
    exports: [
        CdkCriarLembreteChipsComponent
    ]
})
export class CdkCriarLembreteChipsModule {
}
