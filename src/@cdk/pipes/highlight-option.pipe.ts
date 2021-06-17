import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Pipe({name: 'highlightOption'})
export class HighlightOptionPipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(text: string, search: string): any {
        if (!text || !search || (typeof search !== 'string')) {
            return text;
        }
        const pattern = search
            .replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')
            .split(' ')
            .filter(t => t.length > 0)
            .join('|');
        const regex = new RegExp(pattern, 'gi');

        return this.sanitizer.bypassSecurityTrustHtml(
            text.replace(regex, match => `<b>${match}</b>`)
        );
    }
}
