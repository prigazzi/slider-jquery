;(function($, window, undefined) {
    var Slider = function(elem, opciones) {
        this.elem  = elem;
        this.$elem = $(elem);

        if(this.init) {
            this.init(opciones);
        }
    }
    Slider.prototype = {
        defaults : {
            anterior : '#anterior',
            siguiente: '#siguiente',
            slideInicial : 1,
            onSlideChange : function(){},
        },
        init : function(opciones) {
            this.config = $.extend({}, this.defaults, opciones);
            
            this.$contenedor = this.$elem.children().eq(0);
            this.$slides = this.$contenedor.children();
            this.totalSlides = this.$slides.length;
            this.avance = this.$slides.outerWidth(true);
            this.visibles = Math.floor(this.$elem.width() / this.avance);
            this.slide = {
                actual : this.config.slideInicial,
                movimiento : false,
            };

            var that = this;
            $(this.config.anterior).click(function() {
                that.anterior();
            });
            $(this.config.siguiente).click(function() {
                that.siguiente();
            })

            this.$contenedor.width((this.visibles + this.totalSlides) * this.avance);

            for(var i = 0; i < this.visibles; i++) {
                var temp = this.$slides.eq(i).clone();
                this.$contenedor.append(temp);
            }

            this.verSlide(this.config.slideInicial);
        },
        verSlide : function(slide) {
            elemento = this.$contenedor;
            slide = this.setearSlider(elemento, slide);
            this.animar(elemento, slide);
        },
        setearSlider : function(elemento, slide) {
            if(slide > this.totalSlides + 1) {
                elemento.css('left', '0px');
                this.slide.actual = 1;
                slide = 2;
            }

            if(slide <= 0) {
                elemento.css('left', (this.totalSlides * this.avance * -1) + 'px');
                slide = this.totalSlides;
            }

            return slide;
        },
        animar : function(elemento, slide) {
            var sentido = (this.slide.actual - slide) == -1 ?
                            "-" :
                            "+";
            /*uglyfix : sepan entender */
            sentido = this.slide.actual == slide? '' : sentido;

            this.slide.movimiento = true;
            var that = this;
            elemento.animate({
                left: sentido+"="+this.avance+'px',
            }, 'swing', function(){
                that.slide.actual = slide;
                that.slide.movimiento = false;

                that.config.onSlideChange.apply(
                    that.$contenedor.children().eq(slide - 1)
                );
            })
        },
        siguiente: function() {
            if(!this.slide.movimiento) {
                this.verSlide(this.slide.actual + 1);
            }
        },
        anterior: function() {
            if(!this.slide.movimiento) {
                this.verSlide(this.slide.actual - 1);
            }
        },
    }

    $.fn.marquesina = function(opciones) {
        if(typeof opciones == "string") {
            metodo = opciones;
            args = Array.prototype.slice.call(arguments, 1);

            var slider = this.data('slider') ?
                this.data('slider') : 
                new Slider(this);
            
            if(slider[metodo]) {
                slider[metodo].apply(slider, args);    
            }
        } else if(typeof opciones == 'object' || !opciones) {
            this.data('slider', new Slider(this, opciones));
        } else {
            $.error('Error, parámetro pasado es incorrecto');
        }

        return this;
    }

    window.Slider = Slider;
})(jQuery, window)