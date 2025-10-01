
document.addEventListener('DOMContentLoaded', () => {
  const thumb = document.getElementById('profileImg');
  if (!thumb) {
    console.error('Lightbox: #profileImg not found.');
    return;
  }

  // Prevent adding multiple modals if script runs twice
  if (document.getElementById('__runtime_lightbox_overlay')) {
    console.log('Lightbox: overlay already exists.');
    return;
  }

  // Create overlay container (will be appended to body)
  function createOverlay(imgSrc, imgAlt) {
    const overlay = document.createElement('div');
    overlay.id = '__runtime_lightbox_overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      inset: '0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0,0,0,0.85)',
      zIndex: '2147483647', // massive z-index to beat anything
      cursor: 'auto',
      padding: '20px',
    });

    // close button
    const closeBtn = document.createElement('button');
    closeBtn.setAttribute('aria-label', 'Close image');
    closeBtn.innerHTML = '&times;';
    Object.assign(closeBtn.style, {
      position: 'fixed',
      top: '18px',
      right: '24px',
      fontSize: '36px',
      color: '#fff',
      background: 'transparent',
      border: 'none',
      cursor: 'pointer',
      zIndex: String(2147483648),
    });

    // image container (to prevent click-through)
    const imgWrap = document.createElement('div');
    Object.assign(imgWrap.style, {
      maxWidth: '98%',
      maxHeight: '98%',
      boxSizing: 'border-box',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
    });

    const img = document.createElement('img');
    img.src = imgSrc;
    img.alt = imgAlt || '';
    Object.assign(img.style, {
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
      height: 'auto',
      width: 'auto',
      userSelect: 'none',
    });

    // put pieces together
    imgWrap.appendChild(img);
    overlay.appendChild(imgWrap);
    overlay.appendChild(closeBtn);

    // events
    // close on closeBtn
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      overlay.remove();
    });

    // close when clicking outside the image (overlay area)
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });

    // ESC to close
    function onKey(e) {
      if (e.key === 'Escape') overlay.remove();
    }
    document.addEventListener('keydown', onKey);

    // Clean up key listener when overlay removed
    const observer = new MutationObserver(() => {
      if (!document.body.contains(overlay)) {
        document.removeEventListener('keydown', onKey);
        observer.disconnect();
      }
    });
    observer.observe(document.body, { childList: true, subtree: false });

    return overlay;
  }

  // Click handler to open runtime overlay
  thumb.style.cursor = 'pointer';
  thumb.addEventListener('click', (e) => {
    e.stopPropagation();
    const src = thumb.getAttribute('data-full') || thumb.src || thumb.getAttribute('src');
    if (!src) {
      console.error('Lightbox: no src found for thumbnail.');
      return;
    }
    const overlay = createOverlay(src, thumb.alt || 'Image');
    document.body.appendChild(overlay);
  });

  console.log('Runtime lightbox initialized. Click #profileImg to open.');
});
// 
// 
// 
	// Replace these with your EmailJS values
	const EMAILJS_PUBLIC_KEY = "-5Q_vU96kfwDNpHde";
	const EMAILJS_SERVICE_ID = "service_j57hkyk";
	const EMAILJS_TEMPLATE_ID = "template_bh14v5i";

	(function() {
		emailjs.init(EMAILJS_PUBLIC_KEY);
	})();

	// form handling
	(function() {
		const form = document.getElementById("contactform");
		if (!form) return;

		const successEl = document.getElementById("success");
		const errorEl = document.getElementById("error");
		const submitBtn = form.querySelector('button[type="submit"]');

		// hide messages initially
		if (successEl) successEl.style.display = "none";
		if (errorEl) errorEl.style.display = "none";

		form.addEventListener("submit", function (e) {
		e.preventDefault();

		// simple disable + UI feedback
		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.classList.add("opacity-50");
		}
		if (successEl) successEl.style.display = "none";
		if (errorEl) errorEl.style.display = "none";

		// send via EmailJS
		emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, this)
			.then(function(response) {
			// success UI
			if (successEl) successEl.style.display = "inline";
			if (errorEl) errorEl.style.display = "none";
			form.reset();
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.classList.remove("opacity-50");
			}
			}, function(err) {
			// error UI
			if (successEl) successEl.style.display = "none";
			if (errorEl) errorEl.style.display = "inline";
			console.error("EmailJS error:", err);
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.classList.remove("opacity-50");
			}
			});
		});
	})();