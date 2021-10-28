import {NgModule} from '@angular/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatTooltipModule,
} from '@cdk/angular/material';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkVisibilidadeRoleFormComponent} from './cdk-visibilidade-role-form.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {TipoRelatorioService} from '../../../services/tipo-relatorio.service';

@NgModule({
    declarations: [
        CdkVisibilidadeRoleFormComponent,
    ],
    imports: [
        MatAutocompleteModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatCheckboxModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        MatTooltipModule,
        CdkSharedModule,
        MatCardModule,
        MatSelectModule,
    ],
    providers: [
        TipoRelatorioService
    ],
    exports: [
        CdkVisibilidadeRoleFormComponent
    ]
})
export class CdkVisibilidadeRoleFormModule {
}
