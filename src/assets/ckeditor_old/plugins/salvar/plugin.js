(function () {
    var a = {
        exec: function (editor) {

            /*
            if (Ext.getCmp('editor').salvando) {
                Ext.Msg.show({
                    title: 'Erro',
                    msg: 'O SAPIENS está realizando um auto salvamento neste momento! Tente novamente em alguns instantes!',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                return false;
            } else {
                
                Ext.getCmp('editor').salvando = true;
                
                if (Ext.getCmp('editor').documento) {
                    var params = {
                        autoSave: false,
                        documento: Ext.getCmp('editor').documento,
                        componenteDigital: Ext.getCmp('editor').componenteDigital,
                        ticket: Ext.getCmp('editor').ticket,
                        conteudoHTML: editor.getData()
                    };
                    var url = 'upload_editor';
                }

                if (Ext.getCmp('editor').modelo) {
                    var params = {
                        autoSave: false,
                        modelo: Ext.getCmp('editor').modelo,
                        conteudoHTML: editor.getData()
                    };
                    var url = 'upload_modelo';
                }

                if (Ext.getCmp('editor').template) {
                    var params = {
                        autoSave: false,
                        template: Ext.getCmp('editor').template,
                        conteudoHTML: editor.getData()
                    };
                    var url = 'upload_template';
                }

                if (Ext.getCmp('editor').repositorio) {
                    var params = {
                        autoSave: false,
                        repositorio: Ext.getCmp('editor').repositorio,
                        conteudoHTML: editor.getData()
                    };
                    var url = 'upload_repositorio';
                }

                Ext.getCmp('editor').getEl().mask('Salvando...');

                Ext.Ajax.request({
                    url: url,
                    method: 'POST',
                    jsonData: params,
                    timeout: 360000,
                    success: function (response, opts) {
                        Ext.getCmp('editor').getEl().unmask();
                        var obj = Ext.decode(response.responseText);
                        if (obj.success === true) {
                            //Ext.Msg.show({
                            //    title: 'Sucesso',
                            //    msg: 'Dados salvos com sucesso!',
                            //    buttons: Ext.Msg.OK,
                            //    icon: Ext.Msg.INFO
                            //});
                            Ext.getCmp('mainForm').getHeader( ).removeCls('x-panel-header-default');
                            Ext.getCmp('mainForm').getHeader( ).addCls('sucesso');
                            Ext.getCmp('mainForm').setTitle('Salvo com sucesso!');

                            setTimeout(function() {
                                Ext.getCmp('mainForm').getHeader( ).removeCls('sucesso');
                                Ext.getCmp('mainForm').getHeader( ).addCls('x-panel-header-default');
                                Ext.getCmp('mainForm').setTitle('Sapiens');
                            }, 2000);

                            Ext.getCmp('editor').ticket = obj.ticket;
                            Ext.getCmp('editor').salvando = false;
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

            }
 */
        }

    },
    b = "salvar";
    CKEDITOR.plugins.add(b, {
        init: function (editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("salvar", {
                label: "Salvar",
                icon: "save",
                command: b
            });
        }
    });
})();
