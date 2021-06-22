const protocol = location.protocol; // https:
const basename = location.hostname.split('.')[0]; // supp
const url = location.hostname.replace(basename, ''); // .agu.gov.br

export const environment = {
    test: false,
    production: true,
    base_url: protocol + '//' + basename + 'backend' + url + '/',
    base_url_x509: protocol + '//' + basename + 'backendsecure' + url + '/',
    jnlp: 'jnlps://' + basename + 'backend' + url + '/',
    api_url: protocol + '//' + basename + 'backend' + url + '/v1/',
    mercure_hub: protocol + '//' + basename + 'mercure' + url + '/.well-known/mercure',
    xdebug: '',
    barramento: false
};
