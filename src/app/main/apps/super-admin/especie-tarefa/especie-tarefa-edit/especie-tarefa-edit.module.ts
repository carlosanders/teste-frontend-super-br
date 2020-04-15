import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EspecieTarefaEditComponent} from './especie-tarefa-edit.component';
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
} from '../../../../../../@cdk/angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {CdkSharedModule} from '../../../../../../@cdk/shared.module';
import {CdkSidebarModule} from '../../../../../../@cdk/components';
import {MatStepperModule} from '@angular/material/stepper';
import * as fromGuards from './store/guards';
import {ResolveGuard} from './store/guards';
import {EspecieTarefaEditStoreModule} from './store/store.module';
import {EspecieTarefaService} from '../../../../../../@cdk/services/especie-tarefa.service';
import {ColaboradorService} from '../../../../../../@cdk/services/colaborador.service';


const routes: Routes = [
    {
        path: ':especieTarefaHandle',
        component: EspecieTarefaEditComponent,
        canActivate: [fromGuards.ResolveGuard]
    }
];


@NgModule({
    declarations: [EspecieTarefaEditComponent],
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
        EspecieTarefaEditStoreModule

    ],
    providers: [
        ResolveGuard,
        EspecieTarefaService,
        ColaboradorService
    ]
})
export class EspecieTarefaEditModule {
}
