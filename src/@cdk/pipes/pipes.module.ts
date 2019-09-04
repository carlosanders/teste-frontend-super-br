import {NgModule} from '@angular/core';

import {FormatNupPipe} from './format-nup.pipe';
import {HighlightOptionPipe} from './highlight-option.pipe';
import {SafeHtmlPipe} from './safe-html.pipe';

@NgModule({
    declarations: [
        FormatNupPipe,
        SafeHtmlPipe,
        HighlightOptionPipe,
    ],
    imports: [],
    exports: [
        FormatNupPipe,
        SafeHtmlPipe,
        HighlightOptionPipe
    ]
})
export class PipesModule {
}
