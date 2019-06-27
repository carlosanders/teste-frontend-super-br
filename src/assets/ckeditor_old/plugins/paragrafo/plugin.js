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
                element: "p",
                attributes: {
                    class: '',
                }                
            };
            var style = new CKEDITOR.style(format);
            style.apply(editor.document);
        }
    },
    b = "paragrafo";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("paragrafo", {
                label: "Par&aacute;grafo - ALT + P",
                icon: this.path + "paragrafo.png",
                command: b
            });
        }
    });
})();