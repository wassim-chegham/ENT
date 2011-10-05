<?php

class Tools extends Controller
{
	public function __construct()
	{
		parent::Controller();
		$this->config->load('site_config');
	}
	
	public function index()
	{
	}
	
	public function reportBug()
	{
		$this->load->view('v_report_bug');
	}
}
