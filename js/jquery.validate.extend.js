// 清空之前一次验证绑定的previousValue值
function emptyValue() {
    if($('input[name="buyerEmail"]').data("previousValue")) {
        $('input[name="buyerEmail"]').data("previousValue").old = null;
    }
    if($('input[name="password"]').data("previousValue")) {
        $('input[name="password"]').data("previousValue").old = null;
    }
    return true;
}

// 固话、手机号码的验证
jQuery.validator.addMethod("isPhone", function(value,element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
    var tel = /^\d{3,4}-?\d{7,9}$/;
    return this.optional(element) || (tel.test(value) || mobile.test(value));

}, "请正确填写您的联系电话");

// 重定义remote方法，使不仅仅只是返回true或false，还能根据不同的错误类型返回不同的错误信息
// 解决此问题的链接：http://blog.csdn.net/bbirdsky/article/details/50345667
jQuery.extend( jQuery.validator.methods, {
    remote: function( value, element, param ) {
        if ( this.optional( element ) ) {
            return "dependency-mismatch";
        }
        var previous = this.previousValue( element ),
            validator, data;
        if (!this.settings.messages[ element.name ] ) {
            this.settings.messages[ element.name ] = {};
        }
        previous.originalMessage = this.settings.messages[ element.name ].remote;
        this.settings.messages[ element.name ].remote = previous.message;
        param = typeof param === "string" && { url: param } || param;
        if ( previous.old === value ) {
            return previous.valid;
        }
        previous.old = value;
        validator = this;
        this.startRequest( element );
        data = {};
        data[ element.name ] = value;
        $.ajax( $.extend( true, {
            mode: "abort",
            port: "validate" + element.name,
            dataType: "json",
            data: data,
            context: validator.currentForm,
            success: function( response ) {
                var valid = response === true || response === "true",
                    errors, message, submitted;
                validator.settings.messages[ element.name ].remote = previous.originalMessage;
                if ( valid ) {
                    submitted = validator.formSubmitted;
                    validator.prepareElement( element );
                    validator.formSubmitted = submitted;
                    validator.successList.push( element );
                    delete validator.invalid[ element.name ];
                    validator.showErrors();
                } else {
                    errors = {};
                    if(typeof response == 'object') {
                        message = response.message || validator.defaultMessage( element, "remote" );
                    } else {
                        message = response || validator.defaultMessage( element, "remote" );
                    }
                    errors[ element.name ] = previous.message = $.isFunction( message ) ? message( value ) : message;
                    validator.invalid[ element.name ] = true;
                    validator.showErrors( errors );
                }
                previous.valid = valid;
                validator.stopRequest( element, valid );
            }
        }, param ) );
        return "pending";
    }
});
