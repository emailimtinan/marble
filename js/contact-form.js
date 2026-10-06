(() => {
    const ACCESS_KEY = "43689e86-d78f-422c-887d-eb7e9cecc60a";
    const ENDPOINT = "https://api.web3forms.com/submit";

    function setupContactForms() {
        const forms = document.querySelectorAll('form[action="https://api.web3forms.com/submit"], form.framer-6j5orb');

        forms.forEach((form) => {
            if (form.dataset.web3formsReady === "true") return;
            form.dataset.web3formsReady = "true";

            form.addEventListener("submit", async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const submitBtn = form.querySelector('button[type="submit"]');
                const textElement = submitBtn?.querySelector("p") || submitBtn;
                const originalText = textElement?.textContent || "Send Your Request!";

                const formData = new FormData(form);
                formData.set("access_key", ACCESS_KEY);

                if (!formData.get("subject")) {
                    formData.set("subject", "New Marble Website Contact Request");
                }

                if (submitBtn) submitBtn.disabled = true;
                if (textElement) textElement.textContent = "Sending...";

                try {
                    const response = await fetch(ENDPOINT, {
                        method: "POST",
                        body: formData,
                        headers: {
                            Accept: "application/json"
                        }
                    });

                    const data = await response.json().catch(() => ({}));

                    if (response.ok && data.success !== false) {
                        alert("Success! Your message has been sent.");
                        form.reset();
                    } else {
                        alert("Error: " + (data.message || "Unable to send your message."));
                    }
                } catch (error) {
                    console.error("Web3Forms error:", error);
                    alert("Something went wrong. Please try again.");
                } finally {
                    if (textElement) textElement.textContent = originalText;
                    if (submitBtn) submitBtn.disabled = false;
                }
            }, true);
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", setupContactForms);
    } else {
        setupContactForms();
    }
})();
