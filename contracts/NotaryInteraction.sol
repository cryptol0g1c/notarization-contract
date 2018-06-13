pragma solidity ^0.4.23;

import "./NotarizeTx.sol";

contract NotaryInteraction  {

    NotarizeTx instance;
    /* address owner; */
    constructor (address _t) public {
        instance = NotarizeTx(_t);
        /* owner = msg.sender; */
    }
    function initOperator(address _a) public returns (uint){
        instance.initializeOperator(_a);
        return 0;
    }

}
