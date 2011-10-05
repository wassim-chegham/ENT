<?php 

	$workspace = $this->config->item('workspace');
	$newFileName = $workspace.$this->input->post('newFileName');
	$oldFileName = $workspace.$this->input->post('oldFileName');
	
	
	$JSONresult = array();
	if ($newFileName == "" && $oldFileName == "")
	{
	    $JSONresult['JSONresponse'] = 'BAD';
		$JSONresult['JSONmessage'] = 'Vous devez saisir un nom valide!';
		$JSONresult['JSONCssClass'] = 'action-failure';
		
	}
	else if (rename($oldFileName, $newFileName))
	{
	    $JSONresult['JSONresponse'] = 'OK';
		$JSONresult['JSONmessage'] = 'Le fichier a été renomer correctement.';
		$JSONresult['JSONCssClass'] = 'action-success';
	}
	else
	{
	    $JSONresult['JSONresponse'] = 'BAD';
		$JSONresult['JSONmessage'] = "Erreur: Le fichier n'a pas pu être renomé!";
		$JSONresult['JSONCssClass'] = 'action-failure';
	}
	
	header('Content-Type: application/json, charset=utf-8');
	echo json_encode($JSONresult);
?>
