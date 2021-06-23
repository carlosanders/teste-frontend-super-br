import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {FlexLayoutModule} from '@angular/flex-layout';

import {DirectivesModule} from '@cdk/directives/directives';
import {PipesModule} from '@cdk/pipes/pipes.module';

@NgModule({
    imports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        DirectivesModule,
        PipesModule
    ],
    exports  : [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        DirectivesModule,
        PipesModule
    ]
})
export class CdkSharedModule
{
}
