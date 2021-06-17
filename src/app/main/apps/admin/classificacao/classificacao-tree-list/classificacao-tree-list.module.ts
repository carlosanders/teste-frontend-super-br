import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClassificacaoTreeListComponent} from './classificacao-tree-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {MatNativeDatetimeModule} from '@mat-datetimepicker/core';
import {MatMomentDatetimeModule} from '@mat-datetimepicker/moment';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {LoginService} from '../../../../auth/login/login.service';
import {ClassificacaoService} from '@cdk/services/classificacao.service';
import {ClassificacaoTreeStoreModule} from './store/store.module';
import {CdkClassificacaoTreeModule} from '@cdk/components/classificacao/cdk-classificacao-tree/cdk-classificacao-tree.module';
import {CdkClassificacaoTreeService} from '@cdk/components/classificacao/cdk-classificacao-tree/services/cdk-classificacao-tree.service';
import {CdkClassificacaoTreeFormModule} from '@cdk/components/classificacao/cdk-classificacao-tree-form/cdk-classificacao-tree-form.module';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: ClassificacaoTreeListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

@NgModule({
    declarations: [ClassificacaoTreeListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ClassificacaoTreeStoreModule,


        MatExpansionModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        TranslateModule,
        CdkSharedModule,
        MatNativeDatetimeModule,
        MatMomentDatetimeModule,
        MatDatepickerModule,
        MatDialogModule,
        CdkClassificacaoTreeModule,
        CdkClassificacaoTreeFormModule,
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        ClassificacaoService,
        CdkClassificacaoTreeService
    ]
})
export class ClassificacaoTreeListModule {
}
