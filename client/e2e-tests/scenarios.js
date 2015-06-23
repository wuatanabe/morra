'use strict';



describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("");
  });


  describe('/#sigup', function() {

    beforeEach(function() {
      browser.get('/#/signup');
    });


    //testing routing to signup
    it('should render signup partialwhen user navigates to /#/signup', function() {
      expect(element.all(by.id('signup')).getText()).
        toMatch(/Please Signup/);
    });
    
    //testing routing to setup after signing-up
    it('should render signup partialwhen user navigates to /#/signup', function() {
      element(by.model('name')).sendKeys('user_name');
      $('#submit').click();
      expect(browser.getLocationAbsUrl()).toMatch("/setup");
      
      
    //TBD more tests
    // for example check that there is one player available to challenge: robot	    
	    
    });

  });


  //~ describe('view2', function() {

    //~ beforeEach(function() {
      //~ browser.get('index.html#/view2');
    //~ });


    //~ it('should render view2 when user navigates to /view2', function() {
      //~ expect(element.all(by.css('[ng-view] p')).first().getText()).
        //~ toMatch(/partial for view 2/);
    //~ });

  //});
});