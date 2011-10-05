<?php 
class File extends Controller
{

    public function __construct()
    {
        parent::controller();
        $this->config->load('site_config');
        $this->load->helper(array('number', 'url', 'file', 'download', 'filetools'));
        $this->load->library(array('zip', 'pdf'));
        
    }
    
    public function tree()
    {
        $this->load->view('v_filetree');
    }
    
    public function content()
    {
        $this->load->view('v_filecontent');
    }
    
    public function rename()
    {
        $this->load->view('v_renamefile');
    }
    
    public function move()
    {
        $this->load->view('v_movefile');
    }
    
    public function delete()
    {
        $this->load->view('v_deletefile');
    }
    
    public function download()
    {
        $this->load->view('v_downloadfile'); 
    }

    public function upload()
    {
        $this->load->view('v_uploadfile'); 
    }
    
    public function details()
    {
        $this->load->view('v_fileinfos');
    }
    
    public function printIt()
	{
		$this->load->view('v_printfile');
	}

}