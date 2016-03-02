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
