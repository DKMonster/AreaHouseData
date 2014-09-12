<?php

	$file = $_POST['file'];
	$json = $_POST['json'];

	if( $json != null && $file != null ) {

		file_put_contents('C:/xampp182/htdocs/AreaHouseData/json/'.$file.'.json', urldecode($json) , LOCK_EX);

		echo "success";
	}else{
		echo '您無權限觀看此頁面!';
	}

?>