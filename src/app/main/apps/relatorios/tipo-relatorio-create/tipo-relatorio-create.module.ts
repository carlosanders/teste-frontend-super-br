import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TipoRelatorioCreateComponent} from './tipo-relatorio-create.component';
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
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {TipoRelatorioCreateStoreModule} from './store/store.module';
import {TipoRelatorioService} from '@cdk/services/tipo-relatorio.service';
import {CdkTipoRelatorioFormModule} from '@cdk/components/tipo-relatorio/cdk-tipo-relatorio-form/cdk-tipo-relatorio-form.module';


const routes: Routes = [
    {
        path: ':tipoRelatorioHandle',
        component: TipoRelatorioCreateComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [TipoRelatorioCreateComponent],
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
        MatStepperModule,
        TipoRelatorioCreateStoreModule,
        CdkTipoRelatorioFormModule

    ],
    providers: [
        ResolveGuard,
        TipoRelatorioService,
    ]
})
export class TipoRelatorioCreateModule {
}
