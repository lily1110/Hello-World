/**
 * Created by lilili on 16/5/13.
 */
function initNavBar() {
    $("#nav-bar").html(design.getComponent()+shop.getComponent()+community.getComponent());
}
var design = new Menu("design","Design","col-md-4 nav_bar_menu",initNavBar);
var shop = new Menu("shop","Shop","col-md-4 nav_bar_menu",initNavBar);
var community = new Menu("community", "Community", "col-md-4 nav_bar_menu",initNavBar);
shop.getComponent = function() {
    return  ("<div id='"+this.instance+"' onmousemove='"+this.instance+".onActive()' onmouseout='"+this.instance+".onLeave()' onclick='"+this.instance+".onActive()' " +
    " class='"+this.style+"' style='padding-left: 20px'>"+this.name+
    "</div>");
}

var startDesign = new SubMenu("startDesign","Starting Design","www.baidu.com","submenu");
var myLab = new SubMenu("myLab","My Lab","#","submenu");
var materials = new SubMenu("materials","Materials","#","submenu");
var subDesignMenus = new Array(startDesign, myLab, materials);
design.subMenus = subDesignMenus;


var categories = new SubMenu("categories","Shop all categories","#","submenu");
categories.content = new Content("DISCOVER OUR COLLECTIONS!",
    "Find out your style",
    "What you need, just different, just unique!",
    "menu_brief");


var home = new SubMenu("home","Home","#","submenu");
var jewerly = new SubMenu("jewerly","Jewerly","#","submenu");
var art = new SubMenu("art","Art","#","submenu");
var accessories = new SubMenu("accessories","Accessories","#","submenu");
var shop_submenus = new Array(categories, home, jewerly, art, accessories);
shop.subMenus = shop_submenus;

var blog = new SubMenu("blog","Blog","#","submenu");
var events = new SubMenu("events","Events","#","submenu");
var jobs = new SubMenu("jobs","Jobs for Designers","#","submenu");
var community_subMenus = new Array(blog,events,jobs);
community.subMenus=community_subMenus;
blog.content = new Content(
    "JOIN THE COMMUNITY!",
    "Share your expericences,value your talent!",
    "Create your own network and enjoy it!",
    "menu_brief"
);


var startDesign_content = new Content("START DESIGN!",
    "Create your own ideas",
    "We'll provide you a quote!",
    "menu_brief");
startDesign.content = startDesign_content;
startDesign.content.button = {"name":"Upload a 3D Model","url":"#","style":"menu_brief_button"}

var myLab_content = new Content("OPEN YOUR SHOP!",
    "We'll help your masterpieces globally!"+
    "",
    "Create your personal showcase and start selling now!",
    "menu_brief");
myLab.content = myLab_content;
myLab.content.button = {"name":"Start","url":"#","style":"menu_brief_button"}


var materials_metals = new SubMenu("materials_metals","Metals","#","sub3style");
var materials_plastics = new SubMenu("materials_plastics","Plastics","#","sub3style");
var materials_ceramics = new SubMenu("materials_ceramics","Ceramics","#","sub3style");
var materials_subs = new Array(materials_metals,materials_plastics,materials_ceramics);
materials.subMenus = materials_subs;

var metal_plated = new SubMenu("metal_plated","Precious Plated","#","sub4style");
var metal_platinum = new SubMenu("metal_platinum","Platinum","#","sub4style");
var metal_gold = new SubMenu("metal_gold","Gold","#","sub4style");
var metal_silver = new SubMenu("metal_silver","Silver","#","sub4style");
var metal_brass = new SubMenu("metal_brass","Brass","#","sub4style");
var metal_bronze = new SubMenu("metal_bronze","Bronze","#","sub4style");
var metal_vastable = new SubMenu("metal_vastable","Castable Wax","#","sub4style");
var metal_aluminum = new SubMenu("metal_aluminum","Aluminum","#","sub4style");

var metal_subs = new Array(
    metal_plated,
    metal_platinum,
    metal_gold,
    metal_silver,
    metal_brass,
    metal_bronze,
    metal_vastable,
    metal_aluminum
);
materials_metals.subMenus = metal_subs;

var plastics_strong = new SubMenu("plastics_strong","Strong&Flexible","#","sub4style");
var plastics_metallic = new SubMenu("plastics_metallic","Metallic","#","sub4style");
var plastics_frosted = new SubMenu("plastics_frosted","Frosted Detail","#","sub4style");
var plastics_acrylic = new SubMenu("plastics_acrylic","Acrylic","#","sub4style");
var plastics_elasto = new SubMenu("plastics_elasto","Elasto","#","sub4style");
var plastics_hi = new SubMenu("plastics_hi","Hi-Def Acrylate","#","sub4style");
var plastics_subs = new Array(
    plastics_strong,
    plastics_metallic,
    plastics_frosted,
    plastics_acrylic,
    plastics_elasto,
    plastics_hi
 );
materials_plastics.subMenus = plastics_subs;

var ceramisc_procelain = new SubMenu("ceramisc_procelain","Porcelain","#","sub4style");
materials_ceramics.subMenus = new Array(ceramisc_procelain);



var home_home = new SubMenu("home_home","Home","#","sub3style");
home.subMenus = new Array(home_home);

var home_lightning = new SubMenu("home_lightning","Lightning","#","sub4style");
var home_furniture = new SubMenu("home_furniture","Furniture","#","sub4style");
var home_dining = new SubMenu("home_dining","Dining","#","sub4style");
var home_accessories = new SubMenu("home_accessories","Accessories","#","sub4style");
var home_other = new SubMenu("home_other","Other","#","sub4style");
home_home.subMenus = new Array(
    home_lightning,home_furniture,home_dining,home_accessories,home_other
);

var jewerly_jewerly = new SubMenu("jewerly_jewerly","Jewerly","#","sub3style");
jewerly_jewerly.subMenus = new Array(
    new SubMenu("jewerly_rings","Rings","#","sub4style"),
    new SubMenu("jewerly_pendants","Pendants","#","sub4style"),
    new SubMenu("jewerly_necklaces","Necklaces","#","sub4style"),
    new SubMenu("jewerly_earrings","Earrings","#","sub4style"),
    new SubMenu("jewerly_cufflinks","Cufflinks","#","sub4style"),
    new SubMenu("jewerly_bracelets","Bracelets","#","sub4style"),
    new SubMenu("jewerly_other","Other","#","sub4style")
);
jewerly.subMenus=new Array(jewerly_jewerly);

var art_art = new SubMenu("art_art","Art","#","sub3style");
art_art.subMenus = new Array(
    new SubMenu("","Mathematical","#","sub4style"),
    new SubMenu("","Memes","#","sub4style"),
    new SubMenu("","Sculptures","#","sub4style"),
    new SubMenu("","Other","#","sub4style")
);
art.subMenus=new Array(art_art);

var access_access = new SubMenu("access_accss","Accessories","#","sub3style");
access_access.subMenus = new Array(
    new SubMenu("","Wearable","#","sub4style"),
    new SubMenu("","Electronic","#","sub4style"),
    new SubMenu("","Tools","#","sub4style"),
    new SubMenu("","Other","#","sub4style")
);
accessories.subMenus=new Array(access_access);

