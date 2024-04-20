// Get the checkbox input element
const toggleSwitch = document.getElementById('toggleSwitch');

// Your JavaScript variable
let isSliderOn = true;

chrome.storage.local.get('isOn', function(result) {
    let myVariable = result.isOn;
    if(isSliderOn != undefined){
        isSliderOn = myVariable
        updateSwitch()
    }
    console.log('Retrieved variable from local storage:', myVariable);
  });

// Function to update the state of the switch based on the variable
function updateSwitch() {
  toggleSwitch.checked = isSliderOn;
}

// Initialize the switch state
updateSwitch();

// Event listener to handle switch toggle
toggleSwitch.addEventListener('change', function() {
    
  chrome.storage.local.set({ 'isOn': this.checked }, function() {
    console.log('Variable saved to local storage' + this.checked);
  });

  isSliderOn = this.checked;
  updateSwitch()
console.log(this.checked)

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // Get the active tab

    if(this.checked == true){
        const tab = tabs[0];

        // Reload the content script
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ['contentScript.js']
        });
    } else {
        const tab = tabs[0];
        console.log("RELOAD")
        // Reload the tab
        chrome.tabs.reload(tab.id);
    }
    
  });
});

// Example: Changing the variable value
