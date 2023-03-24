import {NgModule} from '@angular/core';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
} from '@cdk/angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkSharedModule} from '@cdk/shared.module';
import {NavioService} from '../../../services/navio.service';
import {CdkNavioGridComponent} from './cdk-navio-grid.component';
import {CdkNavioAutocompleteModule} from '../cdk-navio-autocomplete/cdk-navio-autocomplete.module';
import {CdkNavioFilterModule} from '../sidebars/cdk-navio-filter/cdk-navio-filter.module';
import {CdkSidebarModule} from '@cdk/components/index';

@NgModule({
    declarations: [
        CdkNavioGridComponent,
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

        CdkNavioAutocompleteModule,
        CdkNavioFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        NavioService,
    ],
    exports: [
        CdkNavioGridComponent
    ]
})
export class CdkNavioGridModule {
}
