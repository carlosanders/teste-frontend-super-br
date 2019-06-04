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

import { FuseSharedModule } from '@fuse/shared.module';
import { SetorService } from '@cdk/services/setor.service';
import { CdkSetorGridComponent} from './cdk-setor-grid.component';
import { CdkSetorGridFilterComponent } from './cdk-setor-grid-filter/cdk-setor-grid-filter.component';
import { CdkSetorAutocompleteModule } from '@cdk/components/setor/cdk-setor-autocomplete/cdk-setor-autocomplete.module';

@NgModule({
    declarations: [
        CdkSetorGridComponent,
        CdkSetorGridFilterComponent
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

        CdkSetorAutocompleteModule,

        FuseSharedModule,
    ],
    providers: [
        SetorService,
    ],
    exports: [
        CdkSetorGridComponent
    ]
})
export class CdkSetorGridModule {
}
