  jQuery.noConflict();
  var $ = jQuery; 
  jQuery(document).ready( function() {      
    //#### START convert module list to dropdown jumpmenu  ######
    $('ul.selectdropdown').each(function(){
      var list=$(this),
      select=$(document.createElement('select')).insertBefore($(this).hide());
      $('li a', this).each(function(){
      var target=$(this).attr('target'),
      option=$(document.createElement('option'))
       .appendTo(select)
       .val(this.href)
       .html($(this).html())
      });
      select.change(function(){
        window.location.href=$(this).val();
        return false;
        });
    });
    //style the dropdowns
    $("#module_navform select").val('/intro-modules/');
    $("#module_navform select").css("font-size","14px");
    $("#module_navform select").css("color","#FF9900");
    $("#module_navform2 select").css("font-size","14px");
    $("#module_navform2 select").css("color","#0073EA");
    
    //set the default for the sidebar drop down
    $("#module_navform2 select").val('/intro-modules/');
    $("#module_navform").show();
    $("#module_navform2").show();
    $('.sidebar_nav .page-item-' + 115).prepend( '<form id="checkthismenu-115" class="checkthismenu" target="" style="display:inline;"><input type="checkbox" class="menu_checkbox"  style="float:left;" value="115" /></form>' );
    $('.sidebar_nav .page-item-' + 5723).prepend( '<form id="checkthismenu-5723" class="checkthismenu" target="" style="display:inline;"><input type="checkbox" class="menu_checkbox"  style="float:left;" value="5723" /></form>' );
    $('.sidebar_nav .page-item-' + 5672).prepend( '<form id="checkthismenu-5672" class="checkthismenu" target="" style="display:inline;"><input type="checkbox" class="menu_checkbox"  style="float:left;" value="5672" /></form>' );
    $('.sidebar_nav .page-item-' + 5679).prepend( '<form id="checkthismenu-5679" class="checkthismenu" target="" style="display:inline;"><input type="checkbox" class="menu_checkbox"  style="float:left;" value="5679" /></form>' );
    $('.sidebar_nav .page-item-' + 5702).prepend( '<form id="checkthismenu-5702" class="checkthismenu" target="" style="display:inline;"><input type="checkbox" class="menu_checkbox"  style="float:left;" value="5702" /></form>' );
    
    var isComplete=new Array('2381','4706','4708');
    //alert (isComplete);
    var x;
    for (x in isComplete) {
      $('#checkthismenu-' + isComplete[x] + ' input').attr('checked',true);
      $('#checkthis-' + isComplete[x] + ' input').attr('checked',true);
      //alert ('#checkthismenu-' + isComplete[x] + ' input');
    }
          
    $('.checkthismenu input').click(function(){
      $(this).parent().submit();
      //alert(theID);
    });

    //!!! END functions for tracking  
    $('.cform').submit(function(){ 
      alert('submit');
      return false;
    });

    // ####  START DROPDOWN MENUS #### 
    $("#dropmenu ul").css({display: "none"}); // Opera Fix 
    
    $("#dropmenu li").hover(function(){ 
      $(this).find('ul:first').css({visibility: "visible",display: "none"}).show(268); 
    },function(){ 
        $(this).find('ul:first').css({visibility: "hidden"}); 
    }); 
    
    // #### END DROPDOWN MENUS #### 
    //#### START sidebar accordian menus ####
    $navmenu = '.sidebar_nav';
    //If its a page parent (based off wordpress), add the class "displayMe"
    //This way the accordion will be opened up on the page you are on.
    if ($($navmenu + ' ul li').hasClass("current_page_parent")) {
      $($navmenu + ' .current_page_parent ul').addClass("displayMe"); }
    if ($($navmenu + ' ul li').hasClass("current_page_ancestor")) {
      $($navmenu + ' .current_page_ancestor').parent().addClass("displayMe"); }

    //Hide the submenus
    $($navmenu + ' ul li ul ').hide();
    $($navmenu + ' ul li.current_page_item ul ').show();
    $($navmenu + ' ul li.current_page_item ul ').parent().addClass("opened");

    $('.displayMe').show();
    $('.displayMe').parent().addClass("opened");
    //Add a class to the parent li IF it has sub UL's
    $($navmenu + " ul li:has(ul)").addClass("theParent");

    //Da henchman
    $($navmenu + " ul li ul li:has(a)").addClass("theChild");

    //Remove the link if it has a submenu
    //$($navmenu + ' .theParent > a').attr('href', '#');
    $($navmenu + ' ul li a').addClass("navmenulink"); 

    //When you click it, toggle 
    var togglemenu = function toggle_menu(){
      //Onclick Remove the class displayMe which is only display:block;
      //This way they can close it if they click it
      if ($(this).attr('href') == '#') { 
      if ($(this).parent().hasClass('opened')){
        $(this).parent().removeClass("opened");
      }else{
        $(this).parent().addClass("opened");
      }
      //alert($(this).next().hasClass('opened')); 
      //return false so the # doenst move view to the top of the page
        if ($(this).attr('href') == '#') { 
          return false; this.blur();  
        } else {
          return true; this.blur(); 
        }
      }
    }

    $('.navmenulink').bind('click', togglemenu);
  }); //end ready function        

  // supporting functions
    //#####  update progress indicator   #####
    //count up functions for progress indicator
    function mod2(id, value, cssoffset) {
      var numb = $(id).html();
      var current_value = parseInt(numb);
      // determine direction to go
      var dir = 1;
      var distance = current_value - value;
      var timeout = 12;
      var totaltime = timeout*(0-(timeout * distance));
      var navanimate = timeout*(0-(timeout * distance)/2);
      if (navanimate < 0) {
        navanimate = 0-navanimate;
      }
      if(totaltime<0){totaltime=0-totaltime;}
      //console.log(cssoffset+" : "+timeout+" : "+distance+" : "+totaltime);
      if(distance=='-100'){
        $('#sidebar_nav_progress_bar').css('backgroundPosition',cssoffset);
        //console.log($('#sidebar_nav_progress_bar').css('backgroundPosition'));
        $(id).html('100');
        return false;
      } 
      $('#sidebar_nav_progress_bar').animate({backgroundPosition: cssoffset },navanimate);

      if (distance > 0) {
        dir *= -1;
      }
      //alert(id+":"+current_value+":"+value+":"+dir);
      getThere(id, current_value, value, dir, timeout);
    }
    
    //loopy
    function getThere(id, current_value, target_value, dir, timeout) {
      current_value += dir;
      timeout = timeout - timeout*0.1;
      $(id).html(current_value);
      if (current_value != target_value && current_value < 100) {
        setTimeout("getThere('"+id+"',"+current_value+","+target_value+","+dir+","+timeout+")", timeout);
      } else {
        current_value = null;
        callback(); 
      }
    }
    
    function callback(){
      $('.checkthismenu').removeClass('loading');
      $('.checkthismenu').find('input').attr('disabled',false);
    }
    
    //wrap it up
    function progress_update(container) {
      var output;
      var boxes;
      boxes = $(container).find('input[type=checkbox]');
      boxes = boxes.length;
      checkedboxes = $(container).find('input[type=checkbox]:checked');
      checkedboxes = checkedboxes.length;
    
      if(checkedboxes==0){
        //console.log($('#sidebar_nav_progress_bar').css('backgroundPosition'));
        $('#progress_checked').html('0');
        $('#progress_percent').html('0');
        $('#sidebar_nav_progress_bar').css('backgroundPosition','-314px 0px');
        $('#progress_all').html(boxes);
        //if (typeof callback == "function") callback(); else console.log(callback);
        callback(); 
        return false;
      } 

      var offset = 100-((checkedboxes*100)/boxes);
      //alert(boxes + " : " + checkedboxes + " : " + offset);
      var offset = 0-(offset*314)/100;
      var cssoffset = offset + 'px 0px';
      var percent = ((checkedboxes*100)/boxes);
      percent = parseFloat(percent);
      percent = percent.toFixed(0);
      $('#progress_checked').html(checkedboxes);
      $('#progress_all').html(boxes);
      mod2('#progress_percent', percent, cssoffset);
    }

    $(document).ready( function() { 
    //load progress indicators and checkboxes 
    $('.checkthismenu').addClass('loading');
    progress_update('.nav_tree .page-item-2379'); 
    $('.checkthismenu').submit(function(){ 
      var theID = $(this).find('input').val();
      $('#checkthis-' + theID).addClass('loading');
      $('#checkthismenu-' + theID).addClass('loading');
      //$('.checkthismenu').addClass('loading');
      $('.checkthismenu').find('input').attr('disabled', true);
      //$(this).addClass('loading');
      //alert('check');
       //is the box checked?
      var checked;
      if($(this).find('input').attr('checked')){
        checked='true';
        attrChecked=true;
      } else {
        checked='false';
        attrChecked=false;
      } 
        $.post( 
           "/default/header-checkbox.php?is_complete=" + checked + "&postID=" + $(this).find('input').val(), 
           function(data){ 
           //alert("success");
            $('#checkthis-' + theID).find('input').attr('checked', attrChecked);
            $('#checkthismenu-' + theID).find('input').attr('checked', attrChecked);
            progress_update('.page-item-2379');

        }); 
      return false;
    }); 
    
  }); 