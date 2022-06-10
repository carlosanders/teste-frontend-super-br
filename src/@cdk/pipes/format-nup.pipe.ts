import {Pipe, PipeTransform} from '@angular/core';

/*
 * Formata o NUP
*/
@Pipe({name: 'formatNup'})
export class FormatNupPipe implements PipeTransform {
    transform(nup: string): string {
        return FormatNupPipe.format(nup);
    }

    static format(nup: string): string {
        switch (nup?.length) {
            case 17:
                return nup.substr(0, 5) + '.' + nup.substr(5, 6) + '/' + nup.substr(11, 4) + '-' + nup.substr(15, 2);
            case 15:
                return nup.substr(0, 5) + '.' + nup.substr(5, 6) + '/' + nup.substr(11, 2) + '-' + nup.substr(13, 2);
            default:
                return nup;
        }
    }
}
