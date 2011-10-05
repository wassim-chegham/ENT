
/**
 * @author chegham wassim
 * @description dev version
 */
if (jQuery) 
   (function($)
   {
   
      $.extend($.fn, {
      
         // jquery ENT plugin
         ent: function(o)
         {
            // initial work
            $(this).append('\
               <div id="panels" style="display:none">\
                  <div id="menu">\
                    <span>Veuillez séléctionner un fichier dans la liste en-dessous</span>\
                    <a href="#report-bug" class="user-panel-btn" id="show-report-bug">signaler un bug</a>\
                    <a href="#login" class="user-panel-btn" id="show-login-btn">se connecter</a>\
                  </div>\
                  <div id="folders" >\
                     <div id="folder-tabs" class="block-tabs">\
                        <span class="button refresh-list-folders float-right" title="Rafraîchir la liste"></span>\
                        <ul class="visible-tabs"></ul>\
                        <ul id="folders-menu" class="sub-menu"></ul>\
                     </div>\
                     <div id="folders-list" />\
                  </div>\
                  <div id="file" >\
                     <div id="files-tabs" class="block-tabs block-files">\
                        <ul class="visible-tabs filetree"></ul>\
                        <ul class="hidden-tabs" style="display:none"></ul>\
                        <ul id="file-menu" class="sub-menu" style="display:none;"></ul>\
                     </div>\
                     <div id="file-content" />\
                  </div>\
               </div>\
            ');
            
            $('body').append('\
                <div id="dialogboxes">\
                   <div class="dialog" id="message-welcome">\
                    <p><span></span></p>\
                    <p id="try-demo">Je veux juste <a href="" id="try-demo-btn">Tester</a> :)</p>\
                    <p><form id="login-form" method="post" action="login">\
                      <label for="nom">Nom</label>\
                      <input type="text" name="nom" value="" /><br />\
                      <label for="password">Mot de passe</label>\
                      <input type="password" name="password" value="" /><br />\
                      <a href="" id="login-btn" >se connecter</a>\
                    </form></p>\
                   </div>\
                   <div class="dialog" id="message-about"></div>\
                   <div class="dialog" id="action-rename"></div>\
                   <div class="dialog" id="action-move-file"></div>\
                   <div class="dialog" id="action-delete-file"></div>\
                   <div class="dialog" id="action-download-file"></div>\
                   <div class="dialog" id="action-upload"></div>\
                   <div class="dialog" id="action-infos-file"></div>\
                   <div class="dialog" id="action-print-file"></div>\
                   <div class="dialog" id="action-full-screen-image"></div>\
                   <div class="dialog" id="action-misc"></div>\
                   <div class="dialog" id="action-report-bug"></div>\
                </div>\
                <div id="history" style="display:none;"></div>\
                <!--\
                <div id="context-menu-container">\
                   <ul id="context-menu-files">\
                      <li class="download sub"><a href="#" path="sub-context-menu-download">Télécharger ...</a></li>\
                      <li class="rename separator"><a href="#rename">Renomer</a></li>\
                      <li class="edit"><a href="#edit">Editer</a></li>\
                      <li class="cut"><a href="#cut">Couper</a></li>\
                      <li class="copy"><a href="#copy">Copier</a></li>\
                      <li class="paste"><a href="#paste">Coller</a></li>\
                      <li class="delete"><a href="#delete">Supprimer</a></li>\
                   </ul>\
                   <ul id="sub-context-menu-download" class="contextMenu">\
                      <li class="zip"><a href="#download-zip">compressé</a></li>\
                      <li class="pdf"><a href="#download-pdf">en pdf</a></li>\
                      <li class="none"><a href="#download-none">tel quel</a></li>\
                   </ul>\
                   <ul id="context-menu-directory">\
                      <li class="upload"><a href="#upload">Charger</a></li>\
                      <li class="download"><a href="#download">Télécharger</a></li>\
                      <li class="explore"><a href="#explore">Parcourir</a></li>\
                      <li class="add separator"><a href="#add">Nouveau</a></li>\
                      <li class="rename"><a href="#rename">Renomer</a></li>\
                      <li class="cut"><a href="#cut">Couper</a></li>\
                      <li class="copy"><a href="#copy">Copier</a></li>\
                      <li class="paste"><a href="#paste">Coller</a></li>\
                      <li class="delete"><a href="#delete">Supprimer</a></li>\
                   </ul>\
                </div>\
                -->\
             ');
            // constants and globals
            var VERSION = '0.8alpha-20/01/10';
            var BASESCRIPT = 'http://ent.cheghamwassim.com/index.php';
            var FILESACTIONS = "rename|delete|move|infos|download|print";
            var FOLDERSACTIONS = "new|rename|upload|download";
            var NONPRINTABLE_FILETYPE = "exe,zip,rar,jar,pdf,xls,doc,docx,pps,odt,odb,ods,class,png,jpg,gif,bmp,tiff";
            var WELCOMEDIALOG_WIDTH = 400; // px
            var WELCOMEDIALOG_HEIGHT = 180; // px

            
            // global config
            if (!o) 
               var o = {};
            
            if (o.panelsMaxHeight == undefined) 
               o.panelsMaxHeight = parseInt($('div#panels').css('min-height').replace('px', '')); // in px
            
            if (o.tabCloseSpeed == undefined) 
               o.tabCloseSpeed = 100; // in ms
            
            if (o.dialogBoxShowEffect == undefined)   
               o.dialogBoxShowEffect = null;
               
            if (o.dialogBoxHideEffect == undefined)   
               o.dialogBoxHideEffect = null;
               
            if (o.welcomeTitle == undefined) 
               o.welcomeTitle = 'ENT v' + VERSION + ' - Bienvenue';
            
            if (o.welcomeMessage == undefined) 
               o.welcomeMessage = 'Bienvenue dans votre gestionnaire de fichiers.';
            
            if (o.workspace == undefined) 
               o.workspace = '/';
            
            if (o.scriptFileTree == undefined) 
               o.scriptFileTree = BASESCRIPT + '/file/tree';
            
            if (o.scriptFileContent == undefined) 
               o.scriptFileContent = BASESCRIPT + '/file/content';
            
            if (o.scriptMakeDirectory == undefined)
               o.scriptMakeDirectory = BASESCRIPT + '/folder/create'
            
            if (o.scriptRenameFile == undefined) 
               o.scriptRenameFile = BASESCRIPT + '/file/rename';
            
            if (o.scriptUpload == undefined) 
               o.scriptUpload = BASESCRIPT + '/file/upload';
            
            if (o.scriptMoveFile == undefined) 
               o.scriptMoveFile = BASESCRIPT + '/file/move';
            
            if (o.scriptDeleteFile == undefined) 
               o.scriptDeleteFile = BASESCRIPT + '/file/delete';
            
            if (o.scriptFileInfos == undefined) 
               o.scriptFileInfos = BASESCRIPT + '/file/details';
            
            if (o.scriptDownloadFile == undefined) 
               o.scriptDownloadFile = BASESCRIPT + '/file/download';
            
            if (o.scriptDownloadFolder == undefined)
               o.scriptDownloadFolder = BASESCRIPT + '/folder/download';
               
            if (o.scriptPrintFile == undefined) 
               o.scriptPrintFile = BASESCRIPT + '/file/printIt';

            if (o.scriptReportBug == undefined) 
               o.scriptReportBug = BASESCRIPT + '/tools/reportBug';
               
               
            if (o.tabsInitHeight == undefined) 
               o.tabsInitHeight = parseInt($('div.block-tabs ul.visible-tabs').css('height').replace('px', '')); // in px
               
            if (o.canSortTabs == undefined) 
               o.canSortTabs = true;
            
            if (o.showWelcomeMessage == undefined) 
               o.showWelcomeMessage = false;
            
            if (o.enableFoldersPanelResizing == undefined) 
               o.enableFoldersPanelResizing = true;
            
            if (o.automaticStart == undefined) 
               o.automaticStart = true;
            
            if (o.fileToolBarLinks == undefined) 
               o.fileToolBarLinks = "rename|delete|move|infos|download|print";
            
            // functions
            var loadFile = function(f)
            {
               var fileContent;
               
               if (!isFileOpened(f)) 
               {
                  //console.log('loding '+f);
                  var current_li = $('div#folders-list li.file a[path="' + f + '"]').parent('li');
                  
                  /** BEFORE THE FILE IS LOADED **/
                  // add a loading animation ...
                  current_li.addClass('wait');

                  $.post(o.scriptFileContent, {
                  
                     file: f
                  
                  }, function(JSONresponse)
                  {
                    
                     /** ONCE THE FILE IS LOADED **/
                     fileContent = JSONresponse.fileContent;
                     $('div#file-content').html(fileContent);
                     $('div#history').append('<div id='+f.replace(/\//g, "-")+'>'+fileContent+'</div>');
                     
                     
                     // remove the loading animation
                     current_li.removeClass('wait');
                     openFile(f);
                     allowResizingImages();
                     allowDragableImages();
                     //allowImagesOnFullScreen();
                     $('div#file-content a.media').media({
                        width: $('div#file-content').width()-5,
                        height: $('div#file-content').height()-5
                     });
                     
                  }, 'json');
                  
               }
               else 
               {
                  focuseOnTab(f);
                  drawTabsBorders();
                  updateResourceTitle(f);
                  setFileContentFromHistory(f);
               }
                           
            }
            
            var openFile = function(f)
            {
               var fileName = getFileName(f);
               var fileExtention = getFileExtention(fileName);
               
               addNewTab(f);
               updateResourceTitle(f);
               focuseOnTab(f);
               drawTabsBorders();
               allowFileToolBar();
               allowSortabeTabs();
               
               /** **/
               $("li.focus").dblclick(function()
               {
                  $('div#file').toggleClass('full-screen-mode');
                  
               });
               
               
               /** allow highlighting a line when clicked **/
               $('pre ol li').live('click', function()
               {
                  $('pre ol li').removeClass('highlighted');
                  $(this).addClass('highlighted');
               })
               
               // reset the height of the file blok (this little hack gives the pre element 
               // the same height as the left panel!!) 
               $('div#file-content').css('height', $('div#folders-list').height());
               $('div.block-tabs ul.visible-tabs').css('height', '22px');
               
               /** allow the hidden tabs **/
               var tabs_offset = $('div#files-tabs').width();
               if ($('div#files-tabs ul.visible-tabs li:last').offset().left >= tabs_offset) 
               {
                  allowHiddenTabs();
               }
               
            }
            
            var setFileContentFromHistory = function(f)
            {
               var fileContentFromHistory = $('div#history div[id="'+f.replace(/\//g, "-")+'"]').html();
               $('div#file-content').html( fileContentFromHistory );
            }
            
            var addNewTab = function(f)
            {
               $("div#files-tabs ul.visible-tabs").append(getTabBody(f));
            }
            
            var getTabBody = function(f)
            {
               return '\
                  <li class="file ext_' + getFileExtention(getFileName(f)) + '">\
                     <span class="close-tab button" title="Fermer"></span>\
                     <a href="#" path="' +
               f +
               '" title="' +
               f +
               '" >' +
               getFileName(f) +
               '</a>\
                  </li>';
            }
            
            var removeTab = function(li, options)
            {
               if (options == undefined) 
                  options = {
                     'width': 0,
                     'opacity': 'hide'
                  };
               li.animate(options, o.tabCloseSpeed, 'linear', function()
               {
                  li.remove();
               });
            }
            
            var focuseOnTab = function(f)
            {
               $("div#files-tabs li.focus").removeClass('focus');
               $('div#files-tabs a[path="' + f + '"]').parent('li').addClass('focus');
            }
            
            var updateResourceTitle = function(f)
            {
               if (f == undefined) 
                  $('div#menu span').html('Veuillez séléctionner un fichier dans la liste en-dessous');
               else 
                  $('div#menu span').html('Resource - <strong>' + f + '</strong> - ENT v' + VERSION);
            }
            
            var setFullScreenMode = function()
            {
               $('div#file').addClass('full-screen-mode');
            }
            
            var setWindowMode = function()
            {
               $('div#file').removeClass('full-screen-mode');
            }
            
            var allowFileToolBar = function()
            {
               setFileToolBarStyle();
               applyUserActions();
            }
            
            var setFileToolBarStyle = function()
            {
               $('div#files-tabs').css({
                  height: '45px'
               }).find('ul#file-menu').empty().show();
            }
            
            var setToolBarsMouseOverMouseOut = function(){
               $('ul.sub-menu a:not(.disabled)').live('mouseover', function()
               {
               
                  var bgColor = '#eee';
                  $(this).addClass("hover").animate({
                     'backgroundColor': bgColor
                  }, 100);
                  
               }).live('mouseout', function()
               {
                  var bgColor = $('ul#file-menu').css('backgroundColor');
                  $(this).removeClass("hover").animate({
                     'backgroundColor': bgColor
                  }, 400);
               });
            }
            
            var setFolderToolBarAction = function()
            {
               var links = FOLDERSACTIONS.split('|');
               var actions = {
               
                  newFolder: {
                     id: 'new-folder-link',
                     title: 'Créer un nouveau répertoire',
                     cssClass: 'new',
                     text: 'Nouveau',
                     init: function()
                     {
                        appendLinksToFolderToolBar(this);
                        var createNewDirectory = function()
                        {
                           var inputValue = $('div#folders ul.filetree input').val();
                           
                           $.post(o.scriptMakeDirectory, {dirname: inputValue}, function(data){
                              
                              if (data.JSONresponse != 'BAD')
                              {
                                 $('#new-folder').replaceWith('<a href="#" path="/'+inputValue+'/">'+inputValue+'</a>');
                              }
                              else {
                                 $('#action-misc').html('<p class="'+data.JSONCssClass+'">'+data.JSONmessage+'<p>').dialog({
                                    title: 'ATTENTION',
                                    modal: true,
                                    draggable: false,
                                    resizable: false,
                                    show: o.dialogBoxShowEffect,
                                    hide: o.dialogBoxHideEffect,
                                    buttons: {
                                       "OK": function()
                                       {
                                          $(this).dialog('close');
                                          $('#new-folder').focus();
                                       }
                                    }
                                 }).dialog('open');
                              }
                           
                           }, 'json')
                        }
                        
                        $('a#' + this.id).live('click', function()
                        {
                           var selected = $('div#folders ul.filetree li.directory a.selected');
                           var newFolder = '<li class="directory collapsed"><input id="new-folder" type="text" value="Nouveau"/></li>';
                           
                           if ($('div#folders ul.filetree input').size() == 1)
                           {
                              createNewDirectory();
                           }
                           
                           if ( selected.size() == 1 )
                           {
                              selected.parent('li').append('<ul class="filetree">'+newFolder+'</ul>');
                           }
                           else{
                              $('div#folders ul.filetree li.directory:last').after(newFolder);
                           }
                           
                           $('#new-folder').focus().bind('blur', function(){
                              createNewDirectory();
                           }).bind('keypress', function(e){
                              if (e.which == 13)
                              {
                                 createNewDirectory();
                              }
                           })
                           
                           
                        });
                     }
                  },
                  renameFolder: {
                     id: 'rename-folder-link',
                     title: 'Renomer ce répertoire',
                     cssClass: 'rename',
                     text: 'Renomer',
                     init: function()
                     {
                        appendLinksToFolderToolBar(this, true);
                        // TODO
                     }
                  },
                  downloadFolder: {
                     id: 'download-folder-link',
                     title: 'Télécharger ce répertoire',
                     cssClass: 'download',
                     text: 'Télécharger',
                     init: function()
                     {
                        appendLinksToFolderToolBarInForm(this, true);
                        $('a#' + this.id).live('click', function()
                        {
                           $('form#download-folder-form').submit();
                        });
                     },
                     disable: function()
                     {
                        $('a#download-folder-link').addClass('disabled');
                        $('form#download-folder-form input#folder').val('');
                  
                        $('a#' + this.id).die('click');
                     },
                     enable: function()
                     {
                        $('a#download-folder-link').removeClass('disabled');
                        $('form#download-folder-form input#folder').val($('div#folders-list ul.filetree a.selected').attr('path'));
                  
                        $('a#' + this.id).live('click', function()
                        {
                           $('form#download-folder-form').submit();
                        });
                     }
                     
                  },
                  uploadFile: {
                     id: 'upload-file-link',
                     title: 'Charger un fichier dans le répertoire selectioné',
                     cssClass: 'upload',
                     text: 'Ajouter',
                     init: function()
                     {
                        appendLinksToFolderToolBar(this);
                        var setDialogBox_Upload = function()
                        {
                           
                           $('div#action-upload').html('\
                              Veuillez séléctionner votre fichier à ajouter:\
                              <button id="upload-button" class="ui-state-default ui-corner-all">choisir</button>\
                              <!--<input type="checkbox" id="extract" name="extract"/> Extraire les fichiers *.zip.-->\
                              <br /><span><b>Répértoire:</b> '+getUploadLocation()+' </span>\
                              <div id="upload-response"></div>\
                              <!--<form enctype="multipart/form-data" target="upload-iframe" name="form-upload" method="post" action="'+o.scriptUpload+'">\
                                    <input type="file" name="userfile" id="userfile" />\
                                 <input type="hidden" name="location" id="location" value="/" />\
                              </form>\
                              <iframe style="width:100%; height:400px; border:1px solid;" name="upload-iframe" src="" />-->\
                           ').dialog({
                              title: 'Ajout de fichiers ',
                              modal: true,
                              draggable: false,
                              resizable: false,
                              width: 480,
                              minWidth: 480,
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "Terminer": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           });
                        }
                        
                        var openDialogBox_Upload = function()
                        {
                           $('div#action-upload').dialog('open');
                        }
                        
                        var newAjaxUploadInstance = function()
                        {
                           var uploadLocation = getUploadLocation();
                           var anchor = $('div#folders-list ul.filetree a[path="' + uploadLocation + '"]');
                           
                           new AjaxUpload($('#upload-button'), {
                              action: o.scriptUpload,
                              name: 'userfile',
                              responseType: 'json',
                              autoSubmit: true,
                              data: {
                                 location: uploadLocation
                              },
                              onSubmit: function(file, ext)
                              {
                                $('div#upload-response').addClass('wait');
                                
                              },
                              onComplete: function(file, data)
                              {
                                if (anchor.parent('li').hasClass('collapsed'))
                                  anchor.trigger('dblclick');
                                
                                  $('div#upload-response').removeClass('wait').html(data);
                                  if (data.response == 'success') 
                                  {
                                    addNewFileToFileTree(data);
                                  }

                              }
                           });
                        }
                        
                        var getUploadLocation = function()
                        {
                           var selectedElement = $('div#folders-list ul.filetree a.selected');
                           
                           if (selectedElement.size() == 0 || selectedElement.parents('li.directory').size() == 0)
                           {
                              return '/';
                           }
                           else {
                              return selectedElement.parents('li.directory').find('a').attr('path');   
                           }
                           
                        }
                        
                        // Add the uploaded file to the filetree
                        var addNewFileToFileTree = function(data)
                        {
                           var uploadLocation = getUploadLocation();
                           var anchor = $('div#folders-list ul.filetree a[path="' + uploadLocation + '"]');
                           var fileTree = anchor.next('ul.filetree');
                           
                           if (uploadLocation == '/')
                           {
                              $('div#folders-list ul.filetree').append('\
                                 <li class="file ext_' + data.fileExtention + '">\
                                     <a hre="#" title="' + data.filePath + '" path="' + data.filePath + '">'+getFileName(data.filePath)+'</a>\
                                 </li>\
                              ').find('li:last').effect('highlight');
                           }
                           else{
                              
                              if (fileTree.size() == 0)
                              {
                                 $('div#folders-list ul.filetree a[path="' + uploadLocation + '"]').append('\
                                    <ul class="filetree">\
                                       <li class="file ext_' + data.fileExtention + '">\
                                         <a hre="#" title="'+getFileName(data.filePath)+'" path="' + data.filePath + '">'+getFileName(data.filePath)+'</a>\
                                       </li>\
                                    </ul>\
                                 ').find('li').effect('highlight');;
                              }
                              else{
                                 anchor.next('ul.filetree').append('\
                                    <li class="file ext_' + data.fileExtention + '">\
                                       <a hre="#" title="'+getFileName(data.filePath)+'" path="' + data.filePath + '">'+getFileName(data.filePath)+'</a>\
                                    </li>\
                                 ').find('li:last').effect('highlight');;
                              }
                              
                           }
                        }
                        
                        // bind this element
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_Upload();
                           openDialogBox_Upload();
                           newAjaxUploadInstance();
                        });
                     }
                  }
               }
               
               
               var appendLinksToFolderToolBar = function(el, disabled)
               {
                  $('ul#folders-menu').append('<li><a '+( (disabled)?"class=\"disabled\"":"" )+' id="'+el.id+'" href="#new-folder" title="'+el.title+'"><span class="'+el.cssClass+' button"></span>'+el.text+'</a></li>');
               }
               
               var appendLinksToFolderToolBarInForm = function(el, disabled)
               {
                  $('ul#folders-menu').append('\
                     <li>\
                        <form method="post" id="download-folder-form" name="download-folder-form" action="' + o.scriptDownloadFolder + '">\
                           <input type="hidden" id="folder" name="folder" value="" />\
                           <a '+( (disabled)?"class=\"disabled\"":"" )+' id="'+el.id+'" href="#new-folder" title="'+el.title+'"><span class="'+el.cssClass+' button"></span>'+el.text+'</a>\
                        </form>\
                     </li>');
               }
               
               // TODO: handle this the same way as for 'files'
               //actions.newFolder.init();
               //actions.renameFolder.init();
               actions.uploadFile.init();
               actions.downloadFolder.init();
               
               
               $('div#folders ul.filetree li.directory a').live('click', function()
               {
                  $('div#folders ul.filetree li a').removeClass('selected');
                  $(this).addClass('selected');
                  
                  actions.downloadFolder.enable();
               });
               $('div#folders ul.filetree li.file a').live('click', function()
               {
                  $('div#folders ul.filetree li a').removeClass('selected');
                  $(this).addClass('selected');

                  actions.downloadFolder.disable();
               });               
            }
            
            var getFileToolBarAction = function()
            {
               var links = o.fileToolBarLinks.split('|');
               return {
               
                  renameFile: {
                     id: 'rename-file-link',
                     title: 'Renomer ce fichier',
                     cssClass: 'rename',
                     text: 'Renomer',
                     action: function()
                     {
                     
                        var setDialogBox_RenameFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           
                           $('div#action-rename').html('\
                              Veuillez saisir un nouveau nom pour ce fichier:\
                              <input type="text" name="new-name" id="new-name" value="' + getFileName(filePath) + '"/>\
                              <p class="clear-both"></p>\
                           ').dialog({
                              title: 'Nom du fichier: ' + filePath,
                              modal: true,
                              draggable: false,
                              resizable: false,
                              width: 480,
                              minWidth: 480,
                              height: 160,
                              minHeight: 160,
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "valider": function()
                                 {
                                    $('div#action-rename p').empty();
                                    executeRenameFile();
                                 },
                                 "annuler": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           });
                        }
                        
                        var openDialogBox_RenameFile = function()
                        {
                           $('div#action-rename').dialog('open');
                        }
                        
                        var executeRenameFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           var onlyFilePath = filePath.replace(getFileName(filePath), '');
                           var getNewFileName = $('input#new-name').val();
                           var fullFilePath = onlyFilePath + getNewFileName;
                           
                           if (getNewFileName == '') 
                           {
                              $('div#action-rename p').text('Vous devez saisir un nom valide!').addClass('action-failure');
                           }
                           else 
                           {
                              $('div#action-rename input#new-name').addClass('wait');
                              $.post(o.scriptRenameFile, {
                              
                                 newFileName: fullFilePath,
                                 oldFileName: filePath
                              
                              }, function(data)
                              {
                              
                                 $('div#action-rename input#new-name').removeClass('wait');
                                 $('div#action-rename p').removeAttr('class').addClass(data.JSONCssClass).text(data.JSONmessage).show('slow');
                                 
                                 if (data.JSONresponse == 'OK') 
                                 {
                                 
                                    updateFilePath(fullFilePath);
                                    updateResourceTitle(fullFilePath);
                                    
                                 }
                                 
                              }, 'json');
                           }
                           
                        };
                        
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_RenameFile();
                           openDialogBox_RenameFile();
                        });
                        
                     }
                  },
                  
                  moveFile: {
                     id: 'move-file-link',
                     title: 'Déplacer ce fichier dans un autre répertoire',
                     cssClass: 'move',
                     text: 'Déplacer',
                     action: function()
                     {
                        var setDialogBox_MoveFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           $('div#action-move-file').html('\
                              Veuillez choisir le nouveau emplacement pour <strong>' + getFileName(filePath) + '</strong>:\
                              <span class="button refresh-list-folders float-right" title="Rafraîchir la liste"></span>\
                              <div id="new-file-location">\
                                 Veuillez patienter ...\
                              </div>\
                              <div id="new-file-path">\
                                 <strong class="float-left">Chemin: </strong>\
                                 <strong id="full-file-path"></strong>\
                                 <span id="add-new-folder" class="button float-right" title="ajouter un nouveau répertoire"></span>\
                              </div>\
                              <p></p>\
                           ').dialog({
                              title: 'Déplacement du fichier: ' + filePath,
                              modal: true,
                              draggable: false,
                              minWidth: 480,
                              width: 480,
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "valider": function()
                                 {
                                    executeMoveFile();
                                 },
                                 "annuler": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           });
                        }
                        
                        var openDialogBox_MoveFile = function()
                        {
                           $('div#action-move-file p').html('');
                           $('div#action-move-file').dialog('open');
                        }
                        
                        var bindNewFolderSearch = function()
                        {
                           $('div#new-file-location').fileTree({
                           
                              root: o.workspace,
                              script: o.scriptFileTree,
                              showFoldersOnly: true,
                              multiFolder: false,
                              showFullPath: true,
                              includeRoot: true,
                              fullPathElement: '#full-file-path',
                              loader: 'div#action-move-file span.refresh-list-folders'
                           
                           });
                           
                        }
                        
                        var bindRefreshFoldersList = function()
                        {
                           $('span.refresh-list-folders').live('click', function()
                           {
                              bindNewFolderSearch();
                              $('#full-file-path').html('');
                              
                           }).removeClass('wait');
                        }
                        
                        var bindAddNewFolder = function()
                        {
                           $('span#add-new-folder').live('click', function()
                           {
                           
                              if (!$(this).hasClass('wait')) 
                              {
                                 var slashIt = ($('strong#full-file-path').text().match('/')) ? '' : '/';
                                 var inputElement = '<input type="text" value="' + slashIt + 'nouveau/"/>';
                                 var filePathInput = $('strong#full-file-path input');
                                 
                                 if (filePathInput.length == 1) 
                                 {
                                    filePathInput.replaceWith(getFilePathFromInput());
                                 }
                                 
                                 $('strong#full-file-path').append(inputElement).find('input').focus().bind('keypress', function(e)
                                 {
                                    if (e.which == 13) 
                                    {
                                       $(this).replaceWith(getFilePathFromInput());
                                    }
                                 }).bind('blur', function()
                                 {
                                    $(this).replaceWith(getFilePathFromInput());
                                 });
                              }
                              
                           });
                        }
                        
                        var getFilePathFromInput = function()
                        {
                           var filePath = $.trim($('strong#full-file-path input').val());
                           return (filePath.lastIndexOf('/') != filePath.length - 1) ? filePath + '/' : filePath;
                        }
                        
                        var getCleanFilePath = function(filePath)
                        {
                           // remove the leading '.'
                           filePath = (filePath.indexOf('.') == 0) ? filePath.substring(1, filePath.length) : filePath;
                           
                           // add the leading '/'
                           return (filePath.indexOf('/') != 0) ? '/' + filePath : filePath;
                        }
                        
                        var executeMoveFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           var tmp = $('strong#full-file-path');
                           var newFilePath = tmp.text() + getFilePathFromInput() + getFileName(filePath);
                           
                           $('span#add-new-folder').addClass('wait');
                           $('div#action-move-file p').html('');
                           $.post(o.scriptMoveFile, {
                           
                              from: getCleanFilePath(filePath),
                              to: getCleanFilePath(newFilePath)
                           
                           }, function(data)
                           {
                           
                              $('span#add-new-folder').removeClass('wait');
                              $('div#action-move-file p').removeAttr('class').addClass(data.JSONCssClass).text(data.JSONmessage).show();
                              
                              if (data.JSONresponse == "OK") 
                              {
                                 initMainFileTree();
                                 updateFilePath(newFilePath);
                                 updateResourceTitle(newFilePath);
                                 
                              }
                           }, 'json')
                           
                        };
                        
                        // now open
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_MoveFile();
                           bindRefreshFoldersList();
                           bindAddNewFolder();
                           bindNewFolderSearch();
                           openDialogBox_MoveFile();
                        });
                        
                     }
                  },
                  
                  deleteFile: {
                     id: 'delete-file-link',
                     title: 'Supprimer ce fichier',
                     cssClass: 'delete',
                     text: 'Supprimer',
                     action: function()
                     {
                        var setDialogBox_DeleteFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           $('div#action-delete-file').html('\
                                 Voulez vous vraiment supprimer le fichier <strong>' + getFileName(filePath) + '</strong> ?\
                                 <p></p>\
                           ').dialog({
                              title: 'Suppression du fichier: ' + filePath,
                              modal: true,
                              draggable: false,
                              resizable: false,
                              minWidth: 480,
                              width: 480,
                              height: 160,
                              minHeight: 160,
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "Oui": function()
                                 {
                                    executeDeleteFile();
                                 },
                                 "Non": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           });
                        }
                        
                        var openDialogBox_DeleteFile = function()
                        {
                           $('div#action-delete-file p').html('');
                           $('div#action-delete-file').dialog('open');
                        }
                        
                        var closeDialogBox_DeleteFile = function()
                        {
                           $('div#action-delete-file').dialog('close');
                        }
                        
                        var executeDeleteFile = function()
                        {
                        
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           $.post(o.scriptDeleteFile, {
                           
                              f: filePath
                           
                           }, function(data)
                           {
                           
                              if (data.JSONresponse == "OK") 
                              {
                                 closeTab($('div#files-tabs ul.visible-tabs a[path="' + filePath + '"]').parent('li'));
                                 $('div#folders-list ul.filetree a[path="' + filePath + '"]').parent('li').remove()
                                 //initMainFileTree();
                                 closeDialogBox_DeleteFile();
                                 
                              }
                              else 
                              {
                                 $('div#action-delete-file p').removeAttr('class').addClass(data.JSONCssClass).text(data.JSONmessage).show();
                              }
                              
                           }, 'json');
                           
                        };
                        
                        // now open
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_DeleteFile();
                           openDialogBox_DeleteFile();
                        });
                     }
                  },
                  infosFile: {
                     id: 'infos-file-link',
                     title: 'Afficher plus d\'informations sur ce fichier',
                     cssClass: 'infos',
                     text: 'Infos',
                     action: function()
                     {
                        var setDialogBox_InfosFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           $('div#action-infos-file').html('<span class="wait float-left button"></span>récupération des informations ...').dialog({
                              title: 'Informations: ' + filePath,
                              modal: true,
                              draggable: false,
                              resizable: false,
                              minWidth: 480,
                              width: 480,
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "OK": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           }).load(o.scriptFileInfos, {
                              file: filePath
                           });
                           
                        }
                        
                        var openDialogBox_InfosFile = function()
                        {
                           $('div#action-infos-file').dialog('open');
                        }
                        
                        // now open
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_InfosFile();
                           openDialogBox_InfosFile();
                        });
                     }
                  },
                  downloadFile: {
                     id: 'download-file-link',
                     title: 'Télécharger ce fichier',
                     cssClass: 'download',
                     text: 'Télécharger',
                     action: function()
                     {
                        var setDialogBox_DownloadFile = function()
                        {
                            
                            var getDownloadOptions = function(filePath)
                            {
                              var tmp = filePath.split('.');
                              var ext = tmp[tmp.length-1];
                              if ( NONPRINTABLE_FILETYPE.indexOf(ext) != -1 )
                              {
                                return '\
                                  <li><a href="#" path="none">Normal</a></li>\
                                  <li><a href="#" path="zip">Zip</a></li>';
                              }
                              else {
                                return '\
                                  <li><a href="#" path="none">Normal</a></li>\
                                  <li><a href="#" path="zip">Zip</a></li>\
                                  <li><a href="#" path="pdf">Pdf</a></li>';
                              }
                            }
                            
                            var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                            $('div#action-download-file').html('\
                              Veuillez choisir le type du téléchargement:\
                              <form method="post" id="download-form" name="download-form" action="' + o.scriptDownloadFile + '">\
                                <input type="hidden" id="file" name="file" value="' +
                            filePath +
                            '" />\
                              <input type="hidden" id="mode" name="mode" value="" />\
                                <ul>\
                                  '+getDownloadOptions(filePath)+'\
                                </ul>\
                              </form>\
                            ').dialog({
                              title: 'Téléchargement: ' + filePath,
                              modal: true,
                              draggable: false,
                              resizable: false,
                              autoOpen: false,
                              bgiframe: true,
                              minWidth: 480,
                              width: 480,
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "OK": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           });
                        }
                        
                        var openDialogBox_DonwloadFile = function()
                        {
                           $('div#action-download-file').dialog('open');
                        };
                        
                        
                        var bindDonwloadMode = function()
                        {
                           $('div#action-download-file li a').bind('click', function()
                           {
                              $('form#download-form input#mode').val($(this).attr('path')).parent('form').submit();
                           })
                        };
                        
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_DownloadFile();
                           bindDonwloadMode();
                           openDialogBox_DonwloadFile();
                        })
                     }
                  },
                  printFile: {
                     id: 'print-file-link',
                     title: 'Imprimer ce fichier',
                     cssClass: 'print',
                     text: 'Imprimer',
                     action: function()
                     {
                        var setDialogBox_PrintFile = function()
                        {
                           var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                           $('div#action-print-file').html('\
                              <form class="wait" id="print-file" name="print-file" method="post" target="print-file-area" action="' + o.scriptFileContent + '">\
                                 <input type="hidden" name="file" value="' +
                           filePath +
                           '"/>\
                                 <input type="hidden" name="mode" value="print" />\
                              </form>\
                              <iframe src="#" name="print-file-area" id="print-file-area" />\
                              <!--<div id="print-file-area"></div>-->\
                           ').dialog({
                              title: 'Aperçu avant l\'impression: ' + filePath,
                              modal: true,
                              autoOpen: false,
                              resizable: false,
                              draggable: false,
                              minWidth: 700,
                              width: '90%',
                              minHeight: 500,
                              height: '90%',
                              show: o.dialogBoxShowEffect,
                              hide: o.dialogBoxHideEffect,
                              buttons: {
                                 "imprimer": function()
                                 {
                                    window.frames[0].print();
                                 },
                                 "fermer": function()
                                 {
                                    $(this).dialog("close");
                                 }
                              }
                           
                           }).find('iframe').css({
                              'border': '0 none',
                              'width': '100%',
                              'height': '99%',
                              'display': 'block'
                           });
                        }
                        $('a#' + this.id).live('click', function()
                        {
                           setDialogBox_PrintFile();
                           $('div#action-print-file').dialog('open');
                           //$('div#print-file-area').html( $('div#file-content').html() );
                           $('form#print-file').submit();
                           
                        })
                     }
                  }
               }
               
               var updateFilePath = function(f)
               {
                  var filePath = $('div#files-tabs ul.visible-tabs li.focus a').attr('path');
                  updateFilePathInFiletree(f, filePath);
                  updateFilePathInTab(f, filePath);
               }
               
               var updateFilePathInFiletree = function(f, filePath)
               {
                  $('div#folders-list ul.filetree a[path="' + filePath + '"]').text(getFileName(f)).attr({
                     'title': f,
                     'path': f
                  });
               }
               
               var updateFilePathInTab = function(f, filePath)
               {
                  $('div#files-tabs ul.visible-tabs li.focus a[path="' + filePath + '"]').text(getFileName(f)).attr({
                     'title': f,
                     'path': f
                  });
                  ;
               }
               
            }
            
            var applyUserActions = function()
            {
               
               var appendLinkToFileMenu = function(el)
               {
                  $('ul#file-menu').append('<li><a id="' + el.id + '" href="#" title="' + el.title + '" class="disabled" ><span class="' + el.cssClass + ' button"></span>' + el.text + '</a></li>');
               }
               
               var getUserActions = function()
               {
                  var action = new Array();
                  //var infos = {};
                  var userActions = o.fileToolBarLinks.split('|');
                  var arrayOfActions = FILESACTIONS.split('|');
                  
                  for (var i=0; i<userActions.length; i++)
                  {
                     var foundActionPosition = $.inArray(userActions[i], arrayOfActions);
                     if (foundActionPosition != -1)
                     {
                        action.push({
                           name : userActions[i],
                           position : foundActionPosition
                        });
                        
                     }
                  }
                  
                  return action;
               }   
                           
               var allowedAction = FILESACTIONS.split('|');
               var len = allowedAction.length;
               var linksOptions = getFileToolBarAction();

               for (var i = 0; i < len; i++) 
               {
                  
                  appendLinkToFileMenu(linksOptions[allowedAction[i]+'File']);

               }

               var userAction = getUserActions();
               len = userAction.length;
               for(var j=0; j<len; j++)
               {
                                    
                  if (userAction[j] != undefined) 
                  {
                     var userActionName = userAction[j].name;
                     var userActionPosition = userAction[j].position;
                     var regExp = new RegExp(userActionName);

                     if (FILESACTIONS.search(regExp) != -1) 
                     {

                        $('#' + linksOptions[allowedAction[userActionPosition] + 'File'].id).removeClass('disabled');
                        linksOptions[allowedAction[userActionPosition]+'File'].action();
                        
                     }
                     
                  }
               }
                              
            }
            
            var allowResizingImages = function()
            {
               $('img.images').resizable({
                  containment: 'parent',
                  handles: 'n, e, s, w, ne, se, sw, nw'
               });
            }
            
            var allowDragableImages = function()
            {
               $('img.images').parent('div').draggable({
                  containment: 'parent'   
               });
            }
            
            var allowImagesOnFullScreen = function()
            {
               //var json = eval($('div#file-content  img.images').attr('path'));
               $('div#file-content img.images').live('dblclick', function(){
                  
                  if ($(this).hasClass('image-full-screen'))
                  {
                     $('div.ui-wrapper, img.images').removeClass('image-full-screen').animate({
                        'height': 110,
                        'width': 110
                     });

                  }
                  else {
                     $('div.ui-wrapper, img.images').addClass('image-full-screen').animate({
                        'height': 500,
                        'width': 700,
                        'zIndex': 9999,
                        'position': 'relative',
                        'margin' :'auto'
                     }, 500);                  

                  }
                  
               });
            }
            
            var allowSortabeTabs = function()
            {
               if (o.canSortTabs) 
               {
                  $('div#files-tabs ul.visible-tabs').sortable({
                     revert: true,
                     axis: 'x',
                     containment: 'parent',
                     items: 'li',
                     tolerance: 'pointer',
                     placeholder: 'place-holder',
                     floats: true,
                     opacity: 0.8,
                     forcePlaceholderSize: true,
                     sort: function(e, ui)
                     {
                        drawTabsBorders();
                        $(ui.item).addClass('borders');
                     },
                     update: function(e, ui)
                     {
                        drawTabsBorders();
                        $(ui.item).removeClass('borders');
                     },
                     stop: function(e, ui)
                     {
                        if (!ui.item.hasClass('focus')) 
                           loadFile($(ui.item).find('a').attr('path'));
                     }
                  });
               }
            }
            
            var drawTabsBorders = function()
            {
               $('div#files-tabs li.focus').each(function()
               {
                  $(this).nextAll().removeClass('left-border').addClass('right-border');
                  $(this).prevAll().removeClass('right-border').addClass('left-border');
               })
            }
            
            var allowClickOnTab = function()
            {
            
               $('div#files-tabs ul.visible-tabs a').live('click', function()
               {
                  if (!$(this).parent('li').is('li.focus')) 
                  {
                     
                     loadFile($(this).attr('path'));
                     
                  }
               });
            }
            
            var allowHiddenTabs = function()
            {
            
               var firstListItem = $('div#files-tabs ul.visible-tabs li.file:first');
               
               // add the first element to the hidden list
               $('ul.hidden-tabs').append('<li>' + firstListItem.html() + '</li>');
               showHowManyHiddenFiles();
               
               removeTab(firstListItem);
               
               // add the toggling button only if it doesn't exist
               if (!$('div#files-tabs').find('span').is('#toggle-hidden-list')) 
               {
                  $('div#files-tabs').append('\
                     <span id="toggle-hidden-list" class="button">\
                        <strong></strong>\
                     </span>\
                  ').find('span#toggle-hidden-list').live('click', function()
                  {
                  
                     $(this).toggleClass('down');
                     $('ul.hidden-tabs').animate({
                        'height': 'toggle'
                     }, 100);
                     
                  });
                  
                  allowReloadingHiddenFile();
                  allowClosingHiddenTabs();
               }
               
            }
            
            var allowClosingHiddenTabs = function()
            {
            
               $('ul.hidden-tabs span.close-tab').live('click', function()
               {
                  removeTab($(this).parent('li'), {
                     'height': 0,
                     'opacity': 'hide'
                  });
               });
               
            }
            
            var allowReloadingHiddenFile = function()
            {
            
               var lastVisibleTab = $('div#files-tabs ul.visible-tabs li.file:last');
               
               $('ul.hidden-tabs a').live('click', function()
               {
               
                  // add the first element to the hidden list
                  $('ul.hidden-tabs').append('<li>' + lastVisibleTab.html() + '</li>');
                  removeTab(lastVisibleTab);
                  loadFile($(this).attr('path'));
               })
            }
            
            var allowClosingVisibleTabs = function()
            {
               $('ul.visible-tabs span.close-tab').live('click', function()
               {
               
                  closeTab($(this).parent('li'));
                  
               });
            }
            
            var closeTab = function(current_li)
            {
               removeTab(current_li);
               updateHiddenTabs();
               
               var next_li = current_li.next('li');
               var prev_li = current_li.prev('li');
               if (current_li.hasClass('focus')) 
               {
                  if (next_li.length == 1) 
                  {
                     // if it has an adjascent tab next to it...
                     loadFile(next_li.find('a').attr('path'));
                  }
                  else if (prev_li.length == 1) 
                  {
                     // ...or before
                     loadFile(prev_li.find('a').attr('path'));
                  }
                  else 
                  {
                     // only one tab is opened. So this is the simpliest case
                     // remove the tab, and clean the workspace
                     $('div#file-content').css('height', $('div#folders-list').height()+23).html('');
                     $('ul#file-menu').hide();
                     $('div#files-tabs').css({
                        'height': o.tabsInitHeight + 'px'
                     });
                     updateResourceTitle();
                     $('div#file-status-bar').css({
                        'height': '0'
                     }).html('');
                  }
               }
            }
            
            var updateHiddenTabs = function()
            {
               if (getNbHiddenTabs() > 0) 
               {
                  var lastAddedHiddenFile = $('ul.hidden-tabs li:last');
                  //console.log(lastAddedHiddenFile.text());
                  
                  $('div#files-tabs ul.visible-tabs').prepend(getTabBody(lastAddedHiddenFile.find('a').attr('title')));
                  removeTab(lastAddedHiddenFile, {
                     'height': 0,
                     'opacity': 'hide'
                  });
                  showHowManyHiddenFiles();
                  
               }
               
            }
            
            var showHowManyHiddenFiles = function()
            {
               $('span#toggle-hidden-list strong').text(getNbHiddenTabs());
            }
            
            var getNbHiddenTabs = function()
            {
               return $('ul.hidden-tabs').children('li').length;
            }
            
            var getFileName = function(f)
            {
               return f.substring(f.lastIndexOf("/") + 1, f.length);
            }
            
            var getFileExtention = function(f)
            {
               return f.substring(f.lastIndexOf(".") + 1, f.length).toLowerCase();
            }
            
            var isFileOpened = function(f)
            {
               var isOpened = false;
               $('div#files-tabs ul.visible-tabs li.file').each(function()
               {
                  if ($(this).find('a').attr('path') == f) 
                  {
                     isOpened = true;
                  }
               });
               return isOpened;
            }
            
            var allowDialogBox_Welcome = function()
            {
               if (o.showWelcomeMessage) 
               {
                  $("div#message-welcome span").html(o.welcomeMessage).parents('div#message-welcome').dialog({
                     title: o.welcomeTitle,
                     modal: true,
                     resizable: false,
                     show: o.dialogBoxShowEffect,
                     hide: o.dialogBoxHideEffect,
                     closeOnEscape: false,
                     width: WELCOMEDIALOG_WIDTH,
                     height: WELCOMEDIALOG_HEIGHT,
                     dragStart: function(event, ui)
                     {
                        hideDialogBoxContentWhileDragging(ui);
                     },
                     dragStop: function(event, ui)
                     {
                        showDialogBoxContentAfterDragging(ui);
                     }
                  });
               }
            }
            
            var hideDialogBoxContentWhileDragging = function(el)
            {
               $(el.helper).css({
                  'opacity': 0.5
               }).find('div:not(:first)').css({
                  'visibility': 'hidden'
               });
            }
            
            var showDialogBoxContentAfterDragging = function(el)
            {
               $(el.helper).css({
                  'opacity': 1
               }).find('div:not(:first)').css({
                  'visibility': 'visible'
               });
            }
            
            var setFoldersPanelResizing = function()
            {
               if (o.enableFoldersPanelResizing) 
               {
                  $("div#folders").resizable({
                     animate: true,
                     maxWidth: 400,
                     minWidth: 100,
                     allows: 'e',
                     resize: function(event, ui)
                     {
                        $(ui.helper).css({
                           'border': '1px dotted #aaa'
                        })
                     }
                  }).find('.ui-resizable-e').append('<span id="resize-icon"></span>').find('span#resize-icon').live('click', function()
                  {
                     var folder_width = function()
                     {
                        var width = $('div#folders').width();
                        if (width >= 100) 
                           return '90px';
                        else if (width <= 100) 
                           return '400px';
                     };
                     //console.log(folder_width());
                     $('div#folders').animate({
                        'width': folder_width()
                     });
                  });
                  
               }
            }
            
            var bindReportBug = function()
            {
               $('div#menu a#show-report-bug').click(function(){
                  showReportBugDialogBox();
               });
            }
            
            var showReportBugDialogBox = function () 
            {
               $('div#action-report-bug').html('\
                  <form method="post" action="'+o.scriptReportBug+'" id="report-bug" name="report-bug">\
                     <label for="title">title</label>\
                     <input type="text" name="title" value="" /><br />\
                     <label for="Description">Description</label>\
                     <textarea name="description" rows="10" cols="10"></textarea>\
                  </form>\
               ').dialog({
                  title: "Reporter un Bug",
                  modal: true,
                  resizable: false,
                  draggable: false,
                  show: o.dialogBoxShowEffect,
                  hide: o.dialogBoxHideEffect,
                  width: WELCOMEDIALOG_WIDTH,
                  height: 300,
                  buttons: {
                     "Envoyer" : function(){
                        sendBug();
                     }
                  }
                 }).dialog('open');
                 $('div#action-report-bug + div.ui-dialog-buttonpane').prepend('<span />');
            }
            
            var sendBug = function()
            {
               $.ajax({
                  url: $('form#report-bug').attr('action'),
                  dataType: 'json',
                  type: 'post',
                  data: {
                     title: $('input[name="title"]').val(),
                     desc: $('textarea[name="description"]').val()
                  },
                  beforeSend: function()
                  {
                     $('div#action-report-bug + div.ui-dialog-buttonpane span')
                        .addClass('wait').removeClass('error')
                        .html('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
                  },
                  success: function(json){
                     if ( json.response == "success" )
                     {
                        $('div#action-report-bug + div.ui-dialog-buttonpane span')
                           .removeClass('wait')
                           .html('Bug signalé, Merci.');
                     }
                     else if ( json.response == "failed" )
                     {
                        $('div#action-report-bug + div.ui-dialog-buttonpane span')
                        .removeClass('wait').addClass('error')
                        .html('Oops! Veuillez reéssayer plus tard!');
                     }
                  }
               });
            }
            
            var bindCloseWelcomeDialog = function()
            {
              $('a#login-btn').click(function(){
                var login = $('form#login-form input[type="text"]').val();
                var password = $('form#login-form input[type="password"]').val();
                
                if ( login == '' ) $('form#login-form input[type="text"]').addClass('error-input');
                if ( password == '' ) $('form#login-form input[type="password"]').addClass('error-input');
                
                if ( login != '' && password != '')
                {
                  $.ajax({
                        url:'index.php/login', 
                        type:'post',
                        dataType:'json',
                        data:'login='+login+'&pass='+password,
                        success:function(json){
                          if (json.response == "SUCCESS") 
                          {
                            initMainFileTree();
                            
                            log_btn = $('a#show-login-btn');
                            log_btn.text('se déconnecter');
                            log_btn.attr('id', 'logout-btn');
                            log_btn.attr('href', '#logout');
                            bindLogout();
                      
                            $('div#message-welcome').dialog('close');
                            $('#panels').show();
                          }
                          else if(json.response == "BAD") {
                            alert('Votre Nom ou Mot de passe sont éronnés!\nVeuillez vérifier vos identifiants\nMerci');
                          }
                        }
                  });
                }
                
              });
              
              $('a#try-demo-btn').click(function(){
                $('div#message-welcome').dialog('close');
              });
              
              $('div#message-welcome').bind('dialogclose', function(event, ui) {
                $('#panels').show();
                //bindShowLoginDialog();
              });
            }
            
            var bindLogout = function()
            {
              $('a#logout-btn').bind('click', function(){
                doLogout();
              });
            }
            
            var doLogout = function ()
            {
              $.ajax({
                url:'index.php/login/out', 
                success:function(){
                    initMainFileTree();
                    bindShowLoginDialog();
                  }
              });
            }
            
            var bindShowLoginDialog = function()
            {
              var log_btn = $('div#menu a[contains="log"]');
              log_btn.die('click');
              log_btn.text('se connecter');
              log_btn.attr('id', 'show-login-btn');
              log_btn.attr('href', '#login');
              log_btn.live('click', function(){
                window.location = "http://ent.cheghamwassim.com";
              });
            }
            
            var initSetting = function()
            {
               bindCloseWelcomeDialog();
               bindShowLoginDialog();
               bindReportBug();

               syncWorkspaceDimensionsWithClientWindow('init');
               
               $('a').live('click', function(event)
               {
                  event.preventDefault();
               });
               $('form').live('submit', function(event)
               {
                  event.preventDefault();
               });
               
               $(window).bind('resize', function()
               {
                  syncWorkspaceDimensionsWithClientWindow();
               });
               
               if (!o.showWelcomeMessage)
               {
                  $('div#panels').show();
               }
               
               bindFileTree();
               allowDialogBox_Welcome();
               setFoldersPanelResizing();
               
               setToolBarsMouseOverMouseOut();
               setFolderToolBarAction();         
               allowClosingVisibleTabs();
               allowClickOnTab();
               
            }

            var syncWorkspaceDimensionsWithClientWindow = function(init)
            {
               var height = $(window).height()-80;
               $('div#folders-list').css('height', height);
               $('div#file-content').css('height', height+((init==undefined)?0:25));
            }
            
            var initMainFileTree = function()
            {
               $('div#folders-list').fileTree({
               
                  root: o.workspace,
                  script: o.scriptFileTree,
                  loader: 'div#folder-tabs span.refresh-list-folders'
               
               }, function(f)
               {
                  loadFile(f)
               });
               
            }
            
            var bindFileTree = function()
            {
               $('span.refresh-list-folders').not('.wait').bind('click', function()
               {
                  initMainFileTree();
               });
            }

            var start = function()
            {
               initMainFileTree(); 
               initSetting();
            }
            
            if (o.automaticStart) 
            {
               start();
            }
         }
      });
      
   })(jQuery);
