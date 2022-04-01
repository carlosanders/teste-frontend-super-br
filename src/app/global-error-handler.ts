import {ErrorHandler, Injectable} from '@angular/core';
import {environment} from '../environments/environment';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    errorMessage: string;
    handleError(error): void {
        if (error.message === this.errorMessage) {
            return;
        }
        this.errorMessage = error.message;
        console.log (error);
        const path = 'log_collector';
        if (window.location.pathname.indexOf('ckeditor') > -1) {
            alert('Inconsistência grave detectada, favor salvar o trabalho manualmente em outro local e recarregar o editor!');
        }
        fetch(
            `${environment.base_url}${path}` + environment.xdebug,
            {
                method: 'POST',
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: error.message,
                    stack: error.stack,
                    url: window.location.pathname
                })
            }
        ).then();
    }
}
