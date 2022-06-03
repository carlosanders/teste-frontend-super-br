import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
} from '@cdk/angular/material';
import {MatDatetimepickerModule} from '@mat-datetimepicker/core';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkConfigModuloFilterComponent} from './cdk-config-modulo-filter.component';
import {ConfigModuloService} from '../../../../services/config-modulo.service';
import {CdkModuloAutocompleteModule} from '../../../modulo/cdk-modulo-autocomplete/cdk-modulo-autocomplete.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
    declarations: [CdkConfigModuloFilterComponent],
    imports: [
        NgxUpperCaseDirectiveModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatetimepickerModule,
        MatCheckboxModule,

        CdkSharedModule,
        CdkModuloAutocompleteModule,
        MatSlideToggleModule,
    ],
    providers: [ConfigModuloService],
    exports: [CdkConfigModuloFilterComponent]
})
export class CdkConfigModuloFilterModule {
}
