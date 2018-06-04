/*
 Bitsign transaction notarizacion contract v0.1c
*/
pragma solidity ^0.4.23;

contract NotarizeTx {
    address owner;

    constructor() public {
      owner = msg.sender;
    }

    enum Status {purchased, confirmed, shiped, recieved, completed}
    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    struct Tx {
        address  buyer;
        address  seller;
        bytes32  id;
        uint256 date;
        uint  value;
        bytes32  key;
        Status  status;
    }
    /*  mapping id's => Transactions*/
    mapping (bytes32 => Tx) public idToTx;
    event newTxEvent(Tx tx);
    function newTx(address _buyer, address _seller, bytes32 _id, uint256 _date,
    uint _value, bytes32 _key) public onlyOwner {
        Tx storage _tx = idToTx[_id];
        _tx.buyer = _buyer;
        _tx.seller = _seller;
        _tx.id = _id;
        _tx.date = _date;
        _tx.value = _value;
        _tx.key = _key;
        _tx.status = Status.purchased;
        emit newTxEvent(_tx);
    }

  /* Event trigered when status is updated */
    event updateStatusEvent(Tx tx);
    /* updateStatus fcn, allows to change status of tx given id */
    function updateStatus(Status _status, bytes32 _id) public onlyOwner{
        idToTx[_id].status = _status;
        emit updateStatusEvent(idToTx[_id]);
    }
}
