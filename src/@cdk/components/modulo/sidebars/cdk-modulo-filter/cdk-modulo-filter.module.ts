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
import {CdkModuloFilterComponent} from './cdk-modulo-filter.component';
import {ModuloService} from '../../../../services/modulo.service';

@NgModule({
    declarations: [CdkModuloFilterComponent],
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
    ],
    providers: [ModuloService],
    exports: [CdkModuloFilterComponent]
})
export class CdkModuloFilterModule { }
