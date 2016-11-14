var footer_create = new SubMenu("footer_create","Create and Design","","footer_menus_menus_first");

var footer_startDesign = new SubMenu("footer_startDesign","Starting Design","","footer_menus_menus_second");
var footer_myLab = new SubMenu("footer_myLab","My Lab","#","footer_menus_menus_second");
var footer_materials = new SubMenu("footer_materials","Materials","#","footer_menus_menus_second");
footer_create.subMenus = new Array(footer_startDesign, footer_myLab, footer_materials);
footer_create.getComponent=function() {
    //var footer_first = "<div class='"+this.style+"'>"+this.name+"</div>";
    //if(f)
}


var footer_shop = new SubMenu("footer_shop","Discover and shop","","footer_menus_menus_first");
var footer_shopAll = new SubMenu("footer_shopAll","Shop all categories","#","footer_menus_menus_second");
var footer_home = new SubMenu("footer_home","Home","#","footer_menus_menus_second");
var footer_jewerly = new SubMenu("footer_jewerly","Jewerly","#","footer_menus_menus_second");
var footer_art = new SubMenu("footer_art","Art","#","footer_menus_menus_second");
var footer_accessories = new SubMenu("footer_accessories","Accessories","#","footer_menus_menus_second");
footer_shop.subMenus =  new Array(footer_shopAll, footer_home, footer_jewerly, footer_art, footer_accessories);

var footer_community = new SubMenu("footer_community", "Community", "","footer_menus_menus_first");
var footer_blog = new SubMenu("footer_blog","Blog","#","footer_menus_menus_second");
var footer_events = new SubMenu("footer_events","Events","#","footer_menus_menus_second");
var footer_jobs = new SubMenu("footer_jobs","Jobs for Designers","","footer_menus_job");
footer_community.subMenus= new Array(footer_blog,footer_events,footer_jobs);

var footer_us = new SubMenu("footer_us","Get to Know us","","footer_menus_menus_first");
var footer_about = new SubMenu("footer_about","About","","footer_menus_menus_second");
var footer_find = new SubMenu("footer_find","Find us","","footer_menus_menus_second");
var footer_concat = new SubMenu("footer_concat","Concat us","","footer_menus_menus_second");
var footer_careers = new SubMenu("footer_careers","Careers","","footer_menus_menus_second");
footer_us.subMenus= new Array(footer_about,footer_find,footer_concat,footer_careers);

var footer_follow = new SubMenu("footer_follow","Follow us","","footer_menus_menus_first");
var footer_weibo = new SubMenu("footer_weibo","Weibo","","footer_menus_flollow_sub");
var footer_wechat = new SubMenu("footer_wechat","Wechat","","footer_menus_flollow_sub");
footer_follow.subMenus= new Array(footer_weibo,footer_wechat);


function getFooterMenuHtml(menufirst) {
    var footer_first_html = makeDiv(menufirst.style,menufirst.name);
    if($.isArray(menufirst.subMenus)) {
        for (var i=0;i<menufirst.subMenus.length;i++) {
            var item = menufirst.subMenus[i];
            footer_first_html+= makeDiv(item.style,item.name);
        }
    }
    return makeDiv("col-md-3",makeDiv("footer_menus_col",footer_first_html));

}
function getFooterFollowHtml(menufirst) {
    var footer_first_html = makeDiv(menufirst.style,menufirst.name);
    if($.isArray(menufirst.subMenus)) {
        for (var i=0;i<menufirst.subMenus.length;i++) {
            var item = menufirst.subMenus[i];
            footer_first_html+= makeDiv(item.style,item.name);
        }
    }
    return footer_first_html;

}

function getFooterMenus() {
    return getFooterMenuHtml(footer_create)
        +getFooterMenuHtml(footer_shop)
        +getFooterMenuHtml(footer_community)
        +getFooterMenuHtml(footer_us);
}
function getFooterFollow() {
    return getFooterFollowHtml(footer_follow);
}


