/**
 * Interactive recovery diagram (hub-and-spoke steward visualization).
 * Vanilla-JS port of the app's onboarding KeyDiagram widget.
 * Mounts on every [data-key-diagram] element found on the page.
 */
(function () {
  'use strict';

  var RADIUS_PCT = 38;
  var STEP_INTERVAL_MS = 450;
  var RESET_DELAY_MS = 1400;

  function createDiagram(root) {
    var visual = root.querySelector('[data-diagram-visual]');
    var statusEl = root.querySelector('[data-diagram-status]');
    var stewardSlider = root.querySelector('[data-steward-slider]');
    var thresholdSlider = root.querySelector('[data-threshold-slider]');
    var stewardValue = root.querySelector('[data-steward-value]');
    var thresholdValue = root.querySelector('[data-threshold-value]');
    var simulateBtn = root.querySelector('[data-simulate-btn]');

    var state = {
      stewardCount: parseInt(root.dataset.stewards, 10) || 5,
      threshold: parseInt(root.dataset.threshold, 10) || 3,
      recovering: false,
      recoveryStep: 0,
    };
    var timer = null;

    function render() {
      var n = state.stewardCount;
      var threshold = state.threshold;

      // Clear previously rendered stewards/spokes (keep the vault icon).
      visual.querySelectorAll('.steward, .spoke').forEach(function (el) {
        el.remove();
      });

      for (var i = 0; i < n; i++) {
        var deg = (i * 360) / n - 90;
        var rad = (deg * Math.PI) / 180;
        var leftPct = 50 + RADIUS_PCT * Math.cos(rad);
        var topPct = 50 + RADIUS_PCT * Math.sin(rad);
        var checked = state.recovering && i < state.recoveryStep;

        var spoke = document.createElement('div');
        spoke.className = 'spoke' + (checked ? ' spoke--active' : '');
        spoke.style.width = RADIUS_PCT + '%';
        spoke.style.transform = 'rotate(' + deg + 'deg)';
        visual.appendChild(spoke);

        var steward = document.createElement('div');
        steward.className = 'steward';
        steward.style.left = leftPct + '%';
        steward.style.top = topPct + '%';

        var circle = document.createElement('div');
        circle.className = 'steward-circle';
        var head = document.createElement('div');
        head.className = 'steward-head';
        var shoulders = document.createElement('div');
        shoulders.className = 'steward-shoulders';
        circle.appendChild(head);
        circle.appendChild(shoulders);
        steward.appendChild(circle);

        if (checked) {
          var check = document.createElement('span');
          check.className = 'steward-check';
          check.textContent = '✓';
          steward.appendChild(check);
        }

        visual.appendChild(steward);
      }

      var statusText = n + ' stewards, any ' + threshold + ' can recover the vault';
      if (state.recovering) {
        statusText =
          state.recoveryStep >= threshold
            ? 'Vault recovered — ' + threshold + ' of ' + n + ' approved'
            : 'Recovering… ' + state.recoveryStep + ' of ' + threshold + ' approved';
      }
      statusEl.textContent = statusText;

      stewardSlider.value = n;
      stewardValue.textContent = n;
      thresholdSlider.max = n;
      thresholdSlider.value = threshold;
      thresholdValue.textContent = threshold;
    }

    function onStewardChange() {
      var n = parseInt(stewardSlider.value, 10);
      state.stewardCount = n;
      state.threshold = Math.min(state.threshold, n);
      render();
    }

    function onThresholdChange() {
      state.threshold = parseInt(thresholdSlider.value, 10);
      render();
    }

    function simulate() {
      if (state.recovering) return;
      if (timer) clearInterval(timer);
      var threshold = state.threshold;
      state.recovering = true;
      state.recoveryStep = 0;
      render();

      var step = 0;
      timer = setInterval(function () {
        step += 1;
        if (step >= threshold) {
          clearInterval(timer);
          state.recoveryStep = step;
          render();
          setTimeout(function () {
            state.recovering = false;
            state.recoveryStep = 0;
            render();
          }, RESET_DELAY_MS);
        } else {
          state.recoveryStep = step;
          render();
        }
      }, STEP_INTERVAL_MS);
    }

    stewardSlider.addEventListener('input', onStewardChange);
    thresholdSlider.addEventListener('input', onThresholdChange);
    simulateBtn.addEventListener('click', simulate);

    render();
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-key-diagram]').forEach(createDiagram);
  });
})();
