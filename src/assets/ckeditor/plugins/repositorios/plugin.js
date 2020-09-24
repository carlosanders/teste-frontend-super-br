(function() {
    var a = {
        exec: function(editor) {
              //repositorioWindow = Ext.create('ExtMVC.view.EdicaoRepositorioWindow');
        },
    },
    b = "repositorios";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("repositorios", {
                label: "Repositórios",
                icon: "source",
                command: b,
            });
        },
    });
})();
