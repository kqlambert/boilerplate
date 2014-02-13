/* ------------------------------------------------
// GLOBALS
------------------------------------------------ */
/*global $*/
/*global alert*/
/*global window*/
/*global document*/
/*global console*/
/*global encodeURI*/
/*node browser: true*/
var $body = $('body');
// simplify ajax calls
function ajx($method, $url, $data, $async, $type, $cache, $result) {
	'use strict';
	if (!$type) {
		$type = 'post';
	}
	if (!$async) {
		$async = true;
	}
	if (!$type) {
		$type = 'text';
	}
	if (!$cache) {
		$cache = false;
	}
	$.ajax({
		type: $method,
		url: $url,
		data: $data,
		async: $async,
		dataType: $type,
		cahce: $cache,
		beforeSend: function () {
			console.log('start');
		},
		complete: function () {
			console.log('end');
		},
		success: function (re) {
			$result(re);
		},
		error: function (re) {
			$result(re.responseText);
		}
	});
}
