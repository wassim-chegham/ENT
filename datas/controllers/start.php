<?php

class start extends Controller
{
	public function __construct()
	{
		parent::Controller();
		$this->config->load('site_config');
	}
	
	public function index()
	{
		$data['app_title'] = $this->config->item('app_title');
		$this->load->view('v_start', $data);
	}
}
