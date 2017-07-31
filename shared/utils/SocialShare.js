import openWindow from './NativePopup';

const fbSharedUrl = 'https://www.facebook.com/dialog/share?app_id=1886375048260584&href=';
const twitterSharedUrl = 'https://twitter.com/intent/tweet?url=';

export function FBShare(sharedUrl, redirectUrl, caption = 'The Global Images Market', desc = '') {
    let fullTargetUrl = window.location.protocol + '//' + window.location.host + redirectUrl;
    openWindow(fbSharedUrl + fullTargetUrl + '&picture=' + (sharedUrl || '') + "&caption="
        + caption + "&description=" + desc, {
        height: 400,
        width: 550
    });
}

export function TwitterShare(sharedUrl, redirectUrl) {
    let fullTargetUrl = window.location.protocol + '//' + window.location.host + redirectUrl;
    openWindow(twitterSharedUrl + fullTargetUrl + '&text=Agora images shared', {height: 400, width: 550});
}