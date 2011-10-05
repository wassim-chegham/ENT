<?php 
	
	$workspace = $this->config->item('workspace');
	$bin = $this->config->item('bin');

	$filename = $this->input->post('f');
	$file = $workspace.$filename;
	$dirDestination = $bin.'/'.basename($filename);
	$JSONresult = array();
	
	if (file_exists($file) && rename($file, $dirDestination)) // move the file (to the bin) using the rename function
	{
	
	    $JSONresult['JSONresponse'] = 'OK';
	    $JSONresult['JSONmessage'] = 'Le fichier a été supprimé correctement.';
	    $JSONresult['JSONCssClass'] = 'action-success';
	    
		$data = "-------------------------------------------------\r\n";
		$data .= 'Filename: '.$file."\r\n";
		$data .= 'Date    : '.date('d-m-Y \a\t G:i:s', time())."\r\n";
		$data .= 'IP      : '.$this->input->ip_address()."\r\n";
		$data .= "\r\n\r\n";
		file_put_contents($bin.'/delete.log', $data, FILE_APPEND);
		
	}
	else
	{
	
	    $JSONresult['JSONresponse'] = 'BAD';
	    $JSONresult['JSONmessage'] = 'Le fichier n\'a pas pu être supprimé!';
	    $JSONresult['JSONCssClass'] = 'action-failure';
	    
	}


	header('Content-Type: application/json, charset=utf-8');	
	echo json_encode($JSONresult);

?>
