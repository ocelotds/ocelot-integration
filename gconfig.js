/**
 * 
 * Default value, can be override by gulp arguments
 * example : gulp --rootapp=app --dist=dist --bowerfolder=bower_components --jsname=appscripts.js --cssname=styles.css --bowerjs=bower.js
 */
/**
 * The directory where gulp export 
 */
module.exports.dist = 'target';
/**
 * The source root of website
 */
module.exports.rootApp = 'src/main/html';
/**
 * The name of js file result from app js
 */
module.exports.jsName = 'js/main.js'; 
/**
 * The name of css file result from app css and bower css
 */
module.exports.cssName = 'css/main.css'; 
/**
 * The name of js file result from bower js
 */
module.exports.bowerJs = 'js/vendors.js';
/**
 * All vendors css files, they will be concat in cssName file
 */
module.exports.vendorsCssFiles = [
   'bootstrap/dist/css/bootstrap.css',
   'bootstrap/dist/css/bootstrap-theme.css',
   'qunit/qunit/qunit.css'
];
/**
 * All dependencies js files from bower install
 */
module.exports.vendorsJsFiles = [
	'jquery/dist/jquery.js',
   'qunit/qunit/qunit.js'
];
/**
 * Asset vendors files, can be a simple resource or structured object {"source":"", "target":""}
 * Typiquely asset tah can't be concate with others, or library try to access dynamicly (map, fonts, images...)
 */
module.exports.vendorsAssetFiles = [
];

