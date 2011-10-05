<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$config['protocol'] 						= 'mail'; 	// 	The mail sending protocol (mail, sendmail, or smtp)
$config['mailpath'] 						= '';				// 	The server path to Sendmail.
$config['charset'] 							= 'utf-8'; 	// 	Character set (utf-8, iso-8859-1, etc.).
$config['wordwrap'] 						= true; 		// 	Enable word-wrap.
$config['smtp_host'] 						= '';				//	SMTP Server Address.
$config['smtp_user'] 						= '';				//	SMTP Username.
$config['smtp_pass'] 						= '';				//	SMTP Password.
$config['smtp_port'] 						= '';				//	SMTP Port.
$config['newline'] 							= '\r\n';
$config['useragent'] 						= 'Whoisthegeek';
$config['mailtype'] 						= 'html';
$config['validate'] 						= 'true';
$config['bcc_batch_mode'] 					= 'true';

/* End of file email.php */
/* Location: ./system/application/config/email.php */
