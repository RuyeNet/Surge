exports.niu = sender => {
  bd();
};

dwow=["士兵","骑士","主教","堡垒","国王","王后"]

function bd() {
     $ui.animate({
                    duration: 0.4,
                    velocity: 0.5,
                    animation: () => {
      mingzi.alpha=0
      surge.alpha=0
      duanwei.alpha=0
      changci.alpha=0
  
                  }
                  });
  $input.text({
    type: $kbType.number,
    placeholder: "请输入Dota2 id",
    handler: function(text) {
      $cache.set("id", text);
      urlsp()
    }
  });
}

function urlsp(){
  adj=(960265728+parseInt($cache.get("id"))).toString()
    $http.get({
    url: "http://www.autochess-stats.com/backend/api/dacprofiles/"+(adj.length==9?76561197:76561198)+(adj.length==9?adj:adj.substring(1)),
    handler: function(resp) {
      var data = resp.data
      console.info(data)
      mingzi.text=data.personaName
            changci.text=data.dacProfile.matchesPlayed
            surge.text=data.dacProfile.candies
            duanwei.text=dwow[(parseInt(data.dacProfile.rank/9)==data.dacProfile.rank/9?(data.dacProfile.rank/9)-1:parseInt(data.dacProfile.rank/9))]+((data.dacProfile.rank%9)==0?9:(data.dacProfile.rank%9))+"段"        
                $ui.animate({
                  duration: 0.4,
                  velocity: 0.5,
                  animation: () => {
    mingzi.alpha=1
    surge.alpha=1
    duanwei.alpha=1
    changci.alpha=1

                }
                });
    }
  })
  
}
let changci = $("label[1]");

let surge = $("label[6]");

let duanwei = $("label[7]");

let mingzi = $("label[0]");

mingzi.alpha=0
surge.alpha=0
duanwei.alpha=0
changci.alpha=0

if ($cache.get("id") == undefined) {
  $ui.alert({
    title: "初次使用请绑定Dota2id",
    actions: [
      {
        title: "绑定",
        handler: function() {
          bd();
        }
      }
    ]
  });
}else{
 urlsp()

}
