"use strict";function getList(){$.ajax({url:"../lib/nav_top.json",dataType:"json",success:function(i){console.log(i);var o="";i.forEach(function(n){o+="<li>".concat(n.name,"</li>")}),$(".bot-center>ul").html(o).on({mouseenter:function(){return $(".bot-box").stop().slideDown()},mouseleave:function(){return $(".bot-box").stop().slideUp()}}).children("li").on("mouseover",function(){var n=$(this).index(),o=i[n].list,t="";o.forEach(function(n){t+='<li>\n                                            <div>\n                                                <img src="'.concat(n.list_url,'" alt="">\n                                            </div>\n                                            <p class="title">').concat(n.list_name,'</p>\n                                                <span class="price">').concat(n.list_price,"\n                                                </span>\n                                        </li>")}),$(".bot-box > ul").html(t)}),$(".bot-box").on({mouseover:function(){$(this).finish().show()},mouseout:function(){$(this).finish().slideUp()}})}})}