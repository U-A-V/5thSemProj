const CredigibleCertificate = artifacts.require("CredigibleCertificate");

module.exports = function (deployer) {
  deployer.deploy(CredigibleCertificate, "PU CERTIFICATE", "PUC");
};
