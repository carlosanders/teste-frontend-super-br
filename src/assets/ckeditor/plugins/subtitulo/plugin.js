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
            var conteudo = editor.getData();
            if (!conteudo.match(/<h1( [^>]*)?>/gi) || (editor.document.getSelection().getStartElement().getName() == 'h1' && conteudo.match(/<h1( [^>]*)?>/gi).length == 1)) {
                alert('Adicione um título antes de utilizar um subtítulo!');
            } else {

                if (editor.document.getSelection().getStartElement().getName() == 'h2') {
                    var format = {
                        element: "p"
                    };
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                } else {
                    var format = {
                        element: "h2"
                    };
                    var style = new CKEDITOR.style(format);
                    style.apply(editor.document);
                }

            }
        }
    },
    b = "subtitulo";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("subtitulo", {
                label: "Subt&iacute;tulo - SHIFT + ALT + T",
                icon: this.path + "subtitulo.png",
                command: b
            });
        }
    });
})();
