// paginateKPB Plugin for jQuery - Version 0.0.1
// Francisco Palomares Barrios | http://kpb.es/
/*

Use:

$("#content").paginateKPB(); 

Options:

elements = numero de elemtos por página
next = texto del boton de siguiente página
previous =texto del botón de página anterior
active = clase para la pagina activo
pagination_class = clase para el estilo de la paginacion
position = posición de la paginación: "before", "after", or "both"

*/
(function($){
    $.fn.paginateKPB = function(options) {
        var defaults = {
            elements: 4,
            next: "Next",
            previous: "Previous",
            active: "active",
            pagination_class: "pagination",
			position: "after"
        };
        var options = $.extend(defaults, options);

        return this.each(function() {
            obj = $(this);
            var show_per_page = options.elements;
            var number_of_elements = obj.children().size();
            var number_of_pages = Math.ceil(number_of_elements/show_per_page);
            
            var array_of_elements = [];
            var numP = 0;
            var nexP = show_per_page;
			
            for (i=1;i<=number_of_pages;i++){    
                array_of_elements[i] = obj.children().slice(numP, nexP);
				
                numP += show_per_page;
                nexP += show_per_page;
            }
			
			showPage(1);
			createPagination(1);

            function showPage(page) {
                obj.children().hide();
                array_of_elements[page].show();
            }
            
            function createPagination(curr) {
                if(number_of_pages>1){
                    var start, elements = "", end, nav = "";
                    start = "<ul class='"+options.pagination_class+"'>";
                    var previous = "<li><a class='goto_previous' href='#'>"+options.previous+"</a></li>";
                    var next = "<li><a class='goto_next' href='#'>"+options.next+"</a></li>";
                    end = "</ul><br clear='all' />";
                    var after = number_of_pages - options.after + 1;
                    var pagi_range = paginationCalculator(curr);
                    for (i=1;i<=number_of_pages;i++){
                        if (i == curr) { 
                            elements += '<li class="'+options.active+'"  title="'+i+'"><a href="#" class="goto">'+i+'</a></li>';
                        }else{ 
                            elements += '<li title="'+i+'"><a href="#" class="goto">'+i+'</a></li>';
                        }
                    }
                    if (curr != 1 && curr != number_of_pages) {
                        nav = start + previous + elements + next; + end;
                    } else if (number_of_pages == 1) {
                        nav = start + previous + elements + next; + end;
                    } else if (curr == number_of_pages){
                        nav = start + previous + elements + next; + end;
                    } else if (curr == 1) {
                        nav = start + previous + elements + next; + end;
                    }
                    if (options.position == "before") {
                        obj.before(nav);
                    } else if (options.position == "after") {
                        obj.after(nav);
                    } else {
                        obj.after(nav);
                        obj.before(nav)
                    }
                }
                
            }
            
			function paginationCalculator(curr)  {
				var half = Math.floor(options.nav_elements/2);
				var upper_limit = number_of_pages - options.nav_elements;
				var start = curr > half ? Math.max( Math.min(curr - half, upper_limit), 0 ) : 0;
				var end = curr > half?Math.min(curr + half + (options.nav_elements % 2), number_of_pages):Math.min(options.nav_elements, number_of_pages);
				return {start:start, end:end};
			}
			
            $(".goto").click(function(e){
                e.preventDefault();
                $(".pagination").children().removeClass("active");
                $(this).parent().addClass("active");
                showPage($(this).parent().attr("title"));
            });
            $(".goto_next").click(function(e) {
                e.preventDefault();
                var act = "."+options.active;
                var newcurr = parseInt($(".pagination").find(".active").attr("title")) + 1;
                if(newcurr<=number_of_pages){
                    var active = $(".pagination").find(".active").next();
                    $(".pagination").children().removeClass("active");
                    active.addClass("active");
                    showPage(newcurr);
                }
            });
            $(".goto_previous").click(function(e) {
                e.preventDefault();
                var act = "."+options.active;
                var newcurr = parseInt($(".pagination").find(".active").attr("title")) - 1;
                if(newcurr>0){
                    var active = $(".pagination").find(".active").prev();
                    $(".pagination").children().removeClass("active");
                    active.addClass("active");
                    showPage(newcurr);
                }
            });
        });  
    };
})(jQuery);
