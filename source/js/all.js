var list = document.querySelector('.list');
var area = document.getElementById('s-area');
var nav = document.querySelector('.nav');
var title = document.querySelector('.area-title');

//撈取資料
var data = [];
var url ="https://github.com/laingyilee/travelinfo/blob/master/data.json";
var xhr = new XMLHttpRequest();
var content;
var len;
var option = '';


//格式 讀取網址 同步(不會等回傳值後才繼續執行程式)非同步
xhr.open('get', url, true);
//空的資料
xhr.send(null);
//等資料回傳後，執行動作
xhr.onload = function(){
	if (xhr.status==200){
          content = JSON.parse(xhr.responseText);
          data = content.result.records;
          len= data.length;
          uploadOption();
	}else {
		console.log('資料抓取錯誤!');
	}
}


function uploadOption(){
    var selectItem = [];
	for(var i = 0;i<len;i++){
         if (selectItem.indexOf(data[i].Zone) == -1) {
            selectItem.push(data[i].Zone);
        }
	}

	for(var i=0;i<selectItem.length;i++){
		option+= '<option>'+selectItem[i]+'</option>';
	}
	area.innerHTML = '<option disabled selected value> -- 請選擇行政區 -- </option>'+option;
};


function updataList(e){
	var select = e.target.value;
	var str = '';
	for(var i = 0;i<len;i++){
		if(select == data[i].Zone){
			//console.log(data[i].Picture1);
			str+= '<li><div class="space"><div class="top" style="background: url('+data[i].Picture1+');"><div class="top-info"><h3>'+data[i].Name+'</h3><span>'+data[i].Zone+'</span></div></div><div class="list-content"><p class="Opentime">'+data[i].Opentime+'</p><p class="add">'+data[i].Add+'</p><p class="info">'+data[i].Tel+'</p><span class="tag">'+data[i].Ticketinfo+'</span></div></div></li>';
		}
	}
	title.innerHTML = e.target.value;
	list.innerHTML = str;
};

nav.addEventListener('click',updataListb,false);
function updataListb(e){
	if(e.target.nodeName!=='A'){return};
	e.preventDefault();
	var click = e.target.name;
	var str = '';	
	for(var i = 0;i<len;i++){
		if(click == data[i].Zone){
			str+= '<li><div class="space"><div class="top" style="background: url('+data[i].Picture1+');"><div class="top-info"><h3>'+data[i].Name+'</h3><span>'+data[i].Zone+'</span></div></div><div class="list-content"><p class="Opentime">'+data[i].Opentime+'</p><p class="add">'+data[i].Add+'</p><p class="info">'+data[i].Tel+'</p><span class="tag">'+data[i].Ticketinfo+'</span></div></div></li>';
		}
	}
	title.innerHTML = e.target.name;
	list.innerHTML = str;
};

area.addEventListener('change',updataList,false);
//http://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97




