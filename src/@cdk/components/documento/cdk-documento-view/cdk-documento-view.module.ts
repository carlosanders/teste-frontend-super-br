import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DocumentoViewComponent} from './cdk-documento-view.component';
import {MatIconModule} from '@cdk/angular/material';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {DirectivesModule} from '../../../directives/directives';


@NgModule({
    declarations: [DocumentoViewComponent],
    exports: [
        DocumentoViewComponent
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatButtonModule,
        FlexModule,
        MatTooltipModule,
        DirectivesModule
    ]
})
export class CdkDocumentoViewModule { }
