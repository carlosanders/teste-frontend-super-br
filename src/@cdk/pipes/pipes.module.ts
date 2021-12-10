import {NgModule} from '@angular/core';

import {FormatNupPipe} from './format-nup.pipe';
import {HighlightOptionPipe} from './highlight-option.pipe';
import {SafeHtmlPipe} from './safe-html.pipe';
import {KeysPipe} from './keys.pipe';
import {GetByIdPipe} from './getById.pipe';
import {HtmlToPlaintextPipe} from './htmlToPlaintext.pipe';
import {FilterPipe} from './filter.pipe';
import {CamelCaseToDashPipe} from './camelCaseToDash.pipe';
import {BooleanoPipe} from './booleano.pipe';
import {TitleCasePipe} from './title-case.pipe';
import {FormatInteressadosPipe} from './format-interessados.pipe';
import {SortByDatePipe} from './sort-by-date.pipe';
import {SafeResourceUrlPipe} from './safe-resource-url.pipe';
import {StatusBarramentoPipe} from './status-barramento.pipe';

@NgModule({
    declarations: [
        FormatNupPipe,
        SafeHtmlPipe,
        HighlightOptionPipe,
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        BooleanoPipe,
        TitleCasePipe,
        FormatInteressadosPipe,
        SortByDatePipe,
        SafeResourceUrlPipe,
        StatusBarramentoPipe
    ],
    imports: [],
    exports: [
        FormatNupPipe,
        SafeHtmlPipe,
        HighlightOptionPipe,
        KeysPipe,
        GetByIdPipe,
        HtmlToPlaintextPipe,
        FilterPipe,
        CamelCaseToDashPipe,
        BooleanoPipe,
        TitleCasePipe,
        FormatInteressadosPipe,
        SortByDatePipe,
        SafeResourceUrlPipe,
        StatusBarramentoPipe
    ]
})
export class PipesModule {
}
