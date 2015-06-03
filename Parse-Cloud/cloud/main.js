/* global Parse */
var fs = require('fs');
var layer = require('cloud/layer-parse-module/layer-module.js');

var layerProviderID = '5b123710-0a19-11e5-bb28-84d0f7020f8d';
var layerKeyID = '0bb60d8a-0a1a-11e5-8b7f-84d0df025a59';
var privateKey = fs.readFileSync('cloud/layer-parse-module/keys/layer-key.js');
layer.initialize(layerProviderID, layerKeyID, privateKey);

// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("generateToken", function(request, response) {
    var userID = request.params.userID;
    var nonce = request.params.nonce;
    if (!userID) throw new Error('Missing userID parameter');
    if (!nonce) throw new Error('Missing nonce parameter');
        response.success(layer.layerIdentityToken(userID, nonce));
});
