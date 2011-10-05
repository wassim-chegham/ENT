<?php 
$workspace = $this->config->item('workspace');
$dirname = $this->input->post('dirname');
$dirpath = $workspace.'/'.$dirname;
$JSONresult = array();

if (!file_exists($dirpath))
{
    if (!mkdir($dirpath))
    {
        $JSONresult['JSONresponse'] = 'BAD';
        $JSONresult['JSONmessage'] = 'Le répertoire n\' a pas pu être créer!';
        $JSONresult['JSONCssClass'] = 'action-failed';
        
    }
    
}
else
{

    $JSONresult['JSONresponse'] = 'BAD';
    $JSONresult['JSONmessage'] = 'Un répertoire porte le même nom! Veuillez choisir un autre nom.';
    $JSONresult['JSONCssClass'] = 'action-failure';
    
}

header('Content-Type: application/json, charset=utf-8');
echo json_encode($JSONresult);

?>
