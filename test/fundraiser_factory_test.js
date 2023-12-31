const FundraiserFactoryContract = artifacts.require("FundraiserFactory");

contract("FundraiserFactory: Deployment", () => {
  it("contract has been deployed", async () => {
    const fundraiserFactory = await FundraiserFactoryContract.deployed();
    assert(fundraiserFactory, "fundraiser factory was not deployed");
  });
});

contract("FundraiserFactory: createFundraiser", accounts => {
  let fundraiserFactory;

  // Fundraiser args
  const name = "Beneficiary Name";
  const url = "beneficiaryname.org";
  const imageURL = "https://placekitten.com/600/350";
  const description = "Beneficiary Description";
  const beneficiary = accounts[1];

  it("increments the fundraisersCount", async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
    const currentFundraisersCount = await fundraiserFactory.fundraisersCount();
    
    await fundraiserFactory.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );
    
    const newFundraisersCount = await fundraiserFactory.fundraisersCount();

    assert.equal(
      newFundraisersCount - currentFundraisersCount,
      1,
      "should increment by 1"
    );
  });

  it("emits the FundraiserCreated event", async () => {
    fundraiserFactory = await FundraiserFactoryContract.deployed();
    const tx = await fundraiserFactory.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    );
    const expectedEvent = "FundraiserCreated";
    const actualEvent = tx.logs[0].event;

    assert.equal(
      actualEvent,
      expectedEvent,
      "events should match"
    );
  });
});

contract("FundraiserFactory: fundraisers", accounts => {
  async function createFundraiserFactory(fundraisersCount, accounts) {
    const factory = await FundraiserFactoryContract.new();
    await addFundraisers(factory, fundraisersCount, accounts);
    return factory;
  }

  async function addFundraisers(factory, count, accounts) {
    const name = "Beneficiary";
    const lowerCaseName = name.toLowerCase();
    const beneficiary = accounts[1];

    for(let i = 0; i < count; i++) {
      await factory.createFundraiser(
        // create a series of fundraisers. The index will be used to make them each unique.
        `${name} ${i}`,
        `${lowerCaseName}${i}.com`,
        `${lowerCaseName}${i}.png`,
        `Description for ${name} ${i}`,
        beneficiary
      )
    }
  }

  describe("when fundraisers collection is empty", () => {
    it("returns an empty collection", async () => {
      const factory = await createFundraiserFactory(0, accounts);
      const fundraisers = await factory.fundraisers(10, 0);

      assert.equal(
        fundraisers.length,
        0,
        "collection should be empty"
      );
    })
  });

  describe("varying limits", async () => {
    let factory;
    
    beforeEach(async () => {
      factory = await createFundraiserFactory(30, accounts);
    });

    it("returns 10 results when limit requested is 10", async () => {
      const fundraisers = await factory.fundraisers(10, 0);
      assert.equal(
        fundraisers.length,
        10,
        "results size should be 10"
      );
    });

    // xit marks the test as pending
    it("returns 20 returns when limit requested is 20", async () => {
      const fundraisers = await factory.fundraisers(20, 0);

      assert.equal(
        fundraisers.length,
        20,
        "results size should be 20"
      );
    });

    it("returns 20 when limit requested is 30", async () => {
      const fundraisers = await factory.fundraisers(30, 0);

      assert.equal(
        fundraisers.length,
        20,
        "results size should be 20"
      );
    });
  });
});