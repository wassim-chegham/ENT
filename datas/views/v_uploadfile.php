<?php 
$workspace = $this->config->item('workspace');
$uploaddir = $this->input->post('location');
$uploadfile = $uploaddir.basename($_FILES['userfile']['name']);
$json = array();

if (move_uploaded_file($_FILES['userfile']['tmp_name'], $workspace.$uploadfile))
{
    $ext = strtolower(end(explode('.', $uploadfile)));
    $json['response'] = 'success';
    $json['filePath'] = $uploadfile;
    $json['fileExtention'] = $ext;
    $json['fileSize'] = filesize($workspace.$uploadfile);
    
    if ( $ext == 'zip' ) 
        unzip($workspace.$uploadfile);
}
else
{
    $json['response'] = 'failed';
    $json['filePath'] = '';
    $json['fileExtention'] = '';
    $json['fileSize'] = '';

}

//header('Content-Type: application/json');
echo json_encode($json);

?>
