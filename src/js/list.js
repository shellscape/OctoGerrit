(function (root) {

  var gerritGlyphs = {
      x: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAo0lEQVR42mNgGPrg8+7d/191dPwnWePPu3f/XxEUBGNk8bczZ/6/yMAAFgepwWkrSBEIw2x/Vl4OFwPhB6GhuF11XUkJrvBxWhqcDbIV5AK8Tv925gxYIbJtt4yN//959464cAA5GVkzQRux+RsZ33Vx+f9h1ar/RNkIcjrICyBNyIaAwgTDCyB/IStCjmuQs0GGgTSCDMSwFWQazBayEgndAQAqW6dvdnJ0RwAAAABJRU5ErkJggg==',
      check: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAh0lEQVR42mNgGDJgzu2Z/3uudvwnWWPUoVDSNb7/+e6/5Tbj/9XnysnTCLKVZKeCNGpuUPoPMoRkP3IsYfh/7u0Z/Bq99rig2AAKGJBGggEEMhmkEab43ue7YDbIyUQ5EWQASIPEKsH/IFcQ5VxsfgTh7BNppAXQ3ue74baDnE5WKiJLI6kAAN+fdJsknylQAAAAAElFTkSuQmCC'
    },
    counter = 0,
    interval;

  gerritReady(function () {
    counter = 0;

    interval = setInterval(function (){
      var rows = document.querySelectorAll('.changeTable tbody tr'),
      tds;

      counter++;

      if (rows.length < 8 || counter > 5) {
        return;
      }

      clearInterval(interval);

      tds = document.querySelectorAll('td.cSTATUS');

      [].forEach.call(tds, function (td) {
        if (td.innerText === 'Merge Conflict') {
          td.className += ' gerrit-status-conflict';
        }
        else if (td.innerText === 'Merged') {
          td.className += ' gerrit-status-merged';
        }
        else if (td.innerText === 'Abandoned') {
          td.className += ' gerrit-status-abandoned';
        }
      });

      $('td.cSIZE').each(function () {
        var e = $(this),
        blocks = $('<div/>', { 'class': 'gerrit-size'}),
        block = $('<span/>', { 'class': 'gerrit-size-block'}),
        title = e.attr('title'),
        regex = /\+(\d+), \-(\d+)/,
        additions = parseInt(title.replace(regex, '$1')),
        removals = parseInt(title.replace(regex, '$2')),
        difference,
        adds = additions,
        rems = removals;

        if (adds + rems > 5) {
          difference = (rems + adds) / 5; // we prefer to only show 5 blocks, round up

          adds = Math.round(adds / difference);
          rems = Math.round(rems / difference);

          if (rems >= 5 ) {
            adds = 0;
          }
          else if (adds >= 5) {
            rems = 0;
          }
        }

        for(var i = 0; i < 5; i++) {
          var clone = block.clone();

          if (i < adds + rems) {
            clone.addClass('gerrit-size-block-' + (i < adds ? 'add' : 'rem'));
          }

          blocks.append(clone);
        }

        e.empty().append(blocks);
      });

      $('td.cAPPROVAL').each(function () {
        var e = $(this),
        index = e.index(),
        img = e.find('img'),
        state = 'none';

        if(e.find('div.gerrit-state').length) {
          return;
        }

        if (img.length) {
          if (img.attr('src').indexOf(gerritGlyphs.x) === 0) {
            state = 'minus-two';

            e.attr('title', index === 11 ? 'Build Failure' : '-2');
          }
          else if (img.attr('src').indexOf(gerritGlyphs.check) === 0) {
            state = 'plus-two';

            e.attr('title', index === 11 ? 'Verified' : '+2');
          }
        }
        else {
          if (e.text() === '-1') {
            state = 'minus-one';
            e.attr('title', '-1');
          }
          else if (e.text() === '+1') {
            state = 'plus-one';
            e.attr('title', '+1');
          }
        }

        e.empty()
        .append($('<div/>', { 'class': 'gerrit-state gerrit-state-' + state}));
      });
    }, 100);
  });

})(window);
