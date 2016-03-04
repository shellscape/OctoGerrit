(function (root) {

  root.octogerrit = {
    version: '1.0.2'
  };

  var head = document.getElementsByTagName('head')[0],
    link = document.createElement('link'),
    script = document.createElement('script'),
    callbacks = [];

  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css';
  link.media = 'all';

  script.id = 'jQuery';
  script.src = 'https://code.jquery.com/jquery-2.2.1.min.js';

  head.appendChild(link);
  head.appendChild(script);

  root.gerritReady = function gerritReady (callback) {
    callbacks.push(callback);
  };

  root.onload = function () {

    var old = root.gerrit_ui.__moduleStartupDone;

    root.gerrit_ui.__moduleStartupDone = function () {
      old.apply(old, arguments);

      // select the target node
      var target = document.querySelector('span.rpcStatus');

      // create an observer instance
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {

          var value = root.getComputedStyle(target).getPropertyValue('display');

          if (value === 'none') {
            // the last rpc operation is done, fire the ready handlers.
            for (var i = 0; i < callbacks.length; i++) {
              callbacks[i]();
            }
          }
        });
      });

      // configuration of the observer:
      var config = { attributes: true, attributeFilter: ['style'] };

      // pass in the target node, as well as the observer options
      observer.observe(target, config);
    };
  };

})(window);

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

(function (root) {

  gerritReady(function () {

    $('table.com-google-gerrit-client-change-ChangeScreen_BinderImpl_GenCss_style-labels td:nth-child(2)').each(function () {
      var e = $(this),
        stateTd = $('<td/>', { 'class': 'gerrit-review-state' });

      e.before(stateTd);
      e.find('> div > span')
      .appendTo(stateTd)
      .children().appendTo(e.find('> div'));
    });

    $('table.com-google-gerrit-client-change-ChangeScreen_BinderImpl_GenCss_style-labels td.gerrit-review-state span').each(function () {
      var e = $(this),
        text = e.text().trim(),
        state = 'none';

      if (text === '-2') {
        state = 'minus-two';
      }
      else if (text === '-1') {
        state = 'minus-one';
      }
      else if (text === '+2') {
        state = 'plus-two';
      }
      else if (text === '+1') {
        state = 'plus-one';
      }

      e.empty()
        .append($('<div/>', { 'class': 'gerrit-state gerrit-state-' + state}));

      e.parent()
        .addClass('gerrit-state-' + state)
        .parent().prev()
        .addClass('gerrit-state-' + state);
    });

    $('td.com-google-gerrit-client-change-FileTable-FileTableCss-commentColumn').each(function () {
      var e = $(this);
      e.html(e.html().replace('comments: ', ''));
    });

    $('td.com-google-gerrit-client-change-FileTable-FileTableCss-deltaColumn2').each(function () {
      var e = $(this),
        title = e.attr('title');

      if (!title) {
        return;
      }

      var blocks = $('<div/>', { 'class': 'gerrit-size'}),
        block = $('<span/>', { 'class': 'gerrit-size-block'}),
        regex = /(\d+) inserted, (\d+) deleted/,
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

  });

})(window);
