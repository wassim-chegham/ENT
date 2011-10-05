<?php

	$bugFile = $this->config->item('bug_file');
	
	$date = date('G:i:s d-m-Y', time());
	$user = isset($_SESSION['user']) ? $_SESSION['user']['name'] : 'anonymous-'.$_SERVER['REMOTE_ADDR'];
	$title = $this->input->post('title');
	$desc = $this->input->post('desc');
	
	$template = "\nDate: %s\nUser: %s\nTitle: %s\nDescription: %s\n";
	$template .= "------------------------------------------------\n";
	
	$json = array();
	
	if ( file_put_contents( $bugFile, sprintf($template, $date, $user, $title, $desc), FILE_APPEND ) )
	{
		$json['response'] = 'success';
	}
	else{
		$json['response'] = 'failed';
	}
	
	header('Content-Type: application/json');
	echo json_encode($json);

?>