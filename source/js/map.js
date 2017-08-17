var area = document.getElementById('s-area');
//撈取資料
var data = [];
var url ="https://github.com/laingyilee/travelinfo/blob/master/data.json";
var xhr = new XMLHttpRequest();
var content;
var len;
var option = '';
// 記錄地圖資訊
var map;
//紀錄markers
var markers=[];
//記錄當前點擊 google window
var currentInfoWindow = '';

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 22.6397664, lng: 120.2999183},
  zoom: 12
});
getData();
}


area.addEventListener('change',changeArea);
function changeArea(e){
  // 清除資料
  for(i=0;i<markers.length;i++){
    markers[i].setMap(null);   
  }
   markers = []; 
   var infoWindows = [];
   // 載入資料
   for(var i=0;len>i;i++){
     //產生該區域的marker
      if(data[i].Zone== e.target.value){
        loadData(data[i].Py,data[i].Px,data[i].Picdescribe1)
      }
    }
}


function getData(){ 
  var xhr = new XMLHttpRequest();
  xhr.open('get',url,true);
  xhr.send(null);
  xhr.onload = function(){
    	if (xhr.status==200){
        content = JSON.parse(xhr.responseText);
        data = content.result.records;
        len= data.length;
        for(var i=0;len>i;i++){
          loadData(data[i].Py,data[i].Px,data[i].Picdescribe1)
        }
        uploadOption();
      }else {
        console.log('資料抓取錯誤!');
      }
  }
}

function uploadOption(){
  var selectItem = [];
	for(var i = 0;i<len;i++){
         //當索引值為-1,就是空值，就放選項進去
         if (selectItem.indexOf(data[i].Zone) == -1) {
            selectItem.push(data[i].Zone);
        }
	}

	for(var i=0;i<selectItem.length;i++){
		option+= '<option>'+selectItem[i]+'</option>';
	}
	area.innerHTML = '<option disabled selected value> -- 請選擇行政區 -- </option>'+option;
};

function loadData(lat,lng,title){
  //google map 的資訊視窗內容
  for (var i = 0; i < len; i++) {
       var address = data[i].Add;
        var openTime = data[i].Opentime;
        var Tel = data[i].Tel;
        var contentString ='<div class="setContent">' +
                  '<h2>' + title + '</h2>' +
                  '<p>' + '地址：' + address + '</p>' +
                  '<p>' + '營業時間：' + openTime + '</p>' +
                  '<p>' + '聯絡方式：' + Tel + '</p>' +
                  '</div>';
        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
  }

  //str 存放的資訊跟格式，重新整理過jason資料
  var str = {
    position: {lat: parseFloat(lat), lng: parseFloat(lng)},
    title: title,
    map: map,
  }
  var marker = new google.maps.Marker(str);

  //點擊marker時，跳出資訊視窗
  marker.addListener('click', function() {
     if(currentInfoWindow != '')   
      {    
        currentInfoWindow.close();   
        currentInfoWindow = '';   
      }   
      infowindow.open(map, marker);   
      currentInfoWindow = infowindow; 
  });
  markers.push(marker);

}






