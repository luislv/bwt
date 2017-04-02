$(function() {
    /**
     * 头部导航
     */

    // 显示菜单栏
    $('.J_navMenu').on('click', function() {
        var e = getEvent();
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
        $('.J_navContent').css({
            'display': 'block',
            'box-shadow': '0 0 10px rgba(50, 50, 50, 0.5)'
        }).animate({
            right: 0
        }, 300);
    });

    // 点击关闭按钮隐藏菜单栏
    $('.J_navClose').on('click', function() {
        $('.J_navContent').animate({
            right: '-260px'
        }, 300).css('box-shadow', 'none');
    });

    // 点击空白处隐藏菜单栏
    $(document).on('click', function() {
        var e = getEvent();
        var target = e.target || e.srcElement;
        if($(target).parents('.J_navContent').length == 0) {
            $('.J_navContent').animate({
                right: '-260px'
            }, 300).css('box-shadow', 'none');
        }
    });

    // 导航栏内选项下拉菜单
    $('.J_accordion').on('click', function() {
        var $this = $(this);
        $this.siblings('.J_accordion').find('.J_accordion_dropdown').slideUp('fast');
        $this.find('.J_accordion_dropdown').slideToggle('fast');
    });
});

/**
 * tab切换
 */
function Tab(option, callback){
    this.root=$(option.root);
    this.tabTag=this.root.find('#tabon li');//菜单栏
    this.hidden=this.root.find('.J_tabcon_item');//隐藏内容
    this.init(callback);
}
Tab.prototype={
    init:function(callback){
        var that=this;
        this.tabTag.each(function(i){
            $(this).click(function(){
                that.tabTag.removeClass('active');
                $(this).addClass('active');
                that.hidden.eq(i).show().siblings().hide();
                if(callback){
                    callback();
                }
            });
        });
    }
};

/**
 * 获取事件对象函数封装
 */
function getEvent(){
    if(window.event){
        return window.event;
    }
    var f = arguments.callee.caller;
    do{
        var e = f.arguments[0];
        if(e && (e.constructor === Event || e.constructor===MouseEvent || e.constructor===KeyboardEvent)){
            return e;
        }
    }while(f=f.caller);
}