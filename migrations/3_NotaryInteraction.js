var NotaryInteraction = artifacts.require("NotaryInteraction");

module.exports = function(deployer) {
  deployer.deploy(NotaryInteraction, "0xfb6358078fa612a1a14d7e11f347bbf74bec0ad2")
};
