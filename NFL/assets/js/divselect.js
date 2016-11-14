jQuery.divselect = function(divselectid,inputselectid,textInput) {
	var selects=$(divselectid);
	var options=$(inputselectid);
	var state=true;
	selects.click(function(){
		if(state){
			if(!($(this).is(":animated"))){
				options.stop(true,true);
				options.slideDown('fast');
			}else{
				options.css("display","none");
			}
			state=false;
		}else{
			if(!($(this).is(":animated"))){
				options.slideUp('fast');
			}else{
				$(this).stop(true,true);
				options.css("display","");
			}
			state=true;
		}
	});
	selects.hover(function(){
			$(this).css("background","#fff");
		},
		function(){
			$(this).css("background","#fff");
		});
	$(divselectid+" li").hover(function(){
			$(this).css("background","-webkit-linear-gradient(left, #381211, #931a1d)").css("background"," -o-linear-gradient(left, #381211, #931a1d)").css("background","-moz-linear-gradient(left, #381211, #931a1d)").css("background","-ms-linear-gradient(left, #381211, #931a1d)").css("background","linear-gradient(left, #381211, #931a1d);");
			$(this).find("a").css("color","#fff");
		},
		function(){
			$(this).css("background","#eaeaea");
			$(this).find("a").css("color","#000");
		});
	$(divselectid+" li").click(function(){
		//$(this).css("background","#fff").css("color","#ffffff");
		options.css("display","none");
		selects.children("span").text($(this).attr("value")||$(this).attr("tip"));
		$(textInput).val($(this).attr("tip"));
		$(textInput).change();
		state=false;
	});
	options.click(function(){
		selects.click(function(){return false;});
	});
};