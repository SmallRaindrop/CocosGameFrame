var _=require("underscore");

cc.Class({
    extends: cc.Component,

    properties: {
        checkInterval: {
            default:    10,
            type:   cc.Integer,
            tooltip:    "内存检测周期(单位:秒)"
        },
        releaseDelay: {
            default:    10,
            type:   cc.Integer,
            tooltip:    "延时释放(单位:秒)"
        },        
    },

    // use this for initialization
    onLoad: function () {
        // setInterval(this.release,this.default*1000);
    },

    release: function(){
        this._release();
    },

    _release: function(){
        var self = this;
        self.releaseTextures = {};
        var texturesInCache =  _.filter(cc.loader._cache,function(asset){
            // return !(asset.content instanceof cc.Texture2D);
            return true;
        });       
        texturesInCache.forEach(function(texture){
            self.releaseTextures[texture.url] = texture.url;
        });   
        // remove all json and keep texture

        this._keepNodeTexture(cc.director.getScene());
        // var keys = [
        //     "res/import/b5/b5a8f386-b64d-4a20-b2d2-34598d5890c6.json",
        //     "res/import/6b/6ba33d50-1148-4c1c-b1b1-b4af992185c7.json",
        //     "res/import/32/32ffad9d-458d-4fdf-b128-0b32a4f0b12c.json",
        //     "res/import/40/40c2ef5b-b171-45ef-8188-1740a45ce92f.json",
        // ]; 
        // keys.forEach(function(key){
        //     self.releaseTextures[key] = key;
        // });
        cc.log("释放了");
        cc.log(Object.keys(this.releaseTextures));
        for (var texture in this.releaseTextures) {
            cc.loader.release(texture);
        }          

        cc.log("当前缓存");         
        cc.log(Object.keys(cc.loader._cache));         
        cc.log(cc.loader._cache);         
    },

    _keepNodeTexture: function( node ){
        var self = this; 
        if ( !(node instanceof cc.Scene ) ){
            self._executeKeep(node);            
        }        
        var children = node._children;      
        children.forEach(function(child){
            self._executeKeep(child);     
            self._keepNodeTexture(child);
        });        
    },

    _executeKeep: function(node){
        var sprite = node.getComponent(cc.Sprite);
        if(sprite&&sprite.spriteFrame){
            cc.log(sprite);
            delete this.releaseTextures[sprite.spriteFrame._textureFilename];
        }
        var button = node.getComponent(cc.Button);
        if(button){
            if(button.normalSprite){
                delete this.releaseTextures[button.normalSprite._textureFilename];
            }
            if(button.pressedSprite){
                delete this.releaseTextures[button.pressedSprite._textureFilename];
            }
            if(button.hoverSprite){
                delete this.releaseTextures[button.hoverSprite._textureFilename];
            }
            if(button.disabledSprite){
                delete this.releaseTextures[button.disabledSprite._textureFilename];
            }                                    
        }          
        var label = node.getComponent(cc.Label);
        if(label&&label.font&&label instanceof cc.BitmapFont&&label.font.spriteFrame){
            delete this.releaseTextures[label.font.spriteFrame._textureFilename];
        }  
        var richText = node.getComponent(cc.RichText);
        if(richText&&richText.imageAtlas){
            var keys = Object.keys(richText.imageAtlas._spriteFrames);
            if (keys.length > 0) {
                delete this.releaseTextures[richText.imageAtlas._spriteFrames[keys[0]]._textureFilename];
            }
        } 
        var particleSystem = node.getComponent(cc.ParticleSystem);
        if(particleSystem&&particleSystem._texture){
            delete this.releaseTextures[particleSystem._texture];
        } 
        var pageViewIndicator = node.getComponent(cc.PageViewIndicator);
        if(pageViewIndicator&&pageViewIndicator.spriteFrame){
            delete this.releaseTextures[pageViewIndicator.spriteFrame._textureFilename];
        }  
        var editBox = node.getComponent(cc.EditBox);
        if(editBox&&editBox.backgroundImage){
            delete this.releaseTextures[editBox.backgroundImage._textureFilename];
        }
        var mask = node.getComponent(cc.Mask);
        if(mask&&mask.spriteFrame){
            delete this.releaseTextures[mask.spriteFrame._textureFilename];
        }                                      
    },
});