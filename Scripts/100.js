/*
@Hausd0rff 低调使用

拦截100 = type=http-response,pattern=^https?:\/\/tagit\.hyhuo\.com\/cypt\/block100\/get_vip_info$,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/guajie/Surge/master/Scripts/100.js,script-update-interval=0

hostname = tagit.hyhuo.com

*/
var body = $response.body;
    
body = "lvCQG8cCxqficLk+LttK+L2YRSLM39a3jj+Mfoba4wNaV8x54RYUAWrJvcwwFZemFEWG5xK2FlI8k2hlHsSW7uaAeW45GPxSPt1uvVwPI5zLiMJuHvGycPsqS+ozuIELUsmxd901h+fpVaDUSy+5KRrW+M+mVJRARweO6FjfHosZ/pP8kkty3hz0uDRWb9enH9pG+36Issw9aJCxSkok0Q==";

$done({ body });
