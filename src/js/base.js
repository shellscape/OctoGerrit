(function (root) {

  root.octogerrit = {
    version: '{{version}}'
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
