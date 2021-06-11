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
import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteGridComponent} from './cdk-lembrete-grid.component';
import {CdkLembreteAutocompleteModule} from '@cdk/components/lembrete/cdk-lembrete-autocomplete/cdk-lembrete-autocomplete.module';
import {CdkLembreteFilterModule} from '../sidebars/cdk-lembrete-filter/cdk-lembrete-filter.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [
        CdkLembreteGridComponent,
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

        CdkLembreteAutocompleteModule,
        CdkLembreteFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatTooltipModule,
    ],
    providers: [
        LembreteService,
    ],
    exports: [
        CdkLembreteGridComponent
    ]
})
export class CdkLembreteGridModule {
}
