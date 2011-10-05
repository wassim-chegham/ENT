<?php

        $app_servername = "http://ent.cheghamwassim.com";
        $js_servername = "http://lib.js.cheghamwassim.com";

?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
        <title><?php echo $app_title; ?></title>
        <link rel="icon" href="css/images/ent_v000_small.png" type="image/png">

        <link rel="stylesheet" type="text/css" href="<?php echo $js_servername; ?>/jquery-ui/v1.7.2/css/redmond/jquery-ui.css" charset="utf-8" media="screen"/>
        <link rel="stylesheet" type="text/css" href="<?php echo $js_servername; ?>/jquery/plugins/filetree/filetree.css" charset="utf-8"/>
        <!--<link rel="stylesheet" type="text/css" href="<?php echo $js_servername; ?>/jquery/plugins/contextMenu/jquery.contextMenu.css" charset="utf-8"/>-->
        <link rel="stylesheet" type="text/css" href="<?php echo $app_servername; ?>/css/jquery.ent.css" charset="utf-8"/>
    </head>
    <body>
        <div id="ent"></div>

        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/v1.3.2/jquery.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery-ui/v1.7.2/js/jquery-ui.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/filetree/filetree.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/media/jquery.media.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/upload/ajaxupload.js" charset="utf-8"></script>
	<script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/address/jquery.address.min.js"></script>
        <script type="text/javascript" src="<?php echo $app_servername; ?>/js/jquery.ent.dev.js"></script>   
      <script type="text/javascript">
         $(function()
         {
            $('div#ent').ent({
               fileToolBarLinks: 'infos|download',
               showWelcomeMessage: true
            });
         });
      </script>
    </body>
</html>
