function  ColorMaterial(imgUrl) {
    this.imgUrl = imgUrl
}
ColorMaterial.prototype.getComponent = function(i) {

    if(i==0){
        var id = 'radio-'+(i+1)+'-set';
        var _html= "<span class='design_choose_item'> <input type='radio' id='"+id+"' name='radio-set' class='regular-radio' checked />" +
        "<label for='"+id+"'><img src='"+this.imgUrl+"'/></label>" +
        "</span>";
    }else{
        var id = 'radio-'+(i+1)+'-set';
            var _html= "<span class='design_choose_item'> <input type='radio' id='"+id+"' name='radio-set' class='regular-radio' />" +
            "<label for='"+id+"'><img src='"+this.imgUrl+"' /></label>" +
            "</span>";
    }
    
    return _html;
}
var colorMaterialList = new Array(
    new ColorMaterial("../../assets/images/color_material/1.png"),
    new ColorMaterial("../../assets/images/color_material/2.png"),
    new ColorMaterial("../../assets/images/color_material/3.png"),
    new ColorMaterial("../../assets/images/color_material/4.png"),
    new ColorMaterial("../../assets/images/color_material/5.png"),
    new ColorMaterial("../../assets/images/color_material/6.png"),
    new ColorMaterial("../../assets/images/color_material/7.png"),
    new ColorMaterial("../../assets/images/color_material/8.png"),
    new ColorMaterial("../../assets/images/color_material/9.png"),
    new ColorMaterial("../../assets/images/color_material/11.png"),
    new ColorMaterial("../../assets/images/color_material/12.png"),
    new ColorMaterial("../../assets/images/color_material/13.png"),
    new ColorMaterial("../../assets/images/color_material/14.png"),
    new ColorMaterial("../../assets/images/color_material/15.png"),
    new ColorMaterial("../../assets/images/color_material/16.png"),
    new ColorMaterial("../../assets/images/color_material/17.png"),
    new ColorMaterial("../../assets/images/color_material/18.png"),
    new ColorMaterial("../../assets/images/color_material/19.png"),
    new ColorMaterial("../../assets/images/color_material/20.png"),
    new ColorMaterial("../../assets/images/color_material/21.png"),
    new ColorMaterial("../../assets/images/color_material/22.png"),
    new ColorMaterial("../../assets/images/color_material/23.png"),
    new ColorMaterial("../../assets/images/color_material/24.png"),
    new ColorMaterial("../../assets/images/color_material/25.png"),
    new ColorMaterial("../../assets/images/color_material/26.png"),
    new ColorMaterial("../../assets/images/color_material/27.png"),
    new ColorMaterial("../../assets/images/color_material/28.png"),
    new ColorMaterial("../../assets/images/color_material/29.png"),
    new ColorMaterial("../../assets/images/color_material/30.png"),
    new ColorMaterial("../../assets/images/color_material/31.png"),
    new ColorMaterial("../../assets/images/color_material/32.png"),
    new ColorMaterial("../../assets/images/color_material/33.png"),
    new ColorMaterial("../../assets/images/color_material/34.png"),
    new ColorMaterial("../../assets/images/color_material/35.png"),
    new ColorMaterial("../../assets/images/color_material/36.png"),
    new ColorMaterial("../../assets/images/color_material/37.png"),
    new ColorMaterial("../../assets/images/color_material/38.png"),
    new ColorMaterial("../../assets/images/color_material/39.png"),
    new ColorMaterial("../../assets/images/color_material/40.png"),
    new ColorMaterial("../../assets/images/color_material/41.png"),
    new ColorMaterial("../../assets/images/color_material/42.png")
  )

function getColorMaterialListView() {
    var _html = "";
    for (var i=0;i<colorMaterialList.length;i++) {
        _html+=colorMaterialList[i].getComponent(i);
    }
    return _html
}