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

	$('#json_btn').click(function(){
		var btn = $(this);
		jsonFile = $('#inputJSON').val();
		btn.button('loading');

		$.ajax({
			async: false,
			dataType: "json",
			url: 'json/'+jsonFile+'.json',
			success: function(data){
				jsonFile = data;
				console.log(search_area('."2004" ."地址"').length);
				btn.button('reset');
			}
		});
	});


	function search_area(selector){
		var obj = JSONSelect.match(selector , jsonFile);
		return obj
	}

});