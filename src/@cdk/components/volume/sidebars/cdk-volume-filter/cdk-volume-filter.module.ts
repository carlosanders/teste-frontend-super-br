import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
} from '@cdk/angular/material';

import {CdkSharedModule} from '@cdk/shared.module';
import {VolumeService} from '@cdk/services/volume.service';
import {CdkVolumeFilterComponent} from './cdk-volume-filter.component';
import {CdkProcessoAutocompleteModule} from '../../../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {MatDatetimepickerModule, MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {CdkUsuarioAutocompleteModule} from '../../../usuario/cdk-usuario-autocomplete/cdk-usuario-autocomplete.module';
import {CdkModalidadeMeioAutocompleteModule} from '../../../modalidade-meio/cdk-modalidade-meio-autocomplete/cdk-modalidade-meio-autocomplete.module';
import {MatMenuModule} from '@angular/material/menu';
import {CdkDateFilterModule} from '../../../date-filter/cdk-date-filter.module';

@NgModule({
    declarations: [
        CdkVolumeFilterComponent,
    ],
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatAutocompleteModule,
        MatDatepickerModule,
        MatDatetimepickerModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatCheckboxModule,

        CdkSharedModule,

        CdkUsuarioAutocompleteModule,
        CdkProcessoAutocompleteModule,
        CdkModalidadeMeioAutocompleteModule,
        MatMenuModule,
        CdkDateFilterModule,
    ],
    providers: [
        VolumeService,
    ],
    exports: [
        CdkVolumeFilterComponent
    ]
})
export class CdkVolumeFilterModule {
}
