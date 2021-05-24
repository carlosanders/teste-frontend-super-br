import {ChangeDetectionStrategy, Component, Input, ViewChild, ViewEncapsulation} from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import {cdkAnimations} from '@cdk/animations';

@Component({
    selector: 'cdk-json-editor',
    templateUrl: './cdk-json-editor.component.html',
    styleUrls: ['./cdk-json-editor.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    animations: cdkAnimations,
})
export class CdkJsonEditorComponent {

    @Input()
    editorOptions: JsonEditorOptions;

    @Input()
    dataSchema: any;

    @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;

    constructor() {
        this.editorOptions = new JsonEditorOptions();
        this.editorOptions.modes = ['code', 'text', 'tree', 'view']; // set all allowed modes
        //this.options.mode = 'code'; //set only one mode

        this.dataSchema = {
            'products':[
                {'name':'car',
                    'product':[
                        {'name':'honda',
                            'model':[
                                {'id':'civic','name':'civic'},
                                {'id':'accord','name':'accord'},
                                {'id':'crv','name':'crv'},
                                {'id':'pilot','name':'pilot'},
                                {'id':'odyssey','name':'odyssey'}
                            ]
                        }
                    ]
                }
            ]
        };
    }
}
