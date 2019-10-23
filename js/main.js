let deferredPrompt = null;

window.addEventListener("beforeinstallprompt", e => {
  console.log(e);
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
});
console.log(deferredPrompt);

async function install() {
  console.log("logg");
  if (deferredPrompt) {
    deferredPrompt.prompt();
    console.log(deferredPrompt);
    deferredPrompt.userChoice.then(function(choiceResult) {
      if (choiceResult.outcome === "accepted") {
        console.log("Your PWA has been installed");
      } else {
        console.log("User chose to not install your PWA");
      }

      deferredPrompt = null;
    });
  }
}
