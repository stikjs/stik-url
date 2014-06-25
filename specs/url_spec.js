var jsdom = require("jsdom").jsdom;
GLOBAL.document = jsdom("<html><head></head><body></body></html>");
GLOBAL.window = document.parentWindow;

require("stik-core")
require("stik-helpers")
require("stik-labs")
require("../src/url")

var stik = window.stik;

describe("Url", function(){
  describe("mainPath", function(){
    it("with a simple path", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(url, "pathName").andReturn("/list");

      expect(
        url.mainPath()
      ).toEqual('/list');
    });

    it("with a deep path", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(url, "pathName").andReturn("/list/1234/do_it");

      expect(
        url.mainPath()
      ).toEqual('/list');
    });

    it("with an empty path", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(url, "pathName").andReturn("/");

      expect(
        url.mainPath()
      ).toEqual('/');
    });
  });

  describe("queries", function(){
    it("an empty query", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(
        url, "baseUrl"
      ).andReturn("http://mywebsite.com");

      expect(url.queries()).toEqual({});
      expect(url.baseUrl).toHaveBeenCalled();
    });

    it("one param query", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(
        url, "baseUrl"
      ).andReturn("http://mywebsite.com?sample=query");

      expect(
        url.queries()
      ).toEqual({
        sample: "query"
      });
    });

    it("one two queries", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(
        url, "baseUrl"
      ).andReturn(
        "http://mywebsite.com?sample=query&more=advanced"
      );

      expect(
        url.queries()
      ).toEqual({
        sample: "query",
        more: "advanced"
      });
    });

    it("multicharacter queries", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(
        url, "baseUrl"
      ).andReturn(
        "http://mywebsite.com?spaces=qew%20ksd%20&number=123.98"
      );

      expect(
        url.queries()
      ).toEqual({
        spaces: "qew%20ksd%20",
        number: "123.98"
      });
    });
  });

  describe("hash", function(){
    it("having a hash", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(url, "locationHash").andReturn("#123");

      expect(url.hash()).toEqual("123");
    });

    it("with an empty hash", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(url, "locationHash").andReturn("");

      expect(url.hash()).toEqual("");
    });

    it("setting a hash", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      spyOn(url, "locationHash").andReturn("some-hash");

      url.hash("some-hash");

      expect(
        url.locationHash
      ).toHaveBeenCalledWith("some-hash");
    });

    it("setting an empty hash", function(){
      var url = stik.labs.boundary({
        name: "$url"
      }).run();

      url.hash("some-hash");
      url.hash("");

      expect(url.hash()).toEqual("");
    });
  });

  describe("goTo", function(){
    it("should assign the location value", function(){
      var windowMock = {}, helper;

      url = stik.labs.boundary({
        name: "$url"
      }).run({
        $window: windowMock
      });

      url.goTo("/heroes/hell-boy");

      expect(windowMock.location).toEqual("/heroes/hell-boy");
    });
  });
});
