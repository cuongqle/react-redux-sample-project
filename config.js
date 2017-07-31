require('babel-polyfill');

let uploadConfig = {
    ext: "image/jpeg, image/jpg",
    maxSize: 5e+7,
    minSize: 0,
    minWidth: 0,
    minHeight: 0,
    profile: {
        minWidth: 0,
        minHeight: 0
    },
    cover: {
        minWidth: 0,
        minHeight: 0
    },
    s3: {
        prefix: {
            agoraimg: 'agoraimg',
            cover: 'cover',
            profile: 'profile'
        },
        bucketName: 'stag-upload-agora',
        bucketRegion: 'eu-central-1',
        identityPoolId: 'eu-central-1:37d3fd52-d495-4ebe-991b-b65ea64898f0'
    },
    notifyDismiss: 5,
    maxTitleCharacter: 140,
    tagRegex: /^[a-zA-Z0-9_#]+$/
};

let apiMeFields = ["id", "email", "name"];
let fbConfig = {
    _version: 'v2.6',
    _source: '//connect.facebook.net/en_US/sdk.js',
    _sourceScriptId: 'facebook-jssdk',
    apiMe: `/me?fields=${apiMeFields.join(",")}`,
    scope: 'email,public_profile',
    appId: '1886375048260584',
    profileUrl: 'https://www.facebook.com/agoraimages'
};
let twConfig = {
    profileUrl: 'https://twitter.com/agoraimages'
};
let stripeConfig = {
    client_id: 'ca_9wkjTTW4GBTA3et2rqhdzui3s7sLfVov',
    api_key: 'sk_live_GcrA9rlqQiZSSw2MTHWQdZgK',
    test_api_key: 'sk_test_39LPBtXxCPQylydXtLfiTYat'
}

const environment = {
    development: {
        isProduction: false,
        api: {
            host: 'http://127.0.0.1',
            port: 8000,
            url: 'http://127.0.0.1:8000'
        },
        uploads: uploadConfig,
        fbSdk: fbConfig,
        twConfig: twConfig,
        stripeConfig: stripeConfig,
        media: {
            limitPerCall: 20
        }
    },
    local: {
        isProduction: false,
        api: {
            host: 'http://localhost',
            port: 8000,
            url: 'http://localhost'
        },
        uploads: uploadConfig,
        fbSdk: fbConfig,
        twConfig: twConfig,
        stripeConfig: stripeConfig,
        media: {
            limitPerCall: 20
        }
    },
    staging: {
        isProduction: false,
        api: {
            host: 'http://54.93.112.38',
            port: 8000,
            url: 'http://54.93.112.38:8000'
        },
        uploads: uploadConfig,
        fbSdk: fbConfig,
        twConfig: twConfig,
        stripeConfig: stripeConfig,
        media: {
            limitPerCall: 20
        }
    },
    qa: {
        isProduction: false,
        api: {
            host: 'http://54.93.112.38',
            port: 8001,
            url: 'http://54.93.112.38:8001'
        },
        uploads: uploadConfig,
        fbSdk: fbConfig,
        twConfig: twConfig,
        stripeConfig: stripeConfig,
        media: {
            limitPerCall: 20
        }
    },
    production: {
        isProduction: true,
        api: {
            host: 'http://54.93.112.38',
            port: 8002,
            url: 'http://54.93.112.38:8002'
        },
        uploads: uploadConfig,
        fbSdk: fbConfig,
        twConfig: twConfig,
        stripeConfig: stripeConfig,
        media: {
            limitPerCall: 20
        }
    }
}[process.env.NODE_ENV || 'development'];

module.exports = environment;
