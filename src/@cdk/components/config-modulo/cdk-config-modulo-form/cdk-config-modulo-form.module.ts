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
import {CdkConfigModuloFormComponent} from './cdk-config-modulo-form.component';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {NgxUpperCaseDirectiveModule} from 'ngx-upper-case-directive';
import {MatCardModule} from '@angular/material/card';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MonacoEditorModule} from '@materia-ui/ngx-monaco-editor';
import {MatTabsModule} from '@angular/material/tabs';
import {
    CdkConfigModuloAutocompleteModule
} from '../cdk-config-modulo-autocomplete/cdk-config-modulo-autocomplete.module';
import {
    CdkModuloGridsearchModule
} from '../../modulo/cdk-modulo-autocomplete/cdk-modulo-gridsearch/cdk-modulo-gridsearch.module';
import {
    CdkConfigModuloGridsearchModule
} from '../cdk-config-modulo-autocomplete/cdk-config-module-gridsearch/cdk-config-modulo-gridsearch.module';
import {CdkModuloAutocompleteModule} from '../../modulo/cdk-modulo-autocomplete/cdk-modulo-autocomplete.module';

@NgModule({
    declarations: [
        CdkConfigModuloFormComponent,
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
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatTooltipModule,
        NgxUpperCaseDirectiveModule,
        CdkSharedModule,
        MatCardModule,
        MatSlideToggleModule,
        MatSelectModule,
        MonacoEditorModule,
        MatTabsModule,
        CdkConfigModuloAutocompleteModule,
        CdkConfigModuloGridsearchModule,
        CdkModuloGridsearchModule,
        CdkConfigModuloGridsearchModule,
        CdkModuloAutocompleteModule,
    ],
    providers: [],
    exports: [
        CdkConfigModuloFormComponent
    ]
})
export class CdkConfigModuloFormModule {
}
