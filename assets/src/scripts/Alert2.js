let alert = require('alert');

const js = {
    _alert: null,           // prefab
    
    show(detailString, enterCallBack, needCancel, animSpeed){
        
        alert.show.call(this, detailString, "取消", "确认", function (type) {
            console.log("取消");
        });
    },
}

export default js;