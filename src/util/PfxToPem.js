var os = require('os');
var fs = require('fs');
if (os.platform() == 'win32') {  
    if (os.arch() == 'ia32') {
        var chilkat = require('@chilkat/ck-node18-win-ia32');
    } else {
        var chilkat = require('@chilkat/ck-node18-win64'); 
    }
} else if (os.platform() == 'linux') {
    if (os.arch() == 'arm') {
        var chilkat = require('@chilkat/ck-node18-arm');
    } else if (os.arch() == 'x86') {
        var chilkat = require('@chilkat/ck-node18-linux32');
    } else {
        var chilkat = require('@chilkat/ck-node18-linux64');
    }
} else if (os.platform() == 'darwin') {
    var chilkat = require('@chilkat/ck-node18-macosx');
}

const PfxToPem = (pfxCertificatePath, pfxCertificatePass, pemCertificatePath) => {

    var pfx = new chilkat.Pfx();

    var success = pfx.LoadPfxFile(pfxCertificatePath, pfxCertificatePass);
    if (success !== true) {
        console.log("Credenciais do certificado inválidas.");
        return;
    }

    var strPem = pfx.ToPem();
    
    fs.writeFileSync(pemCertificatePath, strPem);
}

module.exports = PfxToPem;