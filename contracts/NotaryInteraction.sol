pragma solidity ^0.4.23;

import "./NotarizeTx.sol";

contract NotaryInteraction  {
    address owner;
    modifier onlyOwner() {
        require(msg.sender == owner );
        _;
    }

    NotarizeTx public instance;

    constructor (address _t) public {
        instance = NotarizeTx(_t);
        owner = msg.sender;
    }

    function initOperator(address _a) public onlyOwner returns (uint){
        instance.initializeOperator(_a);
        return 0;
    }

}
