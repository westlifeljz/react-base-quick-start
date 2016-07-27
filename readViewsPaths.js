/**
 * Created by luojianzong on 16/7/19.
 */
var fs = require("fs");

var path = {
    "pc" : "./src/views/pc/",
    "mobile" : "./src/views/mobile/",
    "pad" : "./src/views/pad/"
};

console.log(fs.existsSync("./src/views/pad/"));

function mapPackagePathToSrcPath (type, path, isDev) {
    if (!fs.existsSync(path)) {
        return ;
    }
    var files = fs.readdirSync(path);

    var mapPackagePathToSrcPathObj = {};

    var fileName = "";
    for (var i = 0; i < files.length; i++) {
        fileName = files[i].split(".");
        mapPackagePathToSrcPathObj["js/"+type+"/"+fileName[0]] = ["./src/views/" + type + "/" + files[i]];
        if (isDev) {
            mapPackagePathToSrcPathObj["js/"+type+"/"+fileName[0]].push('webpack-hot-middleware');
        }
    }
    return mapPackagePathToSrcPathObj;
}

function getAllEnvPath (isDev) {
    var pathObj = {};

    for (var key in path) {
        tempObj = mapPackagePathToSrcPath(key, path[key], isDev);
        for (var fileName in tempObj) {
            pathObj[fileName] = tempObj[fileName];
        }
    }
    return pathObj;
}

function getEnvPath (key, isDev) {
    return mapPackagePathToSrcPath(key, path[key], isDev);
}


module.exports = {
    getAllEnvPath : getAllEnvPath,
    getEnvPath : getEnvPath
};




