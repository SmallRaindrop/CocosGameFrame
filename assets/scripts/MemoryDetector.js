cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        var _MemLabel = null;
        var profiler = cc.profiler;
        profiler.showStats();
        var createMemLabel = function () {
            _MemLabel = document.createElement('div');
            profiler._fps = document.getElementById('fps');
            profiler._fps.style.height = '100px';
            var style = _MemLabel.style;
            style.color = 'rgb(0, 255, 255)';
            style.font = 'bold 12px Helvetica, Arial';
            style.lineHeight = '20px';
            style.width = '100%';
            profiler._fps.appendChild(_MemLabel);
        }; 
        createMemLabel();

        var afterVisit = function () {
            var count = 0;
            var totalBytes = 0, locTextures = cc.textureCache._textures;

            for (var key in locTextures) {
                var selTexture = locTextures[key];
                count++;
                totalBytes += selTexture.getPixelWidth() * selTexture.getPixelHeight() * 4;
            }

            var locTextureColorsCache = cc.textureCache._textureColorsCache;
            for (key in locTextureColorsCache) {
                var selCanvasColorsArr = locTextureColorsCache[key];
                for (var selCanvasKey in selCanvasColorsArr) {
                    var selCanvas = selCanvasColorsArr[selCanvasKey];
                    count++;
                    totalBytes += selCanvas.width * selCanvas.height * 4;
                }
            }
       
             _MemLabel.innerHTML = (totalBytes / (1024.0 * 1024.0)).toFixed(2)+"M";
        };
        cc.director.on(cc.Director.EVENT_AFTER_VISIT, afterVisit);
    },
});
