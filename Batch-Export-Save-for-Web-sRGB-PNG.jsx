#target photoshop

//////// https://forums.adobe.com/message/10604100#1060410 ////////////////////////////////
displayDialogs = DialogModes.NO
/////////////////////////////////////////////////////////////////////////////////////////

// https://raw.githubusercontent.com/jonahvsweb/Photoshop-Automated-Resize-to-Web.jsx/master/Automated%20Resize%20To%20Web.jsx

if (BridgeTalk.appName == "photoshop") {
    app.bringToFront;

    var inputFolder = Folder.selectDialog("Select the source folder that contains the PSD files for PNG export:");

    if (inputFolder != null) {
        var fileList = inputFolder.getFiles(/\.(psd)$/i);
        var outputFolder = inputFolder ;

        for (var i = 0; i < fileList.length; i++) {
            if (fileList[i] instanceof File) {
                var document = open (fileList [i]);
                var documentName = fileList [i].name.replace(/\.[^\.]+$/, ''); // Regex remove filename extension

                while (app.documents.length) {
                    var newFile = new File(decodeURI(outputFolder) + "/" + documentName + ".png");

                    // document.flatten (); // Disable flatten image step

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    function ConvertTosRGBProfile() {
                            app.activeDocument.convertProfile("sRGB IEC61966-2.1", Intent.RELATIVECOLORIMETRIC, true, false);
                        }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

                    exportOptions = new ExportOptionsSaveForWeb();
                    exportOptions.format = SaveDocumentType.PNG;
                    exportOptions.PNG8 = false; // false = PNG-24
                    exportOptions.transparency = true; // true = transparent
                    exportOptions.interlaced = false; // true = interlacing on
                    exportOptions.includeProfile = true; // false = don't embedd ICC profile
                    document.exportDocument(newFile, ExportType.SAVEFORWEB, exportOptions);
                    document.close(SaveOptions.DONOTSAVECHANGES);
                }
            }
            if (i == fileList.length - 1) {
                alert("All PSD files have been saved as PNG files!");
            }
        }
    }
}
