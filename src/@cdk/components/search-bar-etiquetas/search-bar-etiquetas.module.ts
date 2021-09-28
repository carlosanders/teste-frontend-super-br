import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatIconModule} from '@cdk/angular/material';
import {CdkSearchBarEtiquetasComponent} from './search-bar-etiquetas.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';
import {CdkEtiquetaChipsModule} from '../etiqueta/cdk-etiqueta-chips/cdk-etiqueta-chips.module';

@NgModule({
    declarations: [
        CdkSearchBarEtiquetasComponent
    ],
    imports: [
        CommonModule,
        RouterModule,

        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatTooltipModule,
        CdkEtiquetaChipsModule
    ],
    exports: [
        CdkSearchBarEtiquetasComponent
    ]
})
export class CdkSearchBarEtiquetasModule {
}
