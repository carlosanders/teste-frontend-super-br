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
            if (editor.document.getSelection().getStartElement().getName() == 'h1') {
                var format = {
                    element: "p"
                };
                var style = new CKEDITOR.style(format);
                style.apply(editor.document);
            } else {
                var format = {
                    element: "h1"
                };
                var style = new CKEDITOR.style(format);
                style.apply(editor.document);
            }            
        }
    },
    b = "titulo";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("titulo", {
                label: "T&iacute;tulo - ALT + T",
                icon: this.path + "titulo.png",
                command: b
            });
        }
    });
})();