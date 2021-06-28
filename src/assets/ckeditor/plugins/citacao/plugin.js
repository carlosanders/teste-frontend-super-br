(function() {
    var a = {
        exec: function(editor) { 
            if (editor.getSelection() && editor.getSelection().getStartElement()) {
                 var parent = editor.getSelection().getStartElement().getParent();
                 while (parent) {
                     if ((parent.getName() === 'ul') || (parent.getName() === 'ol') || (parent.getName() === 'table')){
                         return false;
                     }
                     parent = parent.getParent();                     
                 }
            }
            var format = {
                element: "blockquote"
            };
            var style = new CKEDITOR.style(format);
            style.type = CKEDITOR.STYLE_BLOCK;
            style.apply(editor.document);
        }
    },
    b = "citacao";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("citacao", {
                label: "Cita&ccedil;&atilde;o - ALT + C",
                icon: this.path + "citacao.png",
                command: b
            });
        }
    });
})();