//DELETES TWEET
//deleteTweet('cummycummy');
function deleteTweet(text){
    console.log('DELETING TWEET:\n');
    var options = { 
        screen_name: 'PopOff03671326'
        //count: 100
    };
    T.get('statuses/user_timeline', options , (err, data)=>{
        if (err) console.log('unsuccessfull timeline catch');
        else {
            //console.log('The data:', data);
            let needToDeleteIds = data.filter(obj=>{
                console.log('reply id:', obj.in_reply_to_status_id, '\ntexts:', obj.text,'\nid:',obj.id_str, '\n');
                return obj.text.includes(text);
            });
            needToDeleteIds.forEach(obj=>{
                T.post('statuses/destroy/:id', {id: obj.id_str}, (err, datas)=>{
                    console.log('The Delete Data:', datas);
                    if(err) 'ERROR IN DELETING';
                    else console.log('Destroyed Tweet of id', obj.id_str, 'with text:', obj.text, '\n');
                });
            });
        }
    });
}  

module.exports = deleteTweet