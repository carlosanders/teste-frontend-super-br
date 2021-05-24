import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CdkLembreteHistoricoComponent} from './cdk-lembrete-historico.component';
import {MatIconModule} from '@cdk/angular/material';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkLembreteFilterModule} from '../sidebars/cdk-lembrete-filter/cdk-lembrete-filter.module';
import {CdkSharedModule} from '../../../shared.module';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    declarations: [CdkLembreteHistoricoComponent],
    exports: [
        CdkLembreteHistoricoComponent
    ],
    imports: [
        CommonModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CdkLembreteFilterModule,
        CdkSharedModule,
        MatTooltipModule,
    ]
})
export class CdkLembreteHistoricoModule {
}
