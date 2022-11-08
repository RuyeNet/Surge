/*
https:\/\/api.m.jd.com\/client\.action\?functionId\=ccNeckLaceCouponCheck url script-response-body https://raw.githubusercontent.com/RuyeNet/QuantumultX/main/ccNeckLaceCouponCheck.js
hostname= api.m.jd.com
*/

var obj = JSON.parse($response.body);
obj = {
	"code": "0",
	"success": true,
	"message": "成功",
	"result": {
		"necklaceCheckRes": {
			"resultCode": 2,
			"necklaceNum": 20000
		}
	},
	"lastFlag": null,
	"busiCode": "0"
};

$done({
	body: JSON.stringify(obj)
});
