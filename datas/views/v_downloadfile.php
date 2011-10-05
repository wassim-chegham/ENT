<?php 
$workspace = $this->config->item('workspace');
$filename = $workspace.$this->input->post('file');
$mode = $this->input->post('mode');

$data = file_get_contents($filename);

$name = end(explode('/', $filename));
$ext = end(explode('.', $name));
$dl_name = str_replace($ext, '', $name);

if ($mode == 'zip')
{
    $dl_name .= 'zip';    
    $this->zip->add_data($name, $data);
    
    // Write the zip file to a folder on your server. Name it "my_backup.zip" 
    //$name = explode('.', $name);
    //$name = $name[0].'zip';
    $this->zip->archive('workspace/tmp/'.$dl_name);
    
    // Download the file to your desktop. Name it "my_backup.zip" 
    $this->zip->download($dl_name);
    $this->zip->clear();
}
else if ($mode == "pdf")
{
    $dl_name .= '.pdf';  
    $this->pdf->AddPage();
    
    // header 
    //Arial gras 15 
    //Arial 12 
    $this->pdf->SetFont('Arial', '', 12);
    //Couleur de fond 
    $this->pdf->SetFillColor(200, 220, 255);
    //Titre 
    $this->pdf->Cell(0, 6, $name, 0, 1, 'L', true);
    //Saut de ligne 
    $this->pdf->Ln(4);
    
    
    // main 
    //Times 12 
    $img = array('jpg', 'png', 'gif');
    if (array_key_exists(end(explode('.', $filename)), $img))
    {
        $this->pdf->image($filename);
    } 
    else
    {
        $this->pdf->SetFont('Times', '', 10);
        //Sortie du texte justifié 
        $this->pdf->MultiCell(0, 5, $data);
        //Saut de ligne 
        $this->pdf->Ln();
    }
    
    
    // footer 
    //Positionnement à 1,5 cm du bas 
    $this->pdf->SetY(-15);
    //Arial italique 8 
    $this->pdf->SetFont('Arial', 'I', 8);
    //Couleur du texte en gris 
    $this->pdf->SetTextColor(128);
    //Numéro de page 
    $this->pdf->Cell(0, 10, 'Page '.$this->pdf->PageNo(), 0, 0, 'C');
    
    
    // usefull infos 
    $this->pdf->setAuthor('Chegham wassim');
    $this->pdf->setSubject('TP');
    $this->pdf->setTitle($name." - From http://ent.heghamwassim.com");
    $this->pdf->Output($name.'.pdf', 'D');
}
else // $mode == 'normal'
{              
    force_download($name, $data);
}

?>
