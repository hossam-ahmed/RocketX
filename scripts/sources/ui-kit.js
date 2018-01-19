(function (window, $) {
    function uiKit(_appConfig) {

        /*============== Variables ==============*/
        /**
         * variables initialized at start to be used later
         */
        var _self = this;

        /*============== API's ==============*/

        /**
         * list of kit API's that will be initially ready with any instance
         * created of this kit, sothat it can inherit it or override it's usage
         */

        uiKit.prototype.isArabic = isArabic;
        uiKit.prototype.appConfig = extendAppConfig(_appConfig);
        uiKit.prototype.createCustomScrollBar = createCustomScrollBar;
        uiKit.prototype.createCarousel = createCarousel;
        uiKit.prototype.extendInit = extendInit;
        uiKit.prototype.init = init;

        /*============== Events ==============*/

        /**
         * list of events that will be ready to be called whenever it's needed. It's not created by
         * pattern as it's not needed to be inherited or overriden.
         */

        _self.events = {
            selectorClickHandler: function () {
                console.log('selector 1 clicked!');
                $('selector1').click(function () {

                });
            },
            anotherClickHandler: function () {
                console.log('selector 2 clicked!');
                $('selector2').click(function () {

                });
            }
        }

        /*============== Initializer ==============*/

        /**
         * We create this object that carries the function needed to be run on load, 
         * sothat we can extend this object by additional needed functions to be run on
         * load by new instances of this kit.
         */
        var initializer = [
            {
                _function: uiKit.prototype.createCarousel,
                isParameterized: true,
                arguments: uiKit.prototype.appConfig.carouselOptions.selector
            },
            {
                _function: _self.events.selectorClickHandler,
                isParameterized: false,
            },
            {
                _function: _self.events.anotherClickHandler,
                isParameterized: false,
            }
        ]

        /*============== Constants ==============*/

        Object.defineProperties(this, {
            direction: {
                value: uiKit.prototype.isArabic() ? 'right' : 'left',
                writable: false,
                enumerable: true
            },
            inverseDir: {
                value: uiKit.prototype.isArabic() ? 'left' : 'right',
                writable: false,
                enumerable: true
            }
        });

        /*============== API's Implementation ==============*/

        /**
         * list of API's implementation that were declared before. That's the core of each one
         */

        function extendAppConfig(_newAppConfig) {

            // default app config
            var _defaults = {

                // framework prefix
                fwPrefix: 'ui-kit',

                // carousel options
                carouselOptions: {
                    selector: 'media-slider',
                    loop: false,
                    rtl: uiKit.prototype.isArabic(),
                    navText: ['<div role="button" class="{fwPrefix}-control iconed circular-btn">\
                                    <input type="button" class="{fwPrefix}-input {fwPrefix}-btn">\
                                    <i class="{fwPrefix}-control-icon icon-start"></i>\
                               </div>',
                        '<div role="button" class="{fwPrefix}-control iconed circular-btn">\
                                   <input type="button" class="{fwPrefix}-input {fwPrefix}-btn">\
                                   <i class="{fwPrefix}-control-icon icon-end"></i>\
                               </div>'],
                    responsive: {
                        0: {
                            items: 1,
                            margin: 20,
                            nav: false,
                            mouseDrag: true,
                            dots: true,
                            stagePadding: 50
                        },
                        768: {
                            items: 2,
                            nav: false,
                            mouseDrag: true,
                            margin: 30,
                            stagePadding: 50
                        },
                        992: {
                            items: 3,
                            mouseDrag: false,
                            margin: 50,
                            nav: false,
                            stagePadding: 0
                        }
                    }
                },

                // custom scrollbar options
                scrollBarOptions: {

                },
            },
            _outputAppConfig = $.extend(true, {}, _defaults, _newAppConfig);

            // replace fwPrefix with desired framework prefix
            _outputAppConfig.carouselOptions.navText[0] = _outputAppConfig.carouselOptions.navText[0].replace(/{fwPrefix}/g, _outputAppConfig.fwPrefix);
            _outputAppConfig.carouselOptions.navText[1] = _outputAppConfig.carouselOptions.navText[1].replace(/{fwPrefix}/g, _outputAppConfig.fwPrefix);

            return _outputAppConfig;
        }
        function createCustomScrollBar(_selector) {
            //$(_selector).mCustomScrollBar(_self.appConfig.scrollBarOptions);
        }
        function createCarousel(_selector) {
            console.log('carousel applied!');
            return _self.appConfig;
            //$(_selector).owlCarousel(_self.appConfig.carouselOptions);
        }
        function isArabic() {
            return $('html').attr('dir') == 'rtl';
        }
        function extendInit(_funcObj, _clearInit) {
            if (!_clearInit) {
                initializer.push(_funcObj);
            }
            else {
                initializer = [];
                initializer.push(_funcObj);
            }
        }
        function init() {
            for (var i = 0; i < initializer.length; i++) {
                initializer[i].isParameterized ? initializer[i]._function(initializer[i].arguments) : initializer[i]._function()
            }
        }
    }

    /**
     * adding uikit class to window scope
     */
    window.uiKit = uiKit;

    /*============================  Finish ============== ============== */
})(window, window.jQuery);

// create new kit instance
var kit = new uiKit();

// add new function to kit instance
kit.changeRequest = function () {
    console.log('Change Request!');
};

console.log(kit);

// extend kit initializer
kit.extendInit({
    _function: kit.changeRequest,
    isParameterized: false
});

$(function () {

    // kick off functions
    kit.init();
})
