<?php

        $app_servername = "http://ent.cheghamwassim.com";
        $js_servername = "http://cheghamwassim.com/tools/js";

?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html;charset=utf-8"/>
        <title><?php echo utf8_decode($app_title); ?></title>
        <link rel="icon" href="css/images/ent_v000_small.png" type="image/png">

        <link rel="stylesheet" type="text/css" href="<?php echo $js_servername; ?>/jquery-ui/themes/redmond/jquery-ui.css" charset="utf-8" media="screen"/>
        <link rel="stylesheet" type="text/css" href="<?php echo $js_servername; ?>/jquery/plugins/filetree/filetree.css" charset="utf-8"/>
        <!--<link rel="stylesheet" type="text/css" href="<?php echo $js_servername; ?>/jquery/plugins/contextMenu/jquery.contextMenu.css" charset="utf-8"/>-->
        <link rel="stylesheet" type="text/css" href="<?php echo $app_servername; ?>/css/jquery.ent.css" charset="utf-8"/>
    </head>
    <body>
        <div id="ent"></div>

        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/v1.4.2/jquery.min.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery-ui/v1.8.4/jquery-ui.min.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/filetree/filetree.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/media/jquery.media.js" charset="utf-8"></script>
        <script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/upload/v3.5/ajaxupload.js" charset="utf-8"></script>
        <!--<script type="text/javascript" src="<?php echo $js_servername; ?>/jquery/plugins/contextMenu/jquery.contextMenu.js" charset="utf-8"></script>-->
        <script type="text/javascript" src="<?php echo $app_servername; ?>/js/jquery.ent.js"></script>   
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
