const SignedXml = require("xml-crypto").SignedXml,
  fs = require("fs");
const PfxToPem = require('./util/PfxToPem');

const xml = fs.readFileSync("notas/Enviar.xml", "utf-8");
const args = process.argv.slice(2);

const pfxCertificatePath = "certificados/" + args[0];
const pfxCertificatePass = args[1];
const pemCertificatePath = "certificados/certificado.pem";

PfxToPem(pfxCertificatePath, pfxCertificatePass, pemCertificatePath)

const sig = new SignedXml({ privateKey: fs.readFileSync(pemCertificatePath) });
sig.addReference({ xpath: "//*[local-name(.)='Dados']" });
sig.computeSignature(xml);
fs.writeFileSync("notas/Assinado.xml", sig.getSignedXml());