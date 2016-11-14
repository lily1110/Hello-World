function resizeSubmenusBg() {
    if($(window).width()< 1600) {
        $(".submenus_background").css("height","1.5625rem").css("display","block");
        $("#split_line").css("height","1.5625rem");
    }
    else {
        $(".submenus_background").css("height","1.875rem").css("display","block");
        $("#split_line").css("height","1.875rem");
    }
}
function setEveryTop() {
    var every_top = ($("#header_main_img").height()*0.5)+"px";
    console.log(every_top)
    $("#header_main_img_every").css("top",every_top);
}
function initHeader() {
    $("#nav-bar").html(design.getComponent()+shop.getComponent()+community.getComponent());
    $(".submenus_background").css("height","0px").css("display","none");
    //$("#cart_label_detail").html(cart.getComponent())
    //$("#cart_count").html(cart.getCount());
    changeCartCountHtml()
    $(".cart_label").css("display","none")
    $("#whole_menu").mouseout(function() {
        if($("#menu_content").hasClass("show")) {
            $("#menu_content").removeClass("show");
        }
        if($("#submenu").hasClass("show")) {
            $("#submenu").removeClass("show");
        }
        $("#menu_content").addClass("hide");
        $("#submenu").addClass("hide");
        $(".submenus_background").css("height","0px");
        $(".submenus_background").css("display","none");
    }).mousemove(function() {
        if($("#menu_content").hasClass("hide")) {
            $("#menu_content").removeClass("hide");

        }
        if($("#submenu").hasClass("hide")) {
            $("#submenu").removeClass("hide");

        }
        $("#menu_content").addClass("show");
        $("#submenu").addClass("show");
        if($("#submenu").children().length>0) {
            resizeSubmenusBg();
        }

    });

    $(".flexnav").flexNav();
    setEveryTop();
    $(window).resize(function() {
        setEveryTop();
    });

    $(".shopping_cart_hover").mouseout(function() {
        $(".cart_label").css("display","none")
    }).mousemove(function() {
        $(".cart_label").css("display","block")

    });
}