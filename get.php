<?php

    define('AJAX_REQUEST', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
    if(!AJAX_REQUEST) {die();}

	class MyDB extends SQLite3
   	{
    	function __construct()
      	{
        	$this->open('physique.db');
      	}
   	}
   	$db = new MyDB();
   	if(!$db){
    	echo $db->lastErrorMsg();
   	}

	$query = $db->query('select number from booth');
	
	$result = array();

	while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
		$result[] = $row['number'];
    }

	echo json_encode($result);
	
   	$db->close();
