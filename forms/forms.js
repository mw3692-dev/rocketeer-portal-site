/* Rocketeer Portal form replacements — client validation + submit handling.
 *
 * TO GO LIVE when Google is retired, point each form at your backend by setting
 * the form's data-endpoint attribute (in the HTML) to one of:
 *   • Formspree:      data-endpoint="https://formspree.io/f/xxxxxxx"
 *   • Netlify Forms:  add `netlify` attr to <form> (no endpoint needed) — see README
 *   • Custom API:     data-endpoint="https://your.api/endpoint" (expects POST FormData/JSON)
 * With no endpoint set, the form validates and shows a local confirmation (demo mode).
 */
(function () {
  document.querySelectorAll('form.rsform').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors(form);
      if (!validate(form)) return;

      var endpoint = form.getAttribute('data-endpoint');
      if (endpoint) {
        var btn = form.querySelector('.submit');
        btn.disabled = true; btn.textContent = 'Submitting…';
        fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { 'Accept': 'application/json' } })
          .then(function (r) { if (!r.ok) throw new Error('bad status'); showDone(form); })
          .catch(function () { btn.disabled = false; btn.textContent = 'Submit';
            alert('Submission failed. Please try again or contact RTSupport@rocketstation.com.'); });
      } else {
        // demo mode — no backend wired yet
        showDone(form);
      }
    });
  });

  function validate(form) {
    var ok = true, firstBad = null;
    // native required fields
    form.querySelectorAll('input[required],select[required],textarea[required]').forEach(function (el) {
      var valid = el.type === 'radio'
        ? form.querySelector('input[name="' + CSS.escape(el.name) + '"]:checked')
        : el.value.trim() !== '' && el.checkValidity();
      if (!valid) { markBad(el); ok = false; firstBad = firstBad || el; }
    });
    // required checkbox groups
    form.querySelectorAll('[data-required-group="1"]').forEach(function (grp) {
      if (!grp.querySelector('input:checked')) {
        grp.classList.add('invalid'); addErr(grp, 'Please select at least one option.');
        ok = false; firstBad = firstBad || grp;
      }
    });
    if (firstBad) firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return ok;
  }
  function markBad(el) {
    var box = el.closest('.opt') || el;
    box.classList.add('invalid');
    var field = el.closest('.field');
    if (field && !field.querySelector('.err')) addErr(field, 'This field is required.');
  }
  function addErr(node, msg) {
    var e = document.createElement('div'); e.className = 'err'; e.textContent = msg; node.appendChild(e);
  }
  function clearErrors(form) {
    form.querySelectorAll('.invalid').forEach(function (n) { n.classList.remove('invalid'); });
    form.querySelectorAll('.err').forEach(function (n) { n.remove(); });
  }
  function showDone(form) {
    Array.prototype.forEach.call(form.children, function (c) {
      if (!c.classList.contains('form-done')) c.style.display = 'none';
    });
    var done = form.querySelector('.form-done');
    done.hidden = false; done.style.display = 'block';
    done.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();
