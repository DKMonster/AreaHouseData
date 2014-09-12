/* *********************************
[area.code] json data

台北市 [ 1 to 12 ]
基隆市 [ 13 to 19 ]
新北市 [20, 21] ++ [ 26 to 52]
新竹市 [53]
新竹縣 [54 to 66]
桃園縣 [67 to 79]
苗栗縣 [80 to 97]
台中市 [98 to 126]
彰化縣 [127 to 152]
南投縣 [153 to 165]
雲林縣 [185 to 204]
嘉義市 [166]
嘉義縣 [167 to 184]
臺南市 [206 to 242]
高雄市 [243 to 282]
屏東縣 [295 to 327]
宜蘭縣 [328 to 339]
花蓮縣 [357 to 369]
台東縣 [341 to 356]
澎湖縣 [283 to 288]
金門縣 [289 to 294]
連江縣 [22 to 25] ++ [256, 257]

********************************* */

$(document).ready(function(){

	var jsonFile;
	var lat , lng , mark , total_load = 0 , now_load = 0 , pro = 0;
	var progress = $('.progress').find('num');
	var progress_bar = $('.progress').find('.progress-bar');

	$('#json_btn').click(function(){

		jsonFile = $('#inputJSON').val();

		var btn = $(this);
		var y_st = parseInt($('#yearStart').val());
		var y_end = parseInt($('#yearEnd').val());
		var y_num = y_end - y_st + 1;

		progress_bar.css({'width':'0%'});
		progress_bar.attr('aria-valuenow','0%');
		progress.html("0%");

		btn.button('loading');

		$.ajax({
			async: false,
			dataType: "json",
			url: 'json/'+jsonFile+'.json',
			success: function(data){
				jsonFile = data;

				$.each(jsonFile , function(year , object){
					if(year <= y_end){
						total_load += jsonFile[year].length;
					}
				});

				for(var i = 0 ; i < y_num ; i++){
					var s = 0;
					$.each(jsonFile[y_st+i] , function(){
						now_load++;
						// console.log(jsonFile[y_st+1][s]['地址']);
						geocodeAjax(jsonFile[y_st+i][s]['地址'] , y_st+i , s , now_load , total_load);
						s++;
					});
				}

				btn.button('reset');
			}
		});
	});

	var geocoder = new google.maps.Geocoder();
	var c = 0;
	function geocodeAjax(addr , year , s , now_load , total_load) {
		//利用Deferred物件協助非同步呼叫全部完成的時機
		var def = new jQuery.Deferred();
		//geocoder似乎有使用量管控，若快速連續呼叫會停止運作
		//在此使用setTimeout節流，每次查詢間隔一秒鐘
		setTimeout(function() {
			//呼叫decode()，傳入參數及Callback函數
			geocoder.geocode({
				address: addr
			}, function(results, status) {
				//檢查執行結果
				if (status == google.maps.GeocoderStatus.OK) {
					var loc = results[0].geometry.location;
					// console.log(loc.lat());
					// console.log(loc.lng());
					lat = loc.lat();
					lng = loc.lng();
					jsonFile[year][s]['lat'] = ''+ lat +'';
					jsonFile[year][s]['lng'] = ''+ lng +'';
					pro = now_load / total_load * 100;
					progress_bar.css({'width':pro +'%'});
					progress_bar.attr('aria-valuenow',pro +'%');
					progress.html(pro);
					console.log(now_load);
					// console.log(jsonFile[year][s]);
					// console.log(jsonFile[year][s]);
					//呼叫Deferred.resolve()，表示執行成功
					def.resolve();
				} else {
					//呼叫Deferred.reject()，表示執行失敗
					def.reject();
				}
			});
		}, c++ * 1000);
		//傳回Promise物件，以協調非同步呼叫結果
		return def.promise();

		def.done (function(){
			progress_bar.css({'width':'100%'});
			progress_bar.attr('aria-valuenow','100%');
			progress.html("100%");
		});
	}

});