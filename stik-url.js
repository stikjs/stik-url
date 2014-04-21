// ==========================================================================
// Project:   Stik URL - URL related functionalities for Stik.js
// Copyright: Copyright 2013-2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/stikjs/stik-url/blob/master/LICENSE
// ==========================================================================

// Version: 0.2.1 | From: 21-04-2014

window.stik.boundary({
  as: '$url',
  resolvable: true,
  to: function( $window ){
    return {
      baseUrl: function baseUrl(){
        return $window.location.href;
      },
      relativeUrl: function relativeUrl(){
        return this.baseUrl.match(/http:\/\/.+?(\/.+$)/)[1];
      },
      pathName: function pathName(){
        return $window.location.pathname;
      },
      hash: function hash( newHashValue ){
        return this.locationHash( newHashValue ).replace( /^#/, '' );
      },
      locationHash: function locationHash( newHashValue ){
        if ( newHashValue ) {
          $window.location.hash = newHashValue;
        }
        return location.hash;
      },
      mainPath: function mainPath() {
        return '/' + this.pathName().split( '/' )[ 1 ];
      },
      goTo: function goTo( url ){
        $window.location = url;
      },
      queries: function queries(){
        var result, queries, query;

        queries = this.baseUrl().split( '?' )[ 1 ];

        if ( queries ) {
          queries = queries.split( '&' );
          result = {};
          for ( var i = 0; i < queries.length; i++ ) {
            query = queries[ i ].split( '=' );
            result[ query[ 0 ] ] = query[ 1 ];
          }
          return result;
        } else {
          return {};
        }
      }
    };
  }
});
