<?php

class Login extends Controller
{
	public function __construct()
	{
		parent::Controller();
	}

	public function index()
	{
		$login = $this->input->post('login');
		$pass = $this->input->post('pass');
		$data['json'] = array('response'=>'?');
		
		if ( $login != '' && $pass != '' && $this->_user_exists($login, $pass) )
		{
			$data['json']['response'] = 'SUCCESS';
			$_SESSION['WD'] = 'private';
			$_SESSION['user']['name'] = $login;
			$_SESSION['user']['login_time'] = time();
		}
		else {
			$data['json']['response'] = 'BAD';
			$_SESSION['WD'] = 'public';
		}
		$this->load->view('v_login_response', $data);
	}
	
	function out(){
		$_SESSION['WD'] = 'public';
	}
	
	private function _user_exists($login, $pass)
	{
		$db = $this->config->item('users');
		return isset($db[$login]) && $db[$login] == $pass;
	}
}
