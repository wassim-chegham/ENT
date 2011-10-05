<?php 
class Folder extends Controller
{

    public function __construct()
    {
        parent::controller();
        $this->config->load('site_config');
        $this->load->helper(array('number', 'url', 'file', 'download'));
        $this->load->library(array('zip', 'pdf'));
        
    }
    
    public function create()
    {
        $this->load->view('v_makedir');
    }

    public function download()
    {
        $this->load->view('v_downloadfolder');
    }
    
}
