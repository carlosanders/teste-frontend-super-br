import {NgModule} from '@angular/core';

import {FormatNupPipe} from './format-nup.pipe';
import {HighlightOptionPipe} from './highlight-option.pipe';

@NgModule({
    declarations: [
        FormatNupPipe,
        HighlightOptionPipe,
    ],
    imports: [],
    exports: [
        FormatNupPipe,
        HighlightOptionPipe
    ]
})
export class PipesModule {
}
