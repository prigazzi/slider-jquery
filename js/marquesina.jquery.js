;(function($, window, undefined) {

    $.fn.marquesina = function(prev, sig) {
        return this.each(function(){
            var $container = $(this).children().eq(0);

            if($container) {
                var $fotos = $container.children();
                var cantidad = $fotos.length;
                var incremento = $fotos.outerWidth(true);
                var enMarquesina = Math.floor($(this).width() / incremento);
                var primerElemento = 1;
                var estaMoviendo = false;
            }

            $container.css('width', (cantidad + enMarquesina) * incremento);
            for(var i = 0; i < enMarquesina; i++) {
                $container.append($fotos.eq(i).clone());
            }

            $(sig).click(function(e) {
                e.preventDefault();

                if(!estaMoviendo) {
                   if(primerElemento > cantidad) {
                        primerElemento = 2;
                        $container.css('left', '0px');
                    } else {
                        primerElemento++;
                    }
                    
                    estaMoviendo = true;
                    $container.animate({
                        left: '-=' + incremento,
                    }, 'swing', function(){
                        estaMoviendo = false;
                    });
                }
            });

            $(prev).click(function(e) {
                e.preventDefault();

                if(!estaMoviendo) {
                    if(primerElemento == 1) {
                        $container.css('left', cantidad * incremento * -1);
                        primerElemento = cantidad;
                    } else {
                        primerElemento--;
                    }
                    estaMoviendo = true;
                    $container.animate({
                        left: '+=' + incremento,
                    }, 'swing', function(){
                        estaMoviendo = false;
                    });
                }
            });
        });
    }

})(jQuery, window)