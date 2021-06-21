/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview Print2 Plugin
 */

CKEDITOR.plugins.add( 'printsemzoom', {
	// jscs:disable maximumLineLength
	lang: 'af,ar,bg,bn,bs,ca,cs,cy,da,de,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn', // %REMOVE_LINE_CORE%
	// jscs:enable maximumLineLength
	icons: 'print,', // %REMOVE_LINE_CORE%
	hidpi: true, // %REMOVE_LINE_CORE%
	init: function( editor ) {
		// Print plugin isn't available in inline mode yet.
		if ( editor.elementMode == CKEDITOR.ELEMENT_MODE_INLINE )
			return;

		var pluginName = 'printsemzoom';

		// Register the command.
		editor.addCommand( pluginName, CKEDITOR.plugins.print2 );

		// Register the toolbar button.
		editor.ui.addButton && editor.ui.addButton( 'PrintSemZoom', {
			label: editor.lang.print.toolbar,
                        icon: this.path + "print.png",
			command: pluginName,
			toolbar: 'document,50'
		} );
	}
} );

CKEDITOR.plugins.print2 = {
	exec: function( editor ) {

            // seta o zoom em 100%
            var body = editor.editable().$;
            var value = parseInt(100);

            body.style.MozTransformOrigin = "top left";
            body.style.MozTransform = "scale(" + (value/100)  + ")";

            body.style.WebkitTransformOrigin = "top left";
            body.style.WebkitTransform = "scale(" + (value/100)  + ")";

            body.style.OTransformOrigin = "top left";
            body.style.OTransform = "scale(" + (value/100)  + ")";

            body.style.TransformOrigin = "top left";
            body.style.Transform = "scale(" + (value/100)  + ")";
            // IE
            body.style.zoom = value/100;

            if ( CKEDITOR.env.gecko ) {
                    editor.window.$.print();
            } else {
                    editor.document.$.execCommand( 'Print' );
            }

            // retoma o zoom salvo no cookie

            var z = 100;

            value = parseInt(z);

            body.style.MozTransformOrigin = "top left";
            body.style.MozTransform = "scale(" + (value/100)  + ")";

            body.style.WebkitTransformOrigin = "top left";
            body.style.WebkitTransform = "scale(" + (value/100)  + ")";

            body.style.OTransformOrigin = "top left";
            body.style.OTransform = "scale(" + (value/100)  + ")";

            body.style.TransformOrigin = "top left";
            body.style.Transform = "scale(" + (value/100)  + ")";
            // IE
            body.style.zoom = value/100;

    },
	canUndo: false,
	readOnly: 1,
	modes: { wysiwyg: 1 }
};
