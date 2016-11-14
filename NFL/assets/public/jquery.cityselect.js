/*
Ajax 三级省市联动
http://code.ciaoca.cn/
日期：2012-7-18

settings 参数说明
-----
url:省市数据josn文件路径
prov:默认省份
city:默认城市
dist:默认地区（县）
nodata:无数据状态
required:必选项
------------------------------ */
(function($){
	$.fn.citySelect=function(settings){
		if(this.length<1){return;};

		// 默认值
		settings=$.extend({
			url:"../../assets/public/city.min.js",
			prov:null,
			city:null,
			dist:null,
			nodata:null,
			required:true
		},settings);

		var box_obj=this;
		var prov_obj=box_obj.find(".prov");
		var city_obj=box_obj.find(".city");
		var dist_obj=box_obj.find(".dist");
		var prov_val=settings.prov;
		var city_val=settings.city;
		var dist_val=settings.dist;
		window.prov_val = prov_val;
		window.city_val = city_val;
		window.dist_val = dist_val;
		var select_prehtml=(settings.required) ? "" : "<option value=''>请选择</option>";
		var city_json;

		// 赋值市级函数
		var cityStart=function(prov){
			var prov_id=prov || prov_obj.get(0).selectedIndex ;
			if(!settings.required){
				prov_id--;
			};
			city_obj.empty().attr("disabled",true);
			dist_obj.empty().attr("disabled",true);

			if(prov_id<0||typeof(city_json.citylist[prov_id].c)=="undefined"){
				if(settings.nodata=="none"){
					city_obj.css("display","none");
					dist_obj.css("display","none");
					$(".city_select").css("display","none");
					$(".dist_select").css("display","none");
				}else if(settings.nodata=="hidden"){
					city_obj.css("visibility","hidden");
					dist_obj.css("visibility","hidden");
					$(".city_select").css("visibility","hidden");
					$(".dist_select").css("visibility","hidden");
				};
				return;
			};
			$(".city_select").css("display","block");
			$(".dist_select").css("display","block");
			// 遍历赋值市级下拉列表
			temp_html=select_prehtml,tmp_html='';
			$.each(city_json.citylist[prov_id].c,function(i,city){
				temp_html+="<option value='"+city.n+"'>"+city.n+"</option>";
				tmp_html+="<li tip='"+i+"' value='"+city.n+"'><a href='javascript:;' selectid = '"+city.n+"'>"+city.n+"</a></li>";
			});
			city_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
			$(".city_select ul").html(tmp_html);
			$.divselect(".city_select",".city_option",".city_choose");
			distStart();
		};

		// 赋值地区（县）函数
		var distStart=function(prov,city){
			var prov_id=prov || prov_obj.get(0).selectedIndex ;
			var city_id=city || city_obj.get(0).selectedIndex ;
			if(!settings.required){
				prov_id--;
				city_id--;
			};
			dist_obj.empty().attr("disabled",true);

			if(prov_id<0||city_id<0||typeof(city_json.citylist[prov_id].c[city_id].a)=="undefined"){
				if(settings.nodata=="none"){
					dist_obj.css("display","none");
					$(".dist_select").css("display","none");
				}else if(settings.nodata=="hidden"){
					dist_obj.css("visibility","hidden");
					$(".dist_select").css("visibility","none");
				};
				return;
			};
			$(".dist_select").css("display","block");

			// 遍历赋值市级下拉列表
			temp_html=select_prehtml,tmp_html='';;
			$.each(city_json.citylist[prov_id].c[city_id].a,function(i,dist){
				temp_html+="<option value='"+dist.s+"'>"+dist.s+"</option>";
				tmp_html+="<li tip='"+i+"' value='"+dist.s+"'><a href='javascript:;' selectid = '"+dist.s+"'>"+dist.s+"</a></li>";
			});
			$(".dist_select ul").html(tmp_html);
			$.divselect(".dist_select",".dist_option","dist_choose");
			dist_obj.html(temp_html).attr("disabled",false).css({"display":"","visibility":""});
		};

		var init=function(){
			// 遍历赋值省份下拉列表
			temp_html=select_prehtml,tmp_html='';
			$.each(city_json.citylist,function(i,prov){
				temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
				tmp_html+="<li tip='"+i+"' value='"+prov.p+"'><a href='javascript:;' selectid = '"+prov.p+"'>"+prov.p+"</a></li>";
			});
			prov_obj.html(temp_html);
			$(".prov_select ul").html(tmp_html);
			$.divselect(".prov_select",".prov_option",".prov_choose");

			if(window.prov_val){
				cityStart(parseInt($("input[name=prov_choose]").val()));
			}
			if(window.city_val){
				distStart(parseInt($("input[name=prov_choose]").val()),parseInt($("input[name=city_choose]").val()));
			}

			// 若有传入省份与市级的值，则选中。（setTimeout为兼容IE6而设置）
			setTimeout(function(){
				if(settings.prov!=null){
					prov_obj.val(settings.prov);
					cityStart();
					setTimeout(function(){
						if(settings.city!=null){
							city_obj.val(settings.city);
							distStart();
							setTimeout(function(){
								if(settings.dist!=null){
									dist_obj.val(settings.dist);
								};
							},1);
						};
					},1);
				};
			},1);

			// 选择省份时发生事件
			prov_obj.bind("change",function(){
				cityStart();
			});

			// 选择市级时发生事件
			city_obj.bind("change",function(){
				distStart();
			});

			$("input[name=prov_choose]").change(function () {
				$(".city_select ul").html('');
				$(".dist_select ul").html('');
				$(".city_select span").html('city');
				$(".dist_select span").html('dist');
				cityStart(parseInt($("input[name=prov_choose]").val()));
			});

			$("input[name=city_choose]").change(function () {
				$(".dist_select ul").html('');
				$(".dist_select span").html('dist');
				distStart(parseInt($("input[name=prov_choose]").val()),parseInt($("input[name=city_choose]").val()));
			});
		};

		// 设置省市json数据
		if(typeof(settings.url)=="string"){
			$.getJSON(settings.url,function(json){
				city_json=json;
				init();
			});
		}else{
			city_json=settings.url;
			init();
		};
	};
})(jQuery);