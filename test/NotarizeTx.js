const NotarizeTx = artifacts.require('NotarizeTx');

contract('NotarizeTx', addresses => {

  const owner = addresses[0]
  const buyer = addresses[1]
  const seller = addresses[2]
  const operator = addresses[3]
  const fakeOperator = addresses[4]
  const id =  "0x785334f8"
  const notUsedId =  "0x785334f9"
  const date = "326462"
  const value = 1
  const key =  "0xa06d8c92805e40b767afa80b81b0bdabbea6d10af016a1dd121bc5c6651623a1"
  const status = 0
  const statusUpdated = 1
  var instance
  var txFromId
  beforeEach(async() => {
    instance = (await NotarizeTx.new());
  })

/*
test realizados antes de instancear el operator
*/
  describe('NotarizeTx when operatorInstantiated=false', () => {

    it('owner can use newTx', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key ,{ from: owner})
        instance.newTxEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    });

    it('Any other address not being Owner cant use newTx when operator is not instantiated', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

    it('owner can use updateStatus', async () => {
      await instance.newTx( buyer, seller, id, date, value, key ,{ from: owner})
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, 0)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
      try {
        await instance.updateStatus( statusUpdated, id, { from: owner})
        instance.updateStatusEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, statusUpdated)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
    });

    it('Any other address not being Owner cant use updateStatus when operator is not instantiated', async () => {
      await instance.newTx( buyer, seller, id, date, value, key ,{ from: owner})
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, 0)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
      try {
        await instance.updateStatus( statusUpdated, id, { from: fakeOperator})
          assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, status)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
    });
    it('owner can use initializeOperator', async () => {
      try {
        await instance.initializeOperator( operator ,{ from: owner})
        instance.initializeOperatorEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.operator, operator)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    });

    it('Any other address not being Owner cant use initializeOperator when operator is not instantiated', async () => {
      try {
        await instance.initializeOperator( operator , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

  });



  describe('NotarizeTx when operatorInstantiated=true', () => {
    beforeEach(function() {
      try {
        await instance.initializeOperator( operator ,{ from: owner})
        instance.initializeOperatorEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.operator, operator)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
   });

    it('owner can use newTx', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key ,{ from: owner})
        instance.newTxEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    });

    it('Any other address not being Owner cant use newTx when operator is not instantiated', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

    it('owner can use updateStatus', async () => {
      await instance.newTx( buyer, seller, id, date, value, key ,{ from: owner})
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, 0)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
      try {
        await instance.updateStatus( statusUpdated, id, { from: owner})
        instance.updateStatusEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, statusUpdated)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
    });

    it('Any other address not being Owner cant use updateStatus when operator is not instantiated', async () => {
      await instance.newTx( buyer, seller, id, date, value, key ,{ from: owner})
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, 0)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
      try {
        await instance.updateStatus( statusUpdated, id, { from: fakeOperator})
          assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
      await instance.idToTx( id )
        .then(
          function (res) {
            txFromId = res
            assert.equal(txFromId[6]*1, status)
          },
          function (err) {
            assert(false,"Could not obtain Tx from Id")
          }
        )
    });
    it('owner can use initializeOperator', async () => {
      try {
        await instance.initializeOperator( operator ,{ from: owner})
        instance.initializeOperatorEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.operator, operator)
          }
        });
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    });

    it('Any other address not being Owner cant use initializeOperator when operator is not instantiated', async () => {
      try {
        await instance.initializeOperator( operator , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    });

  });
});
