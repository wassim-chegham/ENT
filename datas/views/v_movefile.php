<?php 
$workspace = $this->config->item('workspace');
$fromFilename = $workspace.$this->input->post('from');
$toFilename = $workspace.$this->input->post('to');
$JSONresult = array();

/* DEBUG
 echo $fromFilename;
 echo ' ';
 echo $toFilename;
 echo ' ';
 echo var_dump(file_exists(dirname($toFilename)));
 echo ' ';
 echo var_dump(mkdir(dirname($toFilename)));
 echo ' ';
 echo var_dump(rename($fromFilename, $toFilename));
 echo ' ';
 exit();
 */

if (!file_exists(dirname($toFilename)))
{
    @mkdir(dirname($toFilename), 0777, true);    
}

if ( file_exists($toFilename))
{
	
	$JSONresult['JSONresponse'] = 'BAD';
    $JSONresult['JSONmessage'] = 'Le fichier ne peux pas être déplacé car un autre fichier porte le même nom.';
    $JSONresult['JSONCssClass'] = 'action-failure';

}
else if (rename($fromFilename, $toFilename))
{

    $JSONresult['JSONresponse'] = 'OK';
    $JSONresult['JSONmessage'] = 'Le fichier a été déplacé correctement.';
    $JSONresult['JSONCssClass'] = 'action-success';
    
}
else
{

    $JSONresult['JSONresponse'] = 'BAD';
    $JSONresult['JSONmessage'] = 'Le fichier n\'a pas pu être déplacé!';
    $JSONresult['JSONCssClass'] = 'action-failure';
    
}

header('Content-Type: application/json, charset=utf-8');
echo json_encode($JSONresult);

?>
