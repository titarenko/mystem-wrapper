var spawn = require('child_process').spawn;
var Promise = require('bluebird');
var byline = require('byline');
var _ = require('lodash');
var join = require('path').join;

var processParams = ['-lig', '--format', 'json'];
var myStemDefaultPath = join(__dirname, 'vendor', process.platform, 'mystem');
var mySteamBinPath  = process.env.MYSTEM_PATH || myStemDefaultPath;
var mystem;
var queue = [];

function myStemStart(params) {
	params = params ? ['-', params].join('') : '-lig';
	mystem = spawn(mySteamBinPath, [params].concat(processParams), {stdio: 'pipe'});
	byline(mystem.stdout).on('data', _.flow(getData, _.partial(respond, 'resolve')));
	byline(mystem.stderr).on('data', _.flow(getError, _.partial(respond, 'reject')));
}

function getData (data) {
	var json = data.toString();
	return JSON.parse(json);
}

function getError (data) {
	return data.toString();
}

function respond (method, data) {
	var request = queue[0];
	queue = queue.slice(1);
	if (request && request[method]) {
		request[method](data);
	}
}



function analyze (text) {
	return new Promise(function (resolve, reject) {
		queue.push({
			resolve: resolve,
			reject: reject
		});
		mystem.stdin.write(text + '\n');
	});
}

function close () {
	return new Promise(function (resolve, reject) {
		mystem.on('close', resolve);
		mystem.on('error', reject);
		mystem.kill();
	});
}

module.exports = {
	analyze: analyze,
	close: close,
	start: myStemStart
};
