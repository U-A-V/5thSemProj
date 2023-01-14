const CredigibleCertificateFactory = artifacts.require("CredigibleCertificateFactory");

module.exports = function (deployer) {
  deployer.deploy(CredigibleCertificateFactory);
};
