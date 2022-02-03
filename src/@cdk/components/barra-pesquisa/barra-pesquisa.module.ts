import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {BarraPesquisaComponent} from './barra-pesquisa.component';
import {CdkProcessoSearchAutocompleteModule} from '../processo/cdk-processo-search-autocomplete/cdk-processo-search-autocomplete.module';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {CdkProcessoAutocompleteModule} from '../processo/cdk-processo-autocomplete/cdk-processo-autocomplete.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {ExtendedModule} from "@angular/flex-layout";

@NgModule({
    declarations: [
        BarraPesquisaComponent
    ],
    imports: [
        CommonModule,
        RouterModule,

        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        CdkProcessoSearchAutocompleteModule,
        MatAutocompleteModule,
        MatFormFieldModule,

        CdkProcessoAutocompleteModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatTooltipModule,
        ExtendedModule
    ],
    exports: [
        BarraPesquisaComponent
    ]
})
export class BarraPesquisaModule {
}
