describe("Formikation init", function() {
  var fixture;
  beforeEach(function() {
    fixture = setFixtures('<div class="formikation"></div>');
    jQuery('.formikation').formikation();
  });

  it("There is a formikation object", function() {
    expect(formikation).toBeDefined();
  });
});
