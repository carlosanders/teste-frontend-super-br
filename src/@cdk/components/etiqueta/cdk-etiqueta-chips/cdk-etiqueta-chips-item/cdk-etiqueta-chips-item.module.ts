import {
    MatAutocompleteModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule
} from '@cdk/angular/material';
import {NgModule} from '@angular/core';
import {CdkSharedModule} from '@cdk/shared.module';
import {CdkEtiquetaChipsItemComponent} from './cdk-etiqueta-chips-item.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
    declarations: [
        CdkEtiquetaChipsItemComponent,
    ],
    imports: [
        MatFormFieldModule,
        MatAutocompleteModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatIconModule,
        MatTooltipModule,
        MatButtonModule,
        CdkSharedModule,
        MatMenuModule,
        MatBadgeModule,
    ],
    providers: [],
    exports: [
        CdkEtiquetaChipsItemComponent
    ]
})
export class CdkEtiquetaChipsItemModule {
}
