const NotarizeTx = artifacts.require('NotarizeTx')

contract('NotarizeTx', addresses => {
  console.log('comienza test')
  const owner = "0x44751576B07eeE07de3D8D5BFb9C8Dd77ADD1744"
  const buyer = "0x44751576B07eeE07de3D8D5BFb9C8Dd77ADD1745"
  const seller = "0x44751576B07eeE07de3D8D5BFb9C8Dd77ADD1746"
  const operator = "0x44751576B07eeE07de3D8D5BFb9C8Dd77ADD1747"
  const fakeOperator = "0x44751576B07eeE07de3D8D5BFb9C8Dd77ADD1748"
  const id =  "0x785334f8"
  const notUsedId =  "0x785334f9"
  const date = "326462"
  const value = 1
  const key =  "0xa06d8c92805e40b767afa80b81b0bdabbea6d10af016a1dd121bc5c6651623a1"
  const status = 0
  const statusUpdated = 1
  var instance =  async () => {
    return await NotarizeTx.at("0x8e368C19992cA5163301041cC0A908F33BEE7F89")
  }



  describe('NotarizeTx when operatorInstantiated=false', () => {
    console.log('NotarizeTx when operatorInstantiated=false')
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
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('Any other address not being Owner cant use newTx when operator is not instantiated', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

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
        })
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
    })

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
    })
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
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('Any other address not being Owner cant use initializeOperator when operator is not instantiated', async () => {
      try {
        await instance.initializeOperator( operator , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

  })



  describe('NotarizeTx when operatorInstantiated=true', () => {
    beforeEach(async() => {
      try {
        await instance.initializeOperator( operator ,{ from: owner})
        instance.initializeOperatorEvent().get((error, res) => {

          if (error){
            assert(false,"The method should not fail")
          }
          else{
            //assert.equal(res[0].args.operator, operator)
          }
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
   })

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
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('operator can use newTx', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key ,{ from: operator})
        instance.newTxEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('Any other address not being Owner either operator cant use newTx', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

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
        })
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
    })

    it('operator can use updateStatus', async () => {
      await instance.newTx( buyer, seller, id, date, value, key ,{ from: operator})
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
        await instance.updateStatus( statusUpdated, id, { from: operator})
        instance.updateStatusEvent().get((error, res) => {
          if (error){
            assert(false,"The method should not fail")
          }
          else{
            assert.equal(res[0].args.key, key)
          }
        })
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
    })

    it('Any other address not being Owner either operator cant use updateStatus', async () => {
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
    })
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
        })
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('operator cant use initializeOperator', async () => {
      try {
        await instance.initializeOperator( operator , { from: operator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

    it('Any other address not being Owner cant use initializeOperator', async () => {
      try {
        await instance.initializeOperator( operator , { from: fakeOperator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

  })

  describe('Checking functionality', () => {
    it('newTx should create a new pointer to a not null Tx struct', async () => {
      try {
        await instance.newTx( buyer, seller, id, date, value, key ,{ from: operator})
        var res = await instance.idToTx(id)
        console.log("-------")
        console.log("-------")
        console.log("-------")
        console.log("-------")
        console.log(res)
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })
  })
})
