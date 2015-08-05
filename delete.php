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

	$booth = $_POST['booth'];

   	$db = new MyDB();
   	if(!$db){
    	echo $db->lastErrorMsg();
   	}

	
	$statement = $db->prepare('delete from booth where number=:booth');
	$statement->bindValue(':booth', $booth);

	$result = $statement->execute();

	var_dump($result);
	
   	$db->close();
