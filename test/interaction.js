const NotarizeTx = artifacts.require('NotarizeTx')
const NotaryInteraction = artifacts.require('NotaryInteraction')
contract('NotarizeTx', addresses => {
  console.log('comienza test')
  const owner = addresses[0]
  const buyer = addresses[1]
  const seller = addresses[2]
  const operator = addresses[3]
  const id =  "0x785334f8"
  const date = "326462"
  const value = 1
  const key =  "0xa06d8c92805e40b767afa80b81b0bdabbea6d10af016a1dd121bc5c6651623a1"
  const status = 0
  const statusUpdated = 1
  let instanceNotarizeTx
  let instanceNotaryInteraction
  before(async () => {
     instanceNotarizeTx = await NotarizeTx.new( {from: owner})
     instanceNotaryInteraction = await NotaryInteraction
        .new(instanceNotarizeTx.address ,{from: owner})
    await instanceNotarizeTx.initializeContract(instanceNotaryInteraction.address ,{ from: owner})
  })

  describe('testing interaction contract', () => {

    it('operator cant use newTx when is not instantiated', async () => {
      try {
        await instanceNotarizeTx.newTx( buyer, seller, id, date, value, key , { from: operator})
        assert.fail()
      }
      catch(error) {
        assert(error.toString().includes('revert'), error.toString())
      }
    })

    it('owner can use initOperator from NotaryInteraction', async () => {
      try {
        await instanceNotaryInteraction.initOperator( operator,{ from: owner})
      }
      catch(error) {
        assert(false,"The method should not fail")
      }
    })

    it('operator can use newTx', async () => {
      try {
        await instanceNotarizeTx.newTx( buyer, seller, id, date, value, key ,{ from: operator})
        instanceNotarizeTx.newTxEvent().get((error, res) => {
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

  })
})
