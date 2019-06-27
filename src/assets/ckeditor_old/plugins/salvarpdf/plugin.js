(function () {
    var a = {
            exec: function (editor) {

                /*
                Ext.Msg.confirm('Atenção!', 'Deseja realmente salvar essa minuta em PDF? A operação não poderá ser desfeita!', function (button){
                    if (button == 'yes') {

                        Ext.getCmp('editor').getEl().mask('Salvando em PDF...');

                        Ext.getCmp('editor').salvando = true;

                        if (Ext.getCmp('editor').documento) {
                            var params = {
                                autoSave: false,
                                documento: Ext.getCmp('editor').documento,
                                componenteDigital: Ext.getCmp('editor').componenteDigital,
                                ticket: Ext.getCmp('editor').ticket,
                                conteudoHTML: editor.getData(),
                                convertePDF: true
                            };
                            var url = 'upload_editor';

                            Ext.Ajax.request({
                                url: url,
                                method: 'POST',
                                jsonData: params,
                                timeout: 360000,
                                success: function (response, opts) {
                                    Ext.getCmp('editor').getEl().unmask();
                                    var obj = Ext.decode(response.responseText);
                                    if (obj.success === true) {
                                        Ext.Msg.show({
                                            title: 'Sucesso',
                                            msg: 'A minuta foi salva em PDF com sucesso! O editor de textos será fechado!',
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.INFO,
                                            fn: function (btn) {
                                                window.close();
                                            }
                                        });
                                    } else {
                                        Ext.getCmp('editor').salvando = false;
                                        Ext.Msg.show({
                                            title: 'Erro',
                                            msg: obj.message,
                                            buttons: Ext.Msg.OK,
                                            icon: Ext.Msg.ERROR
                                        });
                                    }
                                },
                                failure: function (response, opts) {
                                    Ext.getCmp('editor').salvando = false;
                                    Ext.getCmp('editor').getEl().unmask();
                                    if (!response.responseText || response.responseText == '') {
                                        response.responseText = 'Houve um erro na tentativa de salvar as alterações! Verifique se você ainda está conectado ao SAPIENS!';
                                    }
                                    Ext.Msg.show({
                                        title: 'Erro',
                                        msg: response.responseText,
                                        buttons: Ext.Msg.OK,
                                        icon: Ext.Msg.ERROR
                                    });
                                }
                            });

                        } else {
                            Ext.Msg.show({
                                title: 'Erro',
                                msg: 'Apenas minutas podem ser salvas em PDF!',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR
                            });
                        }
                    }
                });

                 */
            }
        },
        b = "salvarpdf";
    CKEDITOR.plugins.add(b, {
        init: function (editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("salvarpdf", {
                label: "Salvar em PDF",
                icon: this.path + "salvarpdf.png",
                command: b
            });
        }
    });
})();
