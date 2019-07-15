{{if isAddDia}}
var dia = (function() {
  var show = function(el) {
    need("biz.dialog", function(Dialog) {
        Dialog.show({
            id: el,
            bgcolor: '#000',
            opacity: 80,
            fixed: false
        });
    });
  }

  var hide = function() {
    need("biz.dialog", function(Dialog){
        Dialog.hide();
    });
  }

  return {
    show: show,
    hide: hide
  }
})()
{{/if}}