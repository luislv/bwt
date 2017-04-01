$(function() {
    /**
     *  导航下拉列表
     */
    // 获取当前激活列表项索引
    var index = $('a.active').index('.nav li a');
    // 点击‘网上商城’导航，显示下拉列表
    $('.J_shop').on('click', function(e) {
        var self = $(this);
        e.preventDefault();
        e.stopPropagation();
        if(self.hasClass('active')) {
            self.removeClass('active');
            // 还原列表项激活状态
            $('.nav li a').eq(index).addClass('active');
        } else {
            // 使当前列表项处于激活状态
            $('.nav li a').eq(index).removeClass('active');
            self.addClass('active');
        }
        $('.J_shopDropdown').slideToggle('fast');
    });
    // 点击空白处收起导航下拉列表
    $(document).on('click', function() {
        $('.J_shop').removeClass('active');
        $('.J_shopDropdown').slideUp('fast');
        // 还原列表项激活状态
        $('.nav li a').eq(index).addClass('active');
    });

    /**
     * 侧边菜单栏下拉
     */
    $('.J_menu').on('click', function() {
        $(this).siblings('.J_dropDown').slideToggle('fast');
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