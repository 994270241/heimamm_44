// 自定义校验规则的函数
// 手机号
export var checkphone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("手机不能为空"));
    } else {
        // 利用判断手机号码格式
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        if (reg.test(value) == true) {
            callback();
        } else {
            // 不满足 手机号码的格式
            callback(new Error("手机号码输入错误"));
        }
    }
};
// 邮箱
export var checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("邮箱不能为空"));
    } else {
        // 利用判断手机号码格式
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 判断是否符合
        if (reg.test(value) == true) {
            callback();
        } else {
            // 不满足 手机号码的格式
            callback(new Error("邮箱格式输入错误"));
        }
    }
};