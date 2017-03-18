/**
 *耗时检测工具
 */

var TimeTake = {

    startTimes: {},   //开始时间集

    /**
     * 耗时检测开始
     */
    start: function(tag){
        this.startTimes.tag = new Date().getMilliseconds();;
    },

    /**
     * 耗时检测结束
     */
    end: function(tag){
        cc.log(tag+" 耗时"+(new Date().getMilliseconds()-this.startTimes.tag)/1000.0);
    },
};

module.exports = TimeTake;