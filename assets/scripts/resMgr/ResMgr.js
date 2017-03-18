/**
 * 资源管理器
 */


var AssetMgr = {

    prefabs: {},
    texture2Ds: {},

    ref: function(asset){
        if ( asset.ref == undefined ){
            asset.ref = 1;
        }else{
            asset.ref = asset.ref + 1;
        }
    },

    unref: function(asset){
        if ( asset.ref == undefined ){
            cc.error(asset + " 该对象不是通过AssetMgr加载的");
            return;
        }
        asset.ref = asset.ref - 1;        
    },

    refPrefab: function(prefab){
      var deps = cc.loader.getDependsRecursively(prefab);
      var textures = [];
      for (var i = 0; i < deps.length; ++i) {
          var item = cc.loader.getRes(deps[i]);
          if (item instanceof cc.Texture2D) {
              ref(item);
          }
      }
    },

    unrefPrefab: function(asset){
      var deps = cc.loader.getDependsRecursively(prefab);
      var textures = [];
      for (var i = 0; i < deps.length; ++i) {
          var item = cc.loader.getRes(deps[i]);
          if (item instanceof cc.Texture2D) {
              unref(item);
          }
      }    
    },           

    /**
     * 加载图集资源
     */

    /**
     * 加载预制资源
     * 资源在缓存中，则直接返回；否则加载后返回。
     */
    loadPrefab: function(path){
        var self = this; 
        self.loading = false;       
        var prefab = prefabs[path];
        if ( prefab == null ){
            self.loading = true;
            cc.loader.loadRes(path,cc.Prefab,function (err,asset) {
                if (err) {
                    cc.error(err.message || err);
                    self.loading = false;
                    return;
                }
                self.loading = false;
                prefab = asset;                        
            }); 
        }

        while(self.loading){

        } 

        if ( prefab != null ){
            refPrefab(prefab);            
            return prefab;
        }           
    },

    /**
     * 释放预制资源
     */
    releasePrefab: function(path){
        this.prefabs[path]
    },

    /**
     * 加载图集
     */
    loadAtlas: function(path,callback) {
        cc.loader.loadRes(path,cc.SpriteAtlas,function (err,atlasLoaded) {
            if (err) {
                cc.error(err.message || err);
            }
            else{
                callback(atlasLoaded);
            }                  
        });         
    },

};

module.exports = AssetMgr;
