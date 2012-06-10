Slider.prototype.verSlide = function(slide) {
    slide = this.setearSlider(this.$contenedor.children(), slide);

    actual = this.slide.actual;
    prox   = slide;

    this.$contenedor.children().each(function(idx) {
        var $slide = $(this);
        setTimeout(function() {
            //console.log($slide, slide);
            that.slide.actual = actual;
            that.animar($slide, prox);
        }, idx * 50);
    });
}