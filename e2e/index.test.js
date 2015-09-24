describe(__filename, ()=> {

  context('Home Page', ()=> {

    it('Title should be Document', ()=> {
      return browser
        .url('/')
        .getTitle().then(value=>value.should.be.eql('Document'))
    });

  });

});