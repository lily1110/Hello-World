document.write("<script type=\"text/javascript\" src=\"../../assets/public/storage_util.js\"></script>");


Array.prototype.remove = function(p) {
    if(p=null||p.id==""){return false;}
    for(var i = 0;i<this.length;i++) {
        if(this.id == p.id) {
            this.splice(i,1);
            return this
        }
    }
    return this
}

var _products = [];
var p1 = {id:"prod1",name:"Object name",material:"Material",count:1,price:10,onDelete:deleteProduct}
var p2 = {id:"prod2",name:"Object name2",material:"Material",count:1,price:9,onDelete:deleteProduct}
_products.push(p1);
_products.push(p2);
if(StorageUtil.get("carts_products")==null){
    StorageUtil.set("carts_products",JSON.stringify(_products));
}
//StorageUtil
var getProdById = function(_id) {
    var products = JSON.parse(StorageUtil.get("carts_products"))
    for(var i=0; i< products.length;i++) {
        var p = products[i];
        if(p.id == _id) {
            return p
        }
    }
}
var updateProducts = function(prod){
    var products = JSON.parse(StorageUtil.get("carts_products"))
    if($.isArray(products)) {
        if(prod.count <= 0) {
            products.remove(prod)
        }
        for(var i =0 ;i< products.length;i++) {
            var p = products[i]
            if(p.id == prod.id) {
                p.count = prod.count;
                break;
            }
        }
        StorageUtil.set("carts_products", JSON.stringify(products))
        changeCartHtml()
    }
    //products.remove(p)
    //p.count = count
    //products.push(p)
    //StorageUtil.set("carts_products", JSON.stringify(products))
}

var removeFromCart = function(e) {
    console.log(" remove from cart "+e)
    var v_instance = e.id;
    var tags = v_instance.split("_");
    console.log("      "+tags[0])
    var p = getProdById(tags[0])
    p.count = 0
    updateProducts(p)
    //delete product and reset StorageUtil.carts_products
    //var products = JSON.parse(StorageUtil.get("carts_products"))
    //products.remove(p)
    //StorageUtil.set("carts_products", JSON.stringify(products))
    //changeCartHtml()
}

var updateProductCount = function(e) {
    var v_instance = e.id;
    var tags = v_instance.split("_");
    var id = tags[0];
    var device = tags[1];
    var inputId = id+"_"+device+"_input";
    console.log(inputId);
    var count = $("#"+inputId).val();
    if(count>9999||count<=0) {
        var nowTime = new Date().getTime();
        var clickTime = $(this).attr("ctime");
        if (clickTime != 'undefined' && (nowTime - clickTime < 2000)) {
            return false;
        } else {
            $(this).attr("ctime", nowTime);
            $(".show-error").html("please enter valid count ( 0 < count < 9999 )");
            if ($('.show-error')[0].innerHTML != '') {
                $('.show-error').fadeIn().delay(2000).fadeOut(500);
            }
        }
    }  else {
        var p =  getProdById(id);
        p.count = count;
        updateProducts(p);
        //var products = JSON.parse(StorageUtil.get("carts_products"))
        //products.remove(p)
        //p.count = count
        //products.push(p)
        //StorageUtil.set("carts_products", JSON.stringify(products))
        //changeCartHtml()
    }
}

//初始化cart_detail.html页面上的商品显示
var initProducts=function() {
    var prods = JSON.parse(StorageUtil.get("carts_products"))
    var _html=""
    var _count = 0;
    var _total_price = 0;
    if(!$.isArray(prods)||prods.length<=0) {
        _html="<div class='cart_detail_empty'>Empty, Go Shopping!</div>"
    }
    for( var i=0;i<prods.length;i++) {
        var p = prods[i];
        _count += parseInt(p.count);
        _total_price += p.count* p.price
        console.log("  >>>. "+p+p.name+ p.material)
        _html +="<div id='"+ p.id +"_mb' class='row mb'>"+
            "<div class='col-md-9 col-xs-9 col-sm-9'  style='padding-right: 0'>" +
            "<div class='cart_detail_prod_img'>"+
            "<img src='../../assets/images/cart_details/cartImg.png' />"+

            "</div>"+
            "<div class=''>"+
            "<div class='cart_detail_prod_item_name'>"+ p.name+"</div>"+
            "<div class='cart_detail_prod_item_material'>"+ p.material +"</div>"+
            "<div class='cart_detail_operation'>"+
            "<div class='cart_detail_type_number'>"+
            "<div class='cart_detail_btn_type_number'>"+
            "<input  id='"+p.id+"_mb_input' class='product_count' type='text' placeholder='Type a number' " +
            " value='"+ p.count+"'" +
            "onkeyup=\"this.value=this.value.replace(/\\D/gi,"+"''"+")\"/>"+

            "<div class='btn_update' id='"+p.id+"_mb_update' onclick='updateProductCount(this)'>UPDATE</div>"+
            "</div>"+
            "</div>"+

            "</div>"+
            "</div>"+
            "</div>"+
            "<div class='col-md-3 col-xs-3 col-sm-3 cart_mb_right' style=\"position: relative;text-align: right; padding-left: 0\">"+

            "<div class='cart_detail_price'>" +p.price+" $"+
            "</div>"+
            "<div class='cartDetail_remove'><span id='"+ p.id+"_cartDetail_mb_remove' onclick='removeFromCart(this)' class='glyphicon glyphicon-remove'></span></div>"+
            "</div>"+
            "</div>"+

            "<div id='"+ p.id +"_pc' class='row cart_detail_pc cart_detail_prod_item'>"+
            "<div class='cart_detail_col_0'>"+
            "<div class='cart_detail_prod_img'>"+
            "<img src='../../assets/images/cart_details/cartImg.png' />"+
            "</div>"+
            "<div class='cart_detail_prod_item_name_material'>"+
            "<div class='cart_detail_prod_item_name'>"+ p.name+"</div>"+
            "<div class='cart_detail_prod_item_material'>"+ p.material+"</div>"+
            "</div>"+
            "</div>"+
            "<div class='cart_detail_col_1'>"+
            p.price+" $"+
            "</div>"+
            "<div class='cart_detail_col_2'>"+
            "<div class='cart_detail_btn_type_number'>"+
            "<input id='"+p.id+"_pc_input' class='product_count' type='text' placeholder='Type a number'" +
            " value='"+ p.count+"'" +
            " onkeyup=\"this.value=this.value.replace(/\\D/gi,"+"''"+")\" />"+
            "<div class='btn_update' id='"+p.id+"_pc_update'  onclick='updateProductCount(this)'>UPDATE</div>"+
            "</div>"+
            "</div>"+
            "<div class='cart_detail_col_3'>"+
            p.price * p.count+" $"+
            "</div>"+
            "<div class='cart_detail_col_4'>"+
            "<span id='"+ p.id+"_cartDetail_pc_remove' onclick='removeFromCart(this)' class='glyphicon glyphicon-remove'></span>"+
            "</div>"+
            "</div>"
    }
    $("#cart_detail_prod").html(_html)
    $("#cart_detail_total_count").html("Item("+_count+") Total Price");
    $("#cart_detail_price").html(_total_price+" $");
}

function Product(instance,name,material,count,amount,onDelete) {
    this.instance = instance;
    this.name = name;
    this.material = material;
    this.count = count;
    this.amount = amount;
    this.onDelete = onDelete;
}

function Carts(name,prods) {
    this.name = name;
    this.prods = prods;
}

Product.prototype.getName = function(){
    s = this.constructor.toString();
    if(s.indexOf('function') == -1){
        return null;
    }else{
        s = s.replace('function','');
        var idx = s.indexOf('(');
        s = s.substring(0, idx);
        s = s.replace(" ", "");
    }
    return s;
}


/*function deleteProduct() {
    var products = StorageUtil.get("carts_products");
    for(var i=0;i<products;i++) {
        //if(products.instance == )
    }
}*/
Product.prototype.getComponent = function() {
    var _html = "";
    if(this.count>0)
    {
        //$(".t").onclick=function(e){
        //    e
        //}
        _html+="" +
            "<div id="+this.instance+" class='row cart_label_prods_item'>" +
            "<div class='col-md-2 cart_label_count cart_label_count_item'><span>"+parseInt(this.count)+" X</span></div>" +
            "<div class='col-md-8 cart_label_content '>" +
            "<div class='cart_label_content_item_name'>"+this.name+
            "<span style='float: right'>"+this.amount+" $</span>"+
            "</div>" +
            "<div class='cart_label_content_item_material'>"+this.material+"</div>" +
            "</div>" +
            "<div class='col-md-2 cart_label_operation'>"+
            //"<img onclick='deleteProduct("+this+")' src='../assets/images/header/remove button.png'/>"+
            "<img id='"+this.instance+"_delete' onclick='removeFromCart(this)' src='../../assets/images/header/remove button.png'/>"+
            //"<img id="+this.instance+"'_delete' onclick='"+this.instance+".delete()' src='../../assets/images/header/remove button.png'/>"+
            "</div>" +
            "</div>";
    }

    return _html;
}

Product.prototype.delete = function() {
    this.count=0;
    if($.isFunction(this.onDelete)) {
        this.onDelete(this)
    }
}

Carts.prototype.getComponent = function() {
    var count = 0;
    var amounts = 0;

    var prods_html="";
    for(var i=0;i<this.prods.length;i++) {
        prods_html+=this.prods[i].getComponent()
        count += parseInt(this.prods[i].count);
        amounts+=(this.prods[i].amount*this.prods[i].count);
    }
    if(count==0) {
        prods_html+="<div class='cart_label_prods_empty'>Empty</div>";
    }
    var _html ="";
    _html+="<div class='row cart_label_row cart_label_row_total'>" +
        "<div class='col-md-2 cart_label_count cart_label_count_total'><span><span>"+parseInt(count)+"</span>" +
        "<span class='cart_label_count_total_x'>X</span></span></div>" +
        "<div class='col-md-8 cart_label_content cart_label_content_total_name'>"+this.name+

        "</div>" +
        "<div class='col-md-2 cart_label_operation'><div class='cart_label_operation_delete'>" +
        "<span onclick='closeCarts()' class='glyphicon glyphicon-remove'></span></div></div>" +
        "</div>";
    var _html_line = "<div class='row  cart_label_line'></div>";
    _html+=_html_line;
    _html+="<div class='row cart_label_row cart_label_row_prods'>" +
        "<div class='col-md-12'>" +
        prods_html +
        "</div>" +
        "</div>";
    //_html+=prods_html;
    _html+=_html_line;

    _html+="<div class='row cart_label_row cart_label_row_check'>" +
        "<div class='col-md-2'></div>" +
        "<div class='col-md-8 cart_label_content'>" +
            "<div class='cart_label_content_item_name cart_label_subtotal'>Subtotal:"+
                "<span style='float: right'>"+amounts+" $</span>"+
            "</div>" +
            "<div class='cart_label_btn'>"+
                "<div class='cart_label_btn_bg'>CHECKOUT</div>"+
            "</div>" +
        "</div>" +
        "<div class='col-md-2'></div>" +
        "</div>";
    return _html;
}

Carts.prototype.getCount = function() {
    var count = 0;
    for(var i=0;i<this.prods.length;i++) {
        count += parseInt(this.prods[i].count);
    }
    return count;
}

Carts.prototype.getAmount = function() {
    var amounts = 0;
    for(var i=0;i<this.prods.length;i++) {
        amounts+=(this.prods[i].amount*this.prods[i].count);
    }
    return amounts;
}
var changeCartCountHtml = function() {
    $("#cart_count").html(cart.getCount());
    $("#cart_count_md").html(cart.getCount());
    $("#cart_label_detail").html(cart.getComponent())

}
//update all about cart data
var changeCartHtml= function () {
    //reset Cart and header's cart
    initCarts()
    // rerender cartDetail.html
    initProducts()

    $("#cart_count").html(cart.getCount());
    $("#cart_count_md").html(cart.getCount());
    $("#cart_label_detail").html(cart.getComponent())
}


function deleteProduct() {
    //changeCartHtml()
    //initProducts()
}



var prod1 = new Product("prod1","Object name","Material",1,10,deleteProduct);
var prod2 =  new Product("prod2","Object name2","Material",1,9,deleteProduct)
var products = new Array(
    prod1,prod2
);

var cart = new Carts("Objects in your cart",products)

function closeCarts() {
    $(".cart_label").css("display","none")
}

//初始化Cart对象 cart
function initCarts() {
    var products = JSON.parse(StorageUtil.get("carts_products"))
    if($.isArray(products)) {
        var cps = []
        for (var i=0;i<products.length;i++) {
            var p = products[i];
            var prod = new Product(p.id, p.name, p.material, p.count, p.price, p.onDelete);
            cps.push(prod)
        }
        cart.prods = cps

    }
}
//初始化header和cartDetail的页面
changeCartHtml()
