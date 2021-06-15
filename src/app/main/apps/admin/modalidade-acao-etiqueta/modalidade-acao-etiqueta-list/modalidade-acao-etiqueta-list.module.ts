import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalidadeAcaoEtiquetaListComponent} from './modalidade-acao-etiqueta-list.component';
import {RouterModule, Routes} from '@angular/router';
import * as fromGuards from './store/guards';
import {LoginService} from '../../../../auth/login/login.service';
import {ModalidadeAcaoEtiquetaStoreModule} from './store/store.module';

//Criar CDK
import {ModalidadeAcaoEtiquetaService} from '@cdk/services/modalidade-acao-etiqueta.service';
import {CdkModalidadeAcaoEtiquetaGridModule} from '@cdk/components/modalidade-acao-etiqueta/cdk-modalidade-acao-etiqueta-grid/cdk-modalidade-acao-etiqueta-grid.module';
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
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {modulesConfig} from 'modules/modules-config';
import {PathModule} from '@cdk/components/path/path.module';

const routes: Routes = [
    {
        path: '',
        component: ModalidadeAcaoEtiquetaListComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];

const path = 'app/main/apps/admin/modalidade-acao-etiqueta/modalidade-acao-etiqueta-list';

modulesConfig.forEach((module) => {
    if (module.routes.hasOwnProperty(path)) {
        module.routes[path].forEach((r => routes[0].children.push(r)));
    }
});

@NgModule({
    declarations: [ModalidadeAcaoEtiquetaListComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ModalidadeAcaoEtiquetaStoreModule,
        CdkModalidadeAcaoEtiquetaGridModule,

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
        PathModule
    ],
    providers: [
        fromGuards.ResolveGuard,
        ModalidadeAcaoEtiquetaService
    ]
})
export class ModalidadeAcaoEtiquetaListModule {
}
