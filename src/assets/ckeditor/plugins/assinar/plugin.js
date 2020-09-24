(function() {
    var a = {/*
            exec: function (editor) {

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
                            documento: Ext.getCmp('editor').documento,
                            componenteDigital: Ext.getCmp('editor').componenteDigital,
                            ticket: Ext.getCmp('editor').ticket,
                            conteudoHTML: editor.getData()
                        };
                        var url = 'upload_editor';
                    } else {
                        Ext.Msg.show({
                            title: 'Erro',
                            msg: 'Somente é possível assinar componentes digitais!',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                        return false;
                    }

                    Ext.getCmp('editor').getEl().mask('Salvando...');

                    Ext.Ajax.request({
                        url: url,
                        method: 'POST',
                        jsonData: params,
                        timeout: 60000,
                        success: function (response, opts) {
                            Ext.getCmp('editor').getEl().unmask();
                            var obj = Ext.decode(response.responseText);
                            if (obj.success === true) {
                                Ext.getCmp('editor').ticket = obj.ticket;
                                Ext.getCmp('editor').salvando = false;

                                var configuracao = Ext.query('.configuracoes')[0];

                                if (configuracao && configuracao.getAttribute('data-novo-assinador') == 1) {

                                    // temos websocket?
                                    if (ExtMVC.app.websocket) {

                                        var assinaturaModel = ExtMVC.app.getAssinaturaModel(),
                                            assinaturaStore = ExtMVC.app.getAssinaturaBlocoStore();

                                        assinaturaStore.unLoad();

                                        var tid = "",
                                            possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                                        for (var i = 0; i < 32; i++) {
                                            tid += possible.charAt(Math.floor(Math.random() * possible.length));
                                        }

                                        var okTid = false,
                                            okJava = false;

                                        // se em 5 segundos não tivermos o tid, aborta!
                                        window.setTimeout(function () {
                                            if (!okTid) {
                                                maskForm.unmask();
                                                Ext.MessageBox.show({
                                                    title: 'Erro',
                                                    msg: 'O assinador não está disponível! Recarregue o SAPIENS e, se o problema persistir, entre em contato com o suporte! (Erro Websocket)',
                                                    icon: Ext.MessageBox.ERROR,
                                                    buttons: Ext.Msg.OK
                                                });
                                            }
                                        }, 10000);

                                        ExtMVC.app.websocket.subscribe("ws/assinatura/" + tid, function (uri, payload) {

                                            // aqui recebe os sucessos e erros;
                                            var response = payload;

                                            console.log(response);

                                            // criacao do tdi com sucesso, lançamento do java
                                            if (response.action && (response.action == 'assinatura_tid')) {

                                                okTid = true;

                                                var url = 'jnlp://localhost/assinatura/get_jnlp?tid=';

                                                if (window.location.host != 'localhost') {
                                                    url = 'jnlps://' + window.location.host + '/assinatura/get_jnlp?tid=';
                                                }

                                                var iframe = Ext.getCmp('conteudoViewport').add({
                                                    title: "iframe",
                                                    width: 0,
                                                    height: 0,
                                                    border: 0,
                                                    layout: 'fit',
                                                    items: [{
                                                        xtype: "component",
                                                        autoEl: {
                                                            tag: "iframe",
                                                            src: url + tid
                                                        }
                                                    }]
                                                });

                                                Ext.getCmp('conteudoViewport').remove(iframe);

                                                // se em 15 segundos não tivermos o java funcionando, aborta!
                                                window.setTimeout(function () {
                                                    if (!okJava) {

                                                        ExtMVC.app.websocket.unsubscribe("ws/assinatura/" + tid);
                                                        Ext.MessageBox.show({
                                                            title: 'Erro',
                                                            msg: 'O Java não está atualizado ou devidamente configurado!',
                                                            icon: Ext.MessageBox.ERROR,
                                                            buttons: Ext.Msg.OK
                                                        });
                                                    }
                                                }, 15000);

                                                return false;
                                            }

                                            // criacao do tdi com sucesso, lançamento do java
                                            if (response.action && (response.action == 'assinatura_salva')) {

                                                ExtMVC.app.websocket.unsubscribe("ws/assinatura/" + tid);

                                                Ext.Msg.show({
                                                    title: 'Sucesso',
                                                    msg: assinaturaStore.getResult(Ext.decode(response.msg)),
                                                    buttons: Ext.Msg.OK,
                                                    icon: Ext.Msg.INFO,
                                                    fn: function (btn) {
                                                        window.close();
                                                    }
                                                });
                                                return false;
                                            }

                                            // java online
                                            if (response.action && (response.action == 'assinatura_hello')) {
                                                okJava = true;
                                                return false;
                                            }

                                            // criacao do tdi com sucesso, lançamento do java
                                            if (response.action && (response.action == 'assinatura_cancelada')) {

                                                ExtMVC.app.websocket.unsubscribe("ws/assinatura/" + tid);

                                                Ext.MessageBox.show({
                                                    title: 'Erro',
                                                    msg: 'Assinatura cancelada pelo usuário!',
                                                    icon: Ext.MessageBox.INFO,
                                                    buttons: Ext.Msg.OK
                                                });

                                                return false;
                                            }

                                            // criacao do tdi com sucesso, lançamento do java
                                            if (response.action && (response.action == 'assinatura_erro')) {

                                                ExtMVC.app.websocket.unsubscribe("ws/assinatura/" + tid);

                                                if (response.msg) {

                                                    Ext.MessageBox.show({
                                                        title: 'Erro',
                                                        msg: assinaturaStore.getResult(Ext.decode(response.msg)),
                                                        icon: Ext.MessageBox.INFO,
                                                        buttons: Ext.Msg.OK
                                                    });

                                                } else {
                                                    Ext.MessageBox.show({
                                                        title: 'Erro',
                                                        msg: 'Houve um erro na realização da assinatua! Tente novamente!',
                                                        icon: Ext.MessageBox.INFO,
                                                        buttons: Ext.Msg.OK
                                                    });
                                                }

                                                return false;
                                            }

                                            ExtMVC.app.websocket.unsubscribe("ws/assinatura/" + tid);

                                            Ext.MessageBox.show({
                                                title: 'Erro',
                                                msg: 'Houve um erro na realização da assinatua! Tente novamente!',
                                                icon: Ext.MessageBox.INFO,
                                                buttons: Ext.Msg.OK
                                            });

                                        }, function (error) {

                                            Ext.MessageBox.show({
                                                title: 'Erro',
                                                msg: 'O assinador não está disponível! Recarregue o SAPIENS e, se o problema persistir, entre em contato com o suporte!',
                                                icon: Ext.MessageBox.ERROR,
                                                buttons: Ext.Msg.OK
                                            });
                                        });

                                        var data = {
                                            'action': 'assinatura_tid',
                                            'componentesDigitaisId': Ext.getCmp('editor').componenteDigital,
                                            'hostname': window.location.host,
                                            'protocolo': window.location.protocol + '//'
                                        };

                                        ExtMVC.app.websocket.publish("ws/assinatura/" + tid, Ext.encode(data));

                                    } else {
                                        Ext.MessageBox.show({
                                            title: 'Erro',
                                            msg: 'O assinador não está disponível! Recarregue o SAPIENS e, se o problema persistir, entre em contato com o suporte!',
                                            icon: Ext.MessageBox.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }

                                } else {
                                    Ext.getCmp('editor').getEl().mask('Preparando...');
                                    Ext.Ajax.request({
                                        url: 'https://127.0.0.1:27325/hello',
                                        method: 'GET',
                                        cors: true,
                                        useDefaultXhrHeader: false,
                                        success: function (response) {
                                            Ext.getCmp('editor').getEl().unmask();
                                            var result = Ext.decode(response.responseText);
                                            if (result.success) {
                                                if (result.version == '1.3' || result.version == '1.4') {

                                                    var assinaturaModel = ExtMVC.app.getAssinaturaModel(),
                                                        assinaturaStore = ExtMVC.app.getAssinaturaBlocoStore();

                                                    assinaturaStore.unLoad();

                                                    var senhaMsgBox = new Ext.window.MessageBox({
                                                        cls: 'msgbox',
                                                        bodyCls: 'popWindow'
                                                    });
                                                    senhaMsgBox.textField.inputType = 'password';
                                                    senhaMsgBox.textField.width = 400;
                                                    senhaMsgBox.textField.center();
                                                    senhaMsgBox.prompt('Digite a Senha do Token', 'PIN:', function (btn, text, cfg) {
                                                        if (btn == 'ok') {
                                                            if (!Ext.isEmpty(text)) {
                                                                Ext.getCmp('editor').getEl().mask('Assinando...');
                                                                Ext.Ajax.request({
                                                                    url: 'https://127.0.0.1:27325/sign',
                                                                    method: 'POST',
                                                                    cors: true,
                                                                    useDefaultXhrHeader: false,
                                                                    jsonData: {
                                                                        pin: text,
                                                                        files: [{
                                                                            'id': Ext.getCmp('editor').componenteDigital,
                                                                            'hash': Ext.getCmp('editor').ticket // ticket é o hash SHA536 do componente digital
                                                                        }]
                                                                    },
                                                                    success: function (response) {
                                                                        Ext.getCmp('editor').getEl().unmask();
                                                                        var result = Ext.decode(response.responseText);
                                                                        if (result.success) {
                                                                            for (var j = 0; j < result.files.length; j++) {
                                                                                var assinatura = assinaturaModel.create({
                                                                                    'cadeiaCertificado': result.certificates,
                                                                                    'assinatura': result.files[j].hashSignature,
                                                                                    'algoritmoHash': 'SHA256WITHRSA'
                                                                                });
                                                                                assinatura.set('componenteDigital_id', result.files[j].id);
                                                                                assinaturaStore.add(assinatura);
                                                                            }
                                                                            if (assinaturaStore.getModifiedRecords().length > 0) {
                                                                                Ext.getCmp('editor').getEl().mask('Salvando...');
                                                                                assinaturaStore.sync({
                                                                                    success: function () {
                                                                                        Ext.getCmp('editor').getEl().unmask();
                                                                                        var data = this.getReader().jsonData;
                                                                                        Ext.Msg.show({
                                                                                            title: 'Sucesso',
                                                                                            msg: assinaturaStore.getResult(data),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            icon: Ext.Msg.INFO,
                                                                                            fn: function (btn) {
                                                                                                window.close();
                                                                                            }
                                                                                        });
                                                                                    },
                                                                                    failure: function () {
                                                                                        Ext.getCmp('editor').getEl().unmask();
                                                                                        var data = this.getReader().jsonData;
                                                                                        Ext.Msg.show({
                                                                                            title: 'Erro',
                                                                                            msg: assinaturaStore.getResult(data),
                                                                                            buttons: Ext.Msg.OK,
                                                                                            icon: Ext.Msg.ERROR
                                                                                        });
                                                                                    }
                                                                                });
                                                                            } else {
                                                                                Ext.MessageBox.show({
                                                                                    title: 'Erro',
                                                                                    msg: 'Houve erro na assinatura digital! Por favor repita o procedimento!',
                                                                                    icon: Ext.MessageBox.ERROR,
                                                                                    buttons: Ext.Msg.OK
                                                                                });
                                                                            }
                                                                        } else {
                                                                            Ext.MessageBox.show({
                                                                                title: 'Erro',
                                                                                msg: result.message,
                                                                                icon: Ext.MessageBox.ERROR,
                                                                                buttons: Ext.Msg.OK
                                                                            });
                                                                        }
                                                                    },
                                                                    failure: function () {
                                                                        Ext.getCmp('editor').getEl().unmask();
                                                                        Ext.MessageBox.show({
                                                                            title: 'Erro',
                                                                            msg: 'Houve um erro na realização da assinatura!',
                                                                            icon: Ext.MessageBox.ERROR,
                                                                            buttons: Ext.Msg.OK
                                                                        });
                                                                    }
                                                                });
                                                            } else {
                                                                var newMsg = '<span style="color:red">PIN:</span>';
                                                                Ext.Msg.show(Ext.apply({}, {msg: newMsg}, cfg));
                                                            }
                                                        }
                                                    });
                                                } else {
                                                    Ext.MessageBox.show({
                                                        title: 'Erro',
                                                        msg: 'O SAPIENS localizou uma <b>versão antiga</b> do Assinador Digital nesse computador.<br><br>A página de instalação do Assinador Digital no SAPIENS Wiki será aberta <b>automaticamente</b>.',
                                                        icon: Ext.MessageBox.ERROR,
                                                        buttons: Ext.Msg.OK,
                                                        fn: function (btn) {
                                                            window.open("http://sapienswiki.agu.gov.br/index.php/Assinador_Digital");
                                                        }
                                                    });
                                                }
                                            } else {
                                                Ext.MessageBox.show({
                                                    title: 'Erro',
                                                    msg: result.message,
                                                    icon: Ext.MessageBox.ERROR,
                                                    buttons: Ext.Msg.OK
                                                });
                                            }
                                        },
                                        failure: function () {
                                            Ext.getCmp('editor').getEl().unmask();
                                            Ext.Msg.show({
                                                title: 'Assinador Digital',
                                                msg: 'O assinador digital do SAPIENS <b>não parece estar instalado neste computador</b>.<br><br>Clique <a href="http://sapienswiki.agu.gov.br/index.php/Assinador_Digital" target="_blank">aqui</a> para acessar a página de instalação do Assinador Digital no SAPIENS Wiki.',
                                                buttons: Ext.Msg.OK,
                                                icon: Ext.MessageBox.ERROR
                                            });
                                        }
                                    });
                                }

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

            }
        */},
        b = "assinar";
    CKEDITOR.plugins.add(b, {
        init: function(editor) {
            editor.addCommand(b, a);
            editor.ui.addButton("assinar", {
                label: "Assinar",
                icon: this.path + "assinar.png",
                command: b,
            });
        },
    });
})();
