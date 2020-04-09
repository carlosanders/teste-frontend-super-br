import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {MunicipioService} from '@cdk/services/municipio.service';
import {CdkMunicipioGridComponent} from './cdk-municipio-grid.component';
import {CdkMunicipioAutocompleteModule} from '@cdk/components/municipio/cdk-municipio-autocomplete/cdk-municipio-autocomplete.module';
import {CdkMunicipioGridFilterModule} from '../sidebars/cdk-municipio-grid-filter/cdk-municipio-grid-filter.module';
import {CdkMunicipioMainSidebarComponent} from './sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkMunicipioGridComponent,
        CdkMunicipioMainSidebarComponent,
    ],
    imports: [
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        CdkMunicipioAutocompleteModule,
        CdkMunicipioGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        MunicipioService,
    ],
    exports: [
        CdkMunicipioGridComponent
    ]
})
export class CdkMunicipioGridModule {
}
