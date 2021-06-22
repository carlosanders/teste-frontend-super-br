import {NgModule} from '@angular/core';

import {CdkSharedModule} from '@cdk/shared.module';
import {CdkRepositorioBarramentoGridsearchComponent} from './cdk-repositorio-barramento-gridsearch.component';
import {VinculacaoPessoaBarramentoService} from "../../../services/vinculacao-pessoa-barramento.service";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
    declarations: [
        CdkRepositorioBarramentoGridsearchComponent
    ],
    imports: [
        CdkSharedModule,
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatTableModule,
        MatSortModule,
        MatButtonModule,
        MatTooltipModule,
    ],
    providers: [
        VinculacaoPessoaBarramentoService
    ],
    exports: [
        CdkRepositorioBarramentoGridsearchComponent
    ]
})
export class CdkRepositorioBarramentoGridsearchModule {
}
