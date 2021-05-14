import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoRelatorioEditComponent} from './tipo-relatorio-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatSelectModule,
    MatToolbarModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkSidebarModule} from '@cdk/components';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {TipoRelatorioEditStoreModule} from './store/store.module';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {CdkTipoRelatorioFormModule} from '@cdk/components/tipo-relatorio/cdk-tipo-relatorio-form/cdk-tipo-relatorio-form.module';
import {PathModule} from '@cdk/components/path/path.module';


const routes: Routes = [
    {
        path: ':tipoRelatorioHandle',
        component: TipoRelatorioEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [TipoRelatorioEditComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatSelectModule,
        MatToolbarModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatTooltipModule,


        TranslateModule,

        CdkSharedModule,
        CdkSidebarModule,
        MatStepperModule,
        TipoRelatorioEditStoreModule,
        CdkTipoRelatorioFormModule,
        PathModule

    ],
    providers: [
        ResolveGuard,
        TipoRelatorioService,
    ]
})
export class TipoRelatorioEditModule {
}
