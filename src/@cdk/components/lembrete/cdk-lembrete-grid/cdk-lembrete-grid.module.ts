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

import {CdkSidebarModule} from '@cdk/components/index';
import {CdkSharedModule} from '@cdk/shared.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteGridComponent} from './cdk-lembrete-grid.component';
import {CdkLembreteAutocompleteModule} from '@cdk/components/lembrete/cdk-lembrete-autocomplete/cdk-lembrete-autocomplete.module';
import {CdkLembreteGridFilterModule} from './cdk-lembrete-grid-filter/cdk-lembrete-grid-filter.module';
import {CdkLembreteMainSidebarComponent} from './sidebars/main/sidebars/main/main.component';

@NgModule({
    declarations: [
        CdkLembreteGridComponent,
        CdkLembreteMainSidebarComponent,
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
        CdkLembreteGridFilterModule,

        CdkSharedModule,
        CdkSidebarModule,
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
