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
} from '@angular/material';

import {FuseSharedModule} from '@fuse/shared.module';
import {LembreteService} from '@cdk/services/lembrete.service';
import {CdkLembreteGridComponent} from './cdk-lembrete-grid.component';
import {CdkLembreteAutocompleteModule} from '@cdk/components/lembrete/cdk-lembrete-autocomplete/cdk-lembrete-autocomplete.module';
import {CdkLembreteGridFilterModule} from './cdk-lembrete-grid-filter/cdk-lembrete-grid-filter.module';

@NgModule({
    declarations: [
        CdkLembreteGridComponent
    ],
    imports: [
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkLembreteAutocompleteModule,
        FuseSharedModule,
        CdkLembreteGridFilterModule
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
