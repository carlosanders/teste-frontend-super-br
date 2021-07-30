/**
 * The footnotes dialog definition.
 *
 * Version 1.0.9
 * https://github.com/andykirk/CKEditorFootnotes
 *
 */

(function($) {
    "use strict";

    // Dialog definition.
    CKEDITOR.dialog.add( 'footnotesDialog', function( editor ) {

        return {
            editor_name: false,
            // Basic properties of the dialog window: title, minimum size.
            title: 'Gerenciador de Notas',
            minWidth: 600,
            minHeight: 100,
            footnotes_el: false,

            // Dialog window contents definition.
            contents: [
                {
                    // Definition of the Basic Settings dialog tab (page).
                    id: 'tab-basic',
                    label: 'Basic Settings',

                    // The tab contents.
                    elements: [
                        {
                            // Text input field for the footnotes text.
                            type: 'textarea',
                            id: 'new_footnote',
                            'class': 'footnote_text',
                            label: 'Nova Nota:',
                            inputStyle: 'height: 300px',
                        },
                        {
                            // Text input field for the footnotes title (explanation).
                            type: 'text',
                            id: 'footnote_id',
                            name: 'footnote_id',
                            label: 'Não existem Notas',


                            // Called by the main setupContent call on dialog initialization.
                            setup: function( element ) {
                                var dialog = this.getDialog(),
                                   // $el = Ext.get('#' + this.domId),
                                    $el = $('#' + this.domId),
                                    $footnotes, $this;

                                dialog.footnotes_el = $el;

                                editor = dialog.getParentEditor();
                                // Dynamically add existing footnotes:
                                $footnotes = $(editor.editable().$).find('.footnotes ol');
                               /* var $foot = Ext.Element(editor.editable().$);
                                $footnotes = Ext.query('.footnotes ol',$foot);*/
                                $this = this;

                                if ($footnotes.length > 0) {
                                    if ($el.find('p').length == 0) {
                                        $el.append('<p style="margin-bottom: 10px;"><strong>OU:</strong> Escolha uma Nota:</p><ol class="footnotes_list"></ol>');
                                    } else {
                                        $el.find('ol').empty();
                                    }

                                    var radios = '';
                                    $footnotes.find('li').each(function(){
                                        var $item = $(this);
                                        var footnote_id = $item.attr('data-footnote-id');
                                        radios += '<li style="margin-left: 15px;"><input type="radio" name="footnote_id" value="' + footnote_id + '" id="fn_' + footnote_id + '" /> <label for="fn_' + footnote_id + '" style="white-space: normal; display: inline-block; padding: 0 25px 0 5px; vertical-align: top; margin-bottom: 10px;">' + $item.find('cite').text() + '</label></li>';
                                    });

                                    $el.children('label,div').css('display', 'none');
                                    $el.find('ol').html(radios);
                                    $el.find(':radio').change(function(){;
                                        $el.find(':text').val($(this).val());
                                    });

                                } else {
                                    $el.children('div').css('display', 'none');
                                }
                            }
                        }
                    ]
                },
            ],

            // Invoked when the dialog is loaded.
            onShow: function() {
                this.setupContent();

                var dialog = this;
                CKEDITOR.on( 'instanceLoaded', function( evt ) {
                    dialog.editor_name = evt.editor.name;
                } );

                // Allow page to scroll with dialog to allow for many/long footnotes
                // (https://github.com/andykirk/CKEditorFootnotes/issues/12)
                jQuery('.cke_dialog').css({'position': 'absolute', 'top': '2%'});
                jQuery('.cke_dialog_ui_text').css({'overflow': 'scroll', 'height': '100px'});

                var current_editor_id = dialog.getParentEditor().id;

                CKEDITOR.replaceAll( function( textarea, config ) {
                    // Make sure the textarea has the correct class:
                    if (!textarea.className.match(/footnote_text/)) {
                        return false;
                    }

                    // Make sure we only instantiate the relevant editor:
                    var el = textarea;
                    while ((el = el.parentElement) && !el.classList.contains(current_editor_id));
                    if (!el) {
                        return false;
                    }

                    config.toolbarGroups = [
                        { name: 'editing',     groups: [ 'undo', 'find', 'selection', 'spellchecker' ] },
                        { name: 'clipboard',   groups: [ 'clipboard' ] }
                    ]
                    config.allowedContent = 'br em strong; a[!href]';
                    config.enterMode = CKEDITOR.ENTER_BR;
                    config.autoParagraph = false;
                    config.height = 300;
                    config.resize_enabled = false;
                    config.autoGrow_minHeight = 100;
                    config.removePlugins = 'footnotes,printsemzoom,salvar,assinar,paragrafo,paragrafonumerado,citacao,titulo,subtitulo,texttransform,zoom,placeholder,campos,specialchar,fastimage,elementspath';
                    config.removeButtons = 'Cut,Copy,Paste,PasteText,Undo,Redo,Find,Maximize,Replace';
                    config.on = {
                        focus: function( evt ){
                            var $editor_el = $('#' + evt.editor.id + '_contents');
                            $editor_el.parents('tr').next().find(':checked').attr('checked', false);
                            $editor_el.parents('tr').next().find(':text').val('');
                        }
                    };
                    return true;
                });

            },

            // This method is invoked once a user clicks the OK button, confirming the dialog.
            onOk: function() {
                var dialog = this;
                var footnote_editor = CKEDITOR.instances[dialog.editor_name];
                var footnote_id     = dialog.getValueOf('tab-basic', 'footnote_id');
                var footnote_data   = footnote_editor.getData();
                footnote_editor.destroy();

                if (footnote_id == '') {
                    // No existing id selected, check for new footnote:
                    if (footnote_data == '') {
                        // Nothing entered, so quit:
                        return;
                    } else {
                        // Insert new footnote:
                        editor.plugins.footnotes.build(footnote_data, true, editor);
                    }
                } else {
                    // Insert existing footnote:
                    editor.plugins.footnotes.build(footnote_id, false, editor);
                }
                // Destroy the editor so it's rebuilt properly next time:
                return;
            },

            onCancel: function() {
                var dialog = this;
                var footnote_editor = CKEDITOR.instances[dialog.editor_name];
                footnote_editor.destroy();
            }
        };
    });
}(window.jQuery));
