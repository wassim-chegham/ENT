<?php 
	
	$workspace = $this->config->item('workspace');
	$f = $this->input->post('file');
	$filename = $workspace.$f;
	
	$infos = get_file_info($filename);
	$perms = fileperms($filename);
	
	header('Content-Type: text/plain, charset=utf-8');
	echo '<ul>';
	echo '<li><strong>Fichier</strong>: '.$f.'</li>';
	echo '<li><strong>Taille</strong>: '.byte_format($infos['size']).'</li>';
	echo '<li><strong>Créé le</strong>: '.date('d/m/Y G:i:s', $infos['date']).'</li>';
	echo '<li><strong>Permissions</strong>: '.symbolic_permissions($perms).'/'.octal_permissions($perms).'</li>';
	//echo '<li><strong>Infos</strong><pre>: '.shell_exec('stat '.$filename).'</pre></li>';
	echo '</ul>';
	
?>
