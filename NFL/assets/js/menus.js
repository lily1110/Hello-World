
function makeDiv(style,content) {
    return ("<div class='"+style+"'>"+content+"</div>")  ;
}

function Content(first,second,third,style) {
    this.first = first;
    this.second = second;
    this.third = third;
    this.style = style;

}
Content.prototype.getComponent= function() {
    var first_html ="";
    if( this.first.length>20 ) {
        first_html+="<div class='"+this.style+" menu_brief_title1_long' >"+(this.first?this.first:"")+"</div>"
    }
    else {
        first_html+= "<div class='"+this.style+" menu_brief_title1' >"+(this.first?this.first:"")+"</div>"
    }
    var text_html =
        (   first_html+
            "<div class='"+this.style+" menu_brief_title2' >"+(this.second?this.second:"")+"</div>" +
            "<div class='"+this.style+" menu_brief_title3' >"+(this.third?this.third:"")+"</div>"
        );
    var button_html=""
    if(this.button) {
        button_html += ("" +
        "<div class='"+this.style+"'>" +
        "<a class='"+this.button.style+
        " ' href='"+this.button.url+"'>"
        +this.button.name+"</a></div>");
    }
    return text_html+button_html;
}

function SubMenu(instance,name,url,style,subMenus,content,init) {
    this.instance = instance;
    this.url = url;
    this.name = name;
    this.style = style;
    this.subMenus = subMenus;
    this.content = content;
    this.init = init;
}
function Menu(instance,name,style,subMenus) {
    this.instance = instance;
    this.name = name;
    this.style = style;
    this.subMenus = subMenus;

}
function AddTriangle(attr) {
    attr.html( "<div class='out'> <div class='in'> </div> </div>");
}
function RemoveTriangle(attr) {
    attr.html( "");
}

Menu.prototype.getComponent = function() {
    return  ("<div id='"+this.instance+"' onmousemove='"+this.instance+".onActive()' onmouseout='"+this.instance+".onLeave()' onclick='"+this.instance+".onActive()' " +
    " class='"+this.style+"'>"+this.name+
    "</div>");
}
Menu.prototype.onActive=function() {
    $("#menu_content").html("");
    $("#submenu").html("");

    if($("#menu_content").hasClass("hide")) {
        $("#menu_content").removeClass("hide");
    }if($("#submenu").hasClass("hide")) {
        $("#submenu").removeClass("hide");
    }
    if($(".main_menus_background").hasClass("hide")) {
        $(".main_menus_background").removeClass("hide");
    }
    $("#menu_content").addClass("show");
    $("#submenu").addClass("show");
    $(".main_menus_background").addClass("show");

    var submenu_html = "";
    if(!$.isArray(this.subMenus)){
        return;
    }
    for (var i=0;i<this.subMenus.length;i++) {
        submenu_html+= this.subMenus[i].getComponent();
    }

    if($.isFunction(this.subMenus[0].onActive))  {
        this.subMenus[0].onActive();

    }
    $("#submenu").html(submenu_html);
    $(".submenu").css("opacity","1");
    $(".submenu_active").removeClass("submenu_active");
    $("#"+this.subMenus[0].instance).addClass("submenu_active");
    switch (this.instance ) {
        case "design":
            AddTriangle($("#design_t"));
            RemoveTriangle($("#shop_t"));
            RemoveTriangle($("#community_t"));
            break;
        case "shop" :
            RemoveTriangle($("#design_t"));
            AddTriangle($("#shop_t"));
            RemoveTriangle($("#community_t"));
            break;
        case  "community":
            RemoveTriangle($("#design_t"));
            RemoveTriangle($("#shop_t"));
            AddTriangle($("#community_t"));
            break;
        default:
            break;
    }
}


Menu.prototype.onLeave=function() {
    $("#"+this.instance+" .triangle_body").css("display","none");
}


SubMenu.prototype.getComponent = function() {
    if(this.subMenus) {
        return ("<div id='"+this.instance+"' onmousemove='"+this.instance+".onActive()'  onclick='"+this.instance+".onActive()' " +
        " class='"+this.style+"''> "+this.name+"<span class='submenu_more icon-angle-right'></span></div>");
    }
    else {
        return ("<div id='"+this.instance+"' onmousemove='"+this.instance+".onActive()'  onclick='"+this.instance+".onActive()' " +
        " onmouseout='"+this.instance+".onLeave()'"+
        " class='"+this.style+"'> <a href='"+this.url+"'>"+this.name+"</a></div>");
    }
}
SubMenu.prototype.onActive=function() {
    $(".submenu_active").removeClass("submenu_active");
    $("#"+this.instance).addClass("submenu_active");

    if(this.subMenus) {
        var sub_html="";
        for (var i =0;i<this.subMenus.length;i++) {
            var item =  this.subMenus[i];
            var item_main = makeDiv(this.subMenus[i].style,item.name);
            var html = "<div class='col-md-4'>"+item_main;
            if(item.subMenus)  {
                for(var j=0;j<item.subMenus.length;j++) {
                    var subItem = item.subMenus[j];
                    html+=makeDiv(subItem.style,subItem.name);
                }
                html += "</div>";
            }
            sub_html +=html;
        }
        var submenus = makeDiv("row",sub_html);
        $("#menu_content").html(submenus+"</div>");
    }
    else if (this.content){
        $("#menu_content").html(this.content.getComponent());
    }
}
SubMenu.prototype.onLeave=function() {
    //if($("#"+this.instance).hasClass("submenu_active")) {
    //    $("#"+this.instance).removeClass("submenu_active");
    //}
    //$("#"+this.instance).addClass("submenu_normal");

}
