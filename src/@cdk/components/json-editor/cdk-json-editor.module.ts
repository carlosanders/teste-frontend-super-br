import {NgModule} from '@angular/core';
import {NgJsonEditorModule} from 'ang-jsoneditor';
import {CdkJsonEditorComponent} from './cdk-json-editor.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
        CdkJsonEditorComponent
    ],
    imports: [
        NgJsonEditorModule,
        ReactiveFormsModule
    ],
    providers: [],
    exports: [
        CdkJsonEditorComponent
    ]
})
export class CdkJsonEditorModule { }
