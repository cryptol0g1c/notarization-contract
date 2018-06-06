/*
 Bitsign transaction notarizacion contract v0.1c
*/
pragma solidity ^0.4.23;

contract NotarizeTx {
    address owner;
    address operator;
    bool operatorInstantiated = false;
    constructor() public {
      owner = msg.sender;
    }

    enum Status {purchased, confirmed, shiped, recieved, completed}
    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }
    modifier onlyOwnerOrOperator() {
      require(msg.sender == owner || (msg.sender == operator && operatorInstantiated == true));
      _;
    }

    struct Tx {
        address  buyer;
        address  seller;
        bytes4  id;
        uint256 date;
        uint  value;
        bytes32  key;
        Status  status;
    }
    /*  mapping id's => Transactions*/
    mapping (bytes4 => Tx) public idToTx;
    event newTxEvent(bytes32  key);
    function newTx(address _buyer, address _seller, bytes4 _id, uint256 _date,
    uint _value, bytes32 _key) public onlyOwnerOrOperator {
        Tx storage _tx = idToTx[_id];
        _tx.buyer = _buyer;
        _tx.seller = _seller;
        _tx.id = _id;
        _tx.date = _date;
        _tx.value = _value;
        _tx.key = _key;
        _tx.status = Status.purchased;
        emit newTxEvent(_key);
    }

  /* Event trigered when status is updated */
    event updateStatusEvent(bytes32  key);
    /* updateStatus fcn, allows to change status of tx given id */
    function updateStatus(Status _status, bytes4 _id) public onlyOwnerOrOperator{
        idToTx[_id].status = _status;
        emit updateStatusEvent(idToTx[_id].key);
    }
    event initializeOperatorEvent(address operator);
    function initializeOperator(address _operator ) public onlyOwner{
      operator = _operator;
      operatorInstantiated = true;
      emit initializeOperatorEvent(operator);
    }
}
