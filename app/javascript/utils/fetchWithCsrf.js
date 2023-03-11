export default function (url, config) {
    const token = document.querySelector('[name=csrf-token]').content
    config['headers'] = {...config['headers'], 'X-CSRF-TOKEN': token}
    return fetch(url, config);
}