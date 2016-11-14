


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

function deleteProduct() {
    var products = StorageUtil.get("carts_products");
    for(var i=0;i<products;i++) {
        //if(products.instance == )
    }
}
Product.prototype.getComponent = function() {
    var _html = "";
    if(this.count>0)
    {
        _html+="" +
            "<div id="+this.instance+" class='row cart_label_prods_item'>" +
            "<div class='col-md-2 cart_label_count cart_label_count_item'><span>"+this.count+" X</span></div>" +
            "<div class='col-md-8 cart_label_content '>" +
            "<div class='cart_label_content_item_name'>"+this.name+
            "<span style='float: right'>"+this.amount+" $</span>"+
            "</div>" +
            "<div class='cart_label_content_item_material'>"+this.material+"</div>" +
            "</div>" +
            "<div class='col-md-2 cart_label_operation'>"+
            //"<img onclick='deleteProduct("+this+")' src='../assets/images/header/remove button.png'/>"+
            "<img id="+this.instance+"'_delete' onclick='"+this.instance+".delete()' src='../../assets/images/header/remove button.png'/>"+
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
        count += this.prods[i].count;
        amounts+=(this.prods[i].amount*this.prods[i].count);
    }
    if(count==0) {
        prods_html+="<div class='cart_label_prods_empty'>Empty</div>";
    }
    var _html ="";
    _html+="<div class='row cart_label_row cart_label_row_total'>" +
        "<div class='col-md-2 cart_label_count cart_label_count_total'><span><span>"+count+"</span>" +
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
        count += this.prods[i].count;
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
function changeCartCountHtml() {
    $("#cart_count").html(cart.getCount());
    $("#cart_count_md").html(cart.getCount());
    $("#cart_label_detail").html(cart.getComponent())

}

function changeCartDetail() {
    for(var i=0;i<_products.length;i++) {
        //if(_products[i].instance ==cart.)
    }
}
function deleteProduct() {
    changeCartCountHtml()

    setProducts()

    initProducts()
}


var prod1 = new Product("prod1","Object name","Material",1,10,deleteProduct);
var prod2 =  new Product("prod2","Object name2","Material",1,9,deleteProduct)
var products = new Array(
    prod1,prod2
);

var cart = new Carts("Objects in your cart",products)

function closeCarts() {
    //cart.prods=[]
    //changeCartCountHtml()
    //$("#cart_label_detail").html("");
    $(".cart_label").css("display","none")
}

function setProducts() {
    var _products = [];
    var p1 = {id:"prod1",name:"Object name",material:"Material",count:1,price:10,onDelete:deleteProduct}
    var p2 = {id:"prod2",name:"Object name2",material:"Material",count:1,price:9,onDelete:deleteProduct}
    _products.push(p1)
    _products.push(p2)
    //var ps = cart.prods;
    //if($.isArray(ps)) {
    //    for(var i=0;i<ps.length;i++) {
    //        var p = ps[i];
    //
    //        if(p.count>0) {
    //            var _p={};
    //            _p.id = p.instance;
    //            _p.name = p.name;
    //            _p.material = p.material;
    //            _p.count = p.count;
    //            _p.price = p.amount;
    //            _products.push(_p)
    //        }
    //
    //    }
    //}
    //console.log("  set   "+ $.isArray(_products))

    StorageUtil.set("carts_products",JSON.stringify(_products));
}
function initProducts() {
    var prods = JSON.parse(StorageUtil.get("carts_products"))
    var _html=""
    var _count = 0;
    var _total_price = 0;
    if(!$.isArray(prods)||prods.length<=0) {
        _html="<div class='cart_detail_empty'>Empty, Go Shopping!</div>"
    }
    for( var i=0;i<prods.length;i++) {
        var p = prods[i];
        _count+=p.count;
        _total_price += p.count* p.price
        console.log("  >>>. "+p+p.name+ p.material)
       _html +="<div id='"+ p.id +"_mb' class='row cart_detail_mb  cart_detail_prod_item'>"+
           "<div class='cart_detail_prod_img'>"+
           "<img src='../../assets/images/cart/cartImg.png' />"+
           "</div>"+
           "<div class='cart_detail_content'>"+

           "<div class='cart_detail_prod_item_name_material'>"+
           "<div class='cart_detail_prod_item_name'>"+ p.name+"</div>"+
           "<div class='cart_detail_prod_item_material'>"+ p.material +"</div>"+
           "</div>"+
           "<div class='cart_detail_price'>" +p.price+
       "</div>"+
       "<div class='cart_detail_operation'>"+
           "<span  class='glyphicon glyphicon-remove'></span>"+
           "<div class='cart_detail_type_number'>"+
           "<div class='cart_detail_btn_type_number'>"+
           "<input  id='"+p.id+"_mb_input' class='product_count' type='text' placeholder='Type a number' " +
           " value='"+ p.count+"'" +
           "onkeyup=\"this.value=this.value.replace(/\\D/gi,"+"''"+")\"/>"+
           "<a class='btn_update' id='"+p.id+"_mb_update'>UPDATE</a>"+
           "</div>"+
           "</div>"+
           "</div>"+
           "</div>"+
           "</div>"+

           "<div id='"+ p.id +"_pc' class='row cart_detail_pc cart_detail_prod_item'>"+
           "<div class='cart_detail_col_0'>"+
           "<div class='cart_detail_prod_img'>"+
           "<img src='../../assets/images/cart/cartImg.png' />"+
           "</div>"+
           "<div class='cart_detail_prod_item_name_material'>"+
           "<div class='cart_detail_prod_item_name'>"+ p.name+"</div>"+
       "<div class='cart_detail_prod_item_material'>"+ p.material+"</div>"+
           "</div>"+
           "</div>"+
           "<div class='cart_detail_col_1'>"+
           p.price+
       "</div>"+
       "<div class='cart_detail_col_2'>"+
           "<div class='cart_detail_btn_type_number'>"+
           "<input id='"+p.id+"_pc_input' class='product_count' type='text' placeholder='Type a number'" +
           " value='"+ p.count+"'" +
           " onkeyup=\"this.value=this.value.replace(/\\D/gi,"+"''"+")\" />"+
           "<a class='btn_update' id='"+p.id+"_pc_update'>UPDATE</a>"+
           "</div>"+
           "</div>"+
           "<div class='cart_detail_col_3'>"+
           p.price+
       "</div>"+
       "<div class='cart_detail_col_4'>"+
           "<span  class='glyphicon glyphicon-remove'></span>"+
           "</div>"+
           "</div>"
    }
    $("#cart_detail_prod").html(_html)
    $("#cart_detail_total_count").html("Item("+_count+") Total Price");
    $("#cart_detail_price").html(_total_price+" $");
}