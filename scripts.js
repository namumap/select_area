$(function() {
  /*==================================
   typeahead
   ====================================*/

  $.getJSON( "./areas.json", function( jdata ) {
    init_areasearch(jdata);
  });
  
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
      q = q.replace("(", "").replace(")", "");
      qa = q.split(" ");
      qc = qa.length;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = [];
      $.each(qa, function(i, el) {
        substrRegex.push(new RegExp(el, 'i'));
      });

      // console.log(substrRegex)

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) { 
        m_cnt = 0;
        $.each(substrRegex, function(j, re) {
          if(re.test(str.area_title)) m_cnt++;
        });

        if(substrRegex.length==m_cnt) matches.push(str);

        //if (matches.length >= 20) return false;
      });

      cb(matches);
    };
  };

  var init_areasearch = function(aobj) {
    $('#search-area.typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1.
    },
    {
      name: 'area_title',
      displayKey: 'area_title',
      source: substringMatcher(aobj),
      limit: 20
    }).on('typeahead:selected', function($e, datum){
      $('#result-typeahead').html('code - '+datum.area_code+' , title - '+datum.area_title);
      $('#search-area').blur();

    });
  }

});
