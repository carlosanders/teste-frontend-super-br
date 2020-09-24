(function() {
    var a = {
        exec: function(editor) {
              //campoWindow = Ext.create('ExtMVC.view.EdicaoCampoWindow');
        },
    },
    b = "campos";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("campos", {
                label: "Campos",
                icon: "templates",
                command: b,
            });
        },
    });
})();
