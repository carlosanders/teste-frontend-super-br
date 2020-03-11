import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkLembreteHistoricoComponent } from './cdk-lembrete-historico.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CdkLembreteGridFilterModule} from '../cdk-lembrete-grid/cdk-lembrete-grid-filter/cdk-lembrete-grid-filter.module';
import {CdkSharedModule} from '../../../shared.module';
import {CdkSidebarModule} from '../..';
import {MatButtonModule, MatInputModule, MatSortModule} from '../../../angular/material';



@NgModule({
    declarations: [CdkLembreteHistoricoComponent],
    exports: [
        CdkLembreteHistoricoComponent
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

        CdkLembreteGridFilterModule,
        CdkSharedModule,
    ]
})
export class CdkLembreteHistoricoModule { }
