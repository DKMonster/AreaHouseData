<?php

	$file = $_POST['file'];
	$json = $_POST['json'];

	if( $json != null && $html != null ) {

		file_put_contents('/json/'.$file.'.json', urldecode($json) , LOCK_EX);

		echo success;
	}else{
		echo '您無權限觀看此頁面!';
	}

?>