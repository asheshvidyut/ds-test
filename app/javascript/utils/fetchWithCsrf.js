export default function (url, config, useJson = false) {
    const token = document.querySelector('[name=csrf-token]').content
    config['headers'] = {...config['headers'], 'X-CSRF-TOKEN': token}
    if (useJson) {
        config['headers'] = {...config['headers'], 'Content-Type': 'application/json'}
    }
    return fetch(url, config);
}