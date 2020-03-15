export default {
    install (Vue) {
        console.log(window.M);
        Vue.prototype.$message = function ( html ) {
            window.M.toast({html})
        }

        Vue.prototype.$error = function ( html ) {
            window.M.toast({html: `[Ошибка]: ${html}`})
        }
    }
}