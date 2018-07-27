const loaderUtils = require("loader-utils");
module.exports = function (content) {
    if(this.cacheable) this.cacheable();
    let query = loaderUtils.getOptions(this) || {},
        type = query.type || 'insert',
        startKey = query.startKey || '//y-loader-start',
        endKey = query.endKey || '//y-loader-end',
        contentArr = content.split('\r\n'),
        start = false,
        end=false;
    contentArr.forEach((item,index)=>{
        if(item.replace(/\s+/g,"") === '//'+startKey){
            start = index
        }else if(item.replace(/\s+/g,"") === '//'+endKey){
            end = index
        }
    })
    if(start && end){
        if(type == 'insert'){
            let len = 2;
            contentArr.splice(start,0,' ')
            if(query.data){
                if(query.data instanceof Array){
                    len = query.data.length;
                    for(let i=0;i<len;i++){
                        contentArr.splice(start+i,0,`${query['data'][i]}`)
                    }
                }else{
                    contentArr.splice(start+1,0,`${query['data']}`)
                }
            }
            contentArr.splice(start+len,0,'')
        }else{
            contentArr.splice(start,(end-start)+1);
        }        
    }
    return contentArr.join('\r\n')
};