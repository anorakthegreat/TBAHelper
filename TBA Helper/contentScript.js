
var trElements = document.querySelectorAll('tr');
var divTeamInfo = document.getElementById('team-info');
var divTeamTitle = document.getElementById('team-title');
var teamSocial = document.getElementById('team-social-media');
let tableArray = []


chrome.storage.local.get('isOn', function(result) {
    // let isOnn = result.isOn

    // if(isOnn){
        if( String(document.location.href).includes("/event/")){
            if( !String(document.location.href).includes("#event-insights") && !String(document.location.href).includes("#media") && !String(document.location.href).includes("#teams") && !String(document.location.href).includes("#awards")&& !String(document.location.href).includes("#rankings")){
                editMatchHref()
                getAllianceData()
                reorder()
                forEventPage()
                test()
                goToBracket()
                console.log(tableArray)


            }
        }  else {
            reorderTeamPage()

            forTeamPage()
            editMatchHrefTeamPage()

        }
    // }




    
});

async function getAllianceDataForTeamPage(url){
  let bigArray = []
  const response = await fetch(url)
  const html = await response.text();

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  let table = tempDiv.querySelector('#event-alliances');
  let tbody = table.querySelector("tbody")
  let trAllianceElements = tbody.querySelectorAll("tr")

  trAllianceElements.forEach(tr => { 
      // console.log(tr)
      let allianceNumber = tr.querySelector("td")
      // let i = 0
      let alliance = []
      let tds = tr.querySelectorAll("td")
      // console.log("AHHH")
      if(allianceNumber){
          // console.log(allianceNumber)
      }
      tds.forEach(td => { 
          if(!td.textContent.includes("Alliance") ){
              let anchorElement = td.querySelector('a');
              if(anchorElement){
                alliance.push(td.textContent)

              }
          }

      })
      // console.log(alliance)
      bigArray.push(alliance)

  })
  // tableMatch = alliance
  return bigArray

}

async function reorderTeamPage(){
  let teamNumber = document.getElementById("team-title").textContent.trim()
  let secondSubstring = teamNumber.split(' ')[1];

  let extractedNumber = secondSubstring.replace(/\D/g, '');

 
  var divs = document.querySelectorAll('div');

  for(let div of divs){
    if(div.className == "row"){
      if(!(div.id == "")){
        let insideDivs = div.querySelectorAll("div")
        for(let div2 of insideDivs){

          let allData = []


          let aaa


          if(div2.className == "col-sm-4"){
            let h3 = div2.querySelector("h3")
            let a = h3.querySelector("a")
            // console.log(a.href)
            // console.log(await getAllianceDataForTeamPage(a.href))
            aaaa = a.href
            allData = await getAllianceDataForTeamPage(a.href)
            
          }

          if(div2.className == "col-sm-8"){
            let tbod = div2.querySelector("table > tbody")
            // console.log(tbod)
            let trs = tbod.querySelectorAll("tr")
            // console.log(aaaa)
            let allDatap = await getAllianceDataForTeamPage(aaaa)
            console.log(allDatap)

            trs.forEach((tr,index) => { 
              let redOrder = []
              let blueOrder = []

              let indicator

              let tds = tr.querySelectorAll("td")

              if(tr.className != "key"){
                if(tr.className == "hidden-lg"){
                  // console.log("TRUE")
                  // console.log(trs[index - 1].querySelectorAll("td")[1].textContent.trim())
                  indicator = trs[index - 1].querySelectorAll("td")[1].textContent.trim()
                  // console.log(tr)
                }else{
                  indicator = tr.querySelectorAll("td")[1].textContent.trim()
                  // console.log(tr.querySelectorAll("td")[1].textContent.trim())

                }
              }
              tds.forEach(td => { 
                // console.log(indicator )
                if(!indicator.includes("Quals")){
                  if(!(td.className == "") && !(td.className.includes("Score"))){
                    if(!(td.className == "") && !(td.className.includes("Score"))){
                      let number = td.textContent.trim()
                      for(let i = 0; i < allDatap.length; i++){
    
                        for(let z = 0; z < allDatap[i].length; z++){
                          if(allDatap[i][z] == number){
                            if(td.className.includes("red")){
                              redOrder[z] = number
                            } else{
                              blueOrder[z] = number
    
                            }
                          }
                        }
                      }
    
                    }
                  }
                }
                // console.log(td)
                
                  
                  // console.log(td)
                // }
              })
                // if(redOrder.length > 1){
                //   console.log(redOrder)
                // }

                // if(blueOrder.length > 1){
                //   console.log(blueOrder)

                // }

                let i = 0
                let z = 0
                tds.forEach(td => { 
                  if(!(td.className == "") && !(td.className.includes("Score")) && !indicator.includes("Quals")){
                   if(td.className.includes("red")){
                    if(redOrder[i] == undefined){
                      let existingAnchorElement = td.querySelector('a');

                      let existingHref = existingAnchorElement.href
                      let parts = existingHref.split('/'); // Split the string into an array based on '/'
                      let year = parts[parts.length - 1]; // Get the last element of the arra

                      let newAnchorElement = document.createElement('a');
                      newAnchorElement.href = '/team/' + redOrder[3] + "/" + year; // Set the href attribute of the new <a> element
                      newAnchorElement.textContent = "*" + redOrder[3] + "*"; // Set the text content of the new <a> element
                      newAnchorElement.setAttribute("target", "_blank");
                      newAnchorElement.style.color = "red"

                      // td.textContent = "*" + redOrder[3] +"*"
                      if (existingAnchorElement) {
                        td.replaceChild(newAnchorElement, existingAnchorElement);

                        if (td.className.includes("current-team")) {
                          // Replace the substring with an empty string
                          td.className = td.className.replace("current-team", '');
                        }

                        if(redOrder[3] == extractedNumber){
                          td.className = td.className + " current-team "
                        }

                      }
                      i++
                    } else{
                      let existingAnchorElement = td.querySelector('a');
                      let existingHref = existingAnchorElement.href
                      let parts = existingHref.split('/'); // Split the string into an array based on '/'
                      let year = parts[parts.length - 1]; // Get the last element of the arra

                      let newAnchorElement = document.createElement('a');
                      newAnchorElement.href = '/team/' + redOrder[i] + "/" + year; // Set the href attribute of the new <a> element
                      newAnchorElement.textContent = redOrder[i]; // Set the text content of the new <a> element
                      newAnchorElement.setAttribute("target", "_blank");

                      // td.textContent = "*" + redOrder[3] +"*"
                      if (existingAnchorElement) {
                        td.replaceChild(newAnchorElement, existingAnchorElement);
                        if (td.className.includes("current-team")) {
                          // Replace the substring with an empty string
                          td.className = td.className.replace("current-team", '');
                        }

                        if(redOrder[i] == extractedNumber){
                          td.className = td.className + " current-team "
                        }
                      }
                      i++

                    }
                   }else if(td.className.includes("blue")){
                    if(blueOrder[z] == undefined){

                      let existingAnchorElement = td.querySelector('a');
                      let existingHref = existingAnchorElement.href
                      let parts = existingHref.split('/'); // Split the string into an array based on '/'
                      let year = parts[parts.length - 1]; // Get the last element of the arra

                      let newAnchorElement = document.createElement('a');
                      newAnchorElement.href = '/team/' + blueOrder[3] + "/" + year; // Set the href attribute of the new <a> element
                      newAnchorElement.textContent = "*" + blueOrder[3] + "*"; // Set the text content of the new <a> element
                      newAnchorElement.setAttribute("target", "_blank");
                      newAnchorElement.style.color = "red"

                      // td.textContent = "*" + redOrder[3] +"*"
                      if (existingAnchorElement) {
                        td.replaceChild(newAnchorElement, existingAnchorElement);

                        if (td.className.includes("current-team")) {
                          // Replace the substring with an empty string
                          td.className = td.className.replace("current-team", '');
                        }

                        if(blueOrder[3] == extractedNumber){
                          td.className = td.className + " current-team "
                        }

                      }
                      z++
                    } else{

                      let existingAnchorElement = td.querySelector('a');
                      let existingHref = existingAnchorElement.href
                      let parts = existingHref.split('/'); // Split the string into an array based on '/'
                      let year = parts[parts.length - 1]; // Get the last element of the arra

                      let newAnchorElement = document.createElement('a');
                      newAnchorElement.href = '/team/' + blueOrder[z] + "/" + year; // Set the href attribute of the new <a> element
                      newAnchorElement.textContent = blueOrder[z]; // Set the text content of the new <a> element
                      newAnchorElement.setAttribute("target", "_blank");

                      // td.textContent = "*" + redOrder[3] +"*"
                      if (existingAnchorElement) {
                        td.replaceChild(newAnchorElement, existingAnchorElement);

                        if (td.className.includes("current-team")) {
                          // Replace the substring with an empty string
                          td.className = td.className.replace("current-team", '');
                        }
                        
                        if(blueOrder[z] == extractedNumber){
                          td.className = td.className + " current-team "
                        }
                        
                      }
                      z++

                    }
                   }

                  }

               })


            })
          }
        }

      }

    }
  }

}

async function editMatchHrefTeamPage(){
  for (const tr of trElements) {
    if(!(tr.className.includes("key"))){
      // console.log(tr)
      tdElements = tr.querySelectorAll("td")

      for (const td of tdElements) {  
        let anchorElement = td.querySelector('a');
        if(anchorElement){
          if(anchorElement.title == "Watch video"){
            console.log(td)
            let hrefAttributeValue = anchorElement.getAttribute('href');
            let youtube = await fetchDataAndExtractDivs("https://www.thebluealliance.com" + hrefAttributeValue, "a")
            anchorElement.href = youtube
            anchorElement.setAttribute('target', '_blank');

          }
        }
        
      }

    }
  }
}

async function editMatchHref(){
    for (const tr of trElements) {
        let className = tr.className;
        if (className == "visible-lg") {
            let firstTD = tr.querySelector("td")
            let a = firstTD.querySelector("a")
            if (a) {
                let hrefAttributeValue = a.getAttribute('href');

                // Await the asynchronous function call within the async function
                let youtube = await fetchDataAndExtractDivs("https://www.thebluealliance.com" + hrefAttributeValue, "a")
                // console.log(youtube)
                a.href = youtube
                a.setAttribute('target', '_blank');
            }
        }
    }

}

function getAllianceData(){
    let table = document.getElementById('event-alliances');
    let tbody = table.querySelector("tbody")
    let trAllianceElements = tbody.querySelectorAll("tr")

    trAllianceElements.forEach(tr => { 
        // console.log(tr)
        let allianceNumber = tr.querySelector("td")
        // let i = 0
        let alliance = []
        let tds = tr.querySelectorAll("td")
        // console.log("AHHH")
        if(allianceNumber){
            // console.log(allianceNumber)
        }
        tds.forEach(td => { 
            if(!td.textContent.includes("Alliance") ){
                let anchorElement = td.querySelector('a');
                if(anchorElement){
                  alliance.push(td.textContent)

                }
            }

        })
        // console.log(alliance)
        tableArray.push(alliance)

    })
    // tableMatch = alliance


}

function reorder(){
    let className = 'col-sm-6'; // Replace 'yourClassName' with the specific class name you want to query for
    let divsWithClassName = document.querySelectorAll(`div.${className}`);

    divsWithClassName.forEach(divs => {
        tables = divs.querySelectorAll("table")

        tables.forEach(table => { 
            if(table.id == "elim-match-table"){
                tbody = table.querySelector("tbody")

                let trs = tbody.querySelectorAll("tr")

                trs.forEach(tr => { 
                    // console.log("THIS IS THE TR")
                    let redOrder = []
                    let blueOrder = []

                    // if(tr.className.includes("hidden")){
                        let tds = tr.querySelectorAll("td")
                        tds.forEach(td => { 
                           if(!(td.className == "") && !(td.className.includes("Score"))){
                              let number = td.textContent.trim()
                              for(let i = 0; i < tableArray.length; i++){
                                for(let z = 0; z < tableArray[i].length; z++){
                                  if(tableArray[i][z] == number){
                                    if(td.className.includes("red")){
                                      redOrder[z] = number
                                    } else{
                                      blueOrder[z] = number

                                    }
                                  }
                                }
                              }

                           }

                        })
                        let i = 0
                        let z = 0
                        tds.forEach(td => { 
                          if(!(td.className == "") && !(td.className.includes("Score"))){
                           if(td.className.includes("red")){
                            if(redOrder[i] == undefined){
                              let existingAnchorElement = td.querySelector('a');

                              let existingHref = existingAnchorElement.href
                              let parts = existingHref.split('/'); // Split the string into an array based on '/'
                              let year = parts[parts.length - 1]; // Get the last element of the arra

                              let newAnchorElement = document.createElement('a');
                              newAnchorElement.href = '/team/' + redOrder[3] + "/" + year; // Set the href attribute of the new <a> element
                              newAnchorElement.textContent = "*" + redOrder[3] + "*"; // Set the text content of the new <a> element
                              newAnchorElement.setAttribute("target", "_blank");
                              newAnchorElement.style.color = "red"

                              // td.textContent = "*" + redOrder[3] +"*"
                              if (existingAnchorElement) {
                                td.replaceChild(newAnchorElement, existingAnchorElement);

                              }
                              i++
                            } else{
                              let existingAnchorElement = td.querySelector('a');
                              let existingHref = existingAnchorElement.href
                              let parts = existingHref.split('/'); // Split the string into an array based on '/'
                              let year = parts[parts.length - 1]; // Get the last element of the arra

                              let newAnchorElement = document.createElement('a');
                              newAnchorElement.href = '/team/' + redOrder[i] + "/" + year; // Set the href attribute of the new <a> element
                              newAnchorElement.textContent = redOrder[i]; // Set the text content of the new <a> element
                              newAnchorElement.setAttribute("target", "_blank");

                              // td.textContent = "*" + redOrder[3] +"*"
                              if (existingAnchorElement) {
                                td.replaceChild(newAnchorElement, existingAnchorElement);

                              }
                              i++

                            }
                           }else if(td.className.includes("blue")){
                            if(blueOrder[z] == undefined){

                              let existingAnchorElement = td.querySelector('a');
                              let existingHref = existingAnchorElement.href
                              let parts = existingHref.split('/'); // Split the string into an array based on '/'
                              let year = parts[parts.length - 1]; // Get the last element of the arra

                              let newAnchorElement = document.createElement('a');
                              newAnchorElement.href = '/team/' + blueOrder[3] + "/" + year; // Set the href attribute of the new <a> element
                              newAnchorElement.textContent = "*" + blueOrder[3] + "*"; // Set the text content of the new <a> element
                              newAnchorElement.setAttribute("target", "_blank");
                              newAnchorElement.style.color = "red"

                              // td.textContent = "*" + redOrder[3] +"*"
                              if (existingAnchorElement) {
                                td.replaceChild(newAnchorElement, existingAnchorElement);

                              }
                              z++
                            } else{

                              let existingAnchorElement = td.querySelector('a');
                              let existingHref = existingAnchorElement.href
                              let parts = existingHref.split('/'); // Split the string into an array based on '/'
                              let year = parts[parts.length - 1]; // Get the last element of the arra

                              let newAnchorElement = document.createElement('a');
                              newAnchorElement.href = '/team/' + blueOrder[z] + "/" + year; // Set the href attribute of the new <a> element
                              newAnchorElement.textContent = blueOrder[z]; // Set the text content of the new <a> element
                              newAnchorElement.setAttribute("target", "_blank");

                              // td.textContent = "*" + redOrder[3] +"*"
                              if (existingAnchorElement) {
                                td.replaceChild(newAnchorElement, existingAnchorElement);
                                
                              }
                              z++

                            }
                           }

                          }

                       })
                      // console.log(redOrder)
                      // console.log(blueOrder)

                    // }
                })

            }
        })

    }) 

}



async function fetchDataAndExtractDivs(url, targetId) {
    targetId = "youtube"


            const response = await fetch(url);
            const html = await response.text();

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html;
            // return "bleh"

            const divsWithId = tempDiv.querySelectorAll(`div[id*="${targetId}"]`);
            // let url = 
            if (divsWithId.length > 0) {

                // Loop through the matched divs and log or manipulate them
                // divsWithId.forEach(div => {
                for(const div of divsWithId){
                    let idAttributeValue = div.getAttribute('id');
                    let modifiedString = idAttributeValue.replace("youtube_", "");
                    return "https://www.youtube.com/watch?v=" + modifiedString
                    // console.log("IM HERE")
                    // return ("IM HERE")

                }

                
                // });
            } else {
                console.error(`No divs containing ID "${targetId}" found`);
            }

            // })
        
        
}



function goToBracket(){
  const h3Elements = document.querySelectorAll('h3');
  let playoff = document.getElementById("double-elim-bracket-table")

  h3Elements.forEach(h3 => { 
    if(h3.textContent.includes("Playoff Results")){
      h3.addEventListener('click', function() {
        // Scroll to a specific position on the page
        // window.scrollTo(0, 2750); // Adjust the vertical position as needed
        let targetTop = playoff.getBoundingClientRect().top;
        let offset = targetTop - 200; // Adjust the value as needed
        window.scrollBy({ top: offset, behavior: 'smooth' });
      });

      h3.style.cursor = 'pointer';


      h3.addEventListener('mouseenter', function() {
        // Translate the element upward by 5 pixels and underline it
        h3.style.textDecoration = 'underline';
        h3.style.color = '';
      });
      
      h3.addEventListener('mouseleave', function() {
        // Reset the styles when mouse leaves
        h3.style.textDecoration = 'none';
        h3.style.color = '';
      });

      h3.addEventListener('mousedown', function() {
        // Change the text color to red when clicked
        h3.style.color = 'blue';
      });

      document.addEventListener('mouseup', function(event) {
        // Check if the mouseup event is outside the h3 element
        if (!h3.contains(event.target)) {
          // Reset the text color
          h3.style.color = ''; // Reset to the default color
        }
      }, { once: true }); // Use 'once: true' to remove the listener after it's triggered once
    }
  })

  
}

function test(){
    const commonAncestor = document.getElementById('double-elim-bracket-table');

    // console.log(commonAncestor)
if (commonAncestor) {
  // Add event listener to the common ancestor
  commonAncestor.addEventListener('mouseover', function(event) {
//    console.log(event.target.tagName)
  // console.log("IN")

   if (event.target.tagName === 'TD') {
    if(event.target.textContent.includes("-")){
    // event.target.style.backgroundColor = 'lightblue';
    // console.log("I RUN")
    let numbersString = event.target.textContent
    const numbersArray = numbersString.split("-").map(number => number.trim());

    const firstNumber = numbersArray[0];

    // console.log(firstNumber); // Output: "1678"
    // console.log(event.target.textContent.trim())
    ahh(event.target.textContent.trim(), true)
    }
    
  
  }
  // console.log(event.target.tagName)

  if (event.target.tagName === 'A') {
    var parentElement = event.target.parentNode;
    var grandParent = parentElement.parentNode;

    if(grandParent.textContent.includes("-")){
    //    grandParent.style.backgroundColor = 'lightblue';
        // console.log("I RUN")
        let numbersString = event.target.textContent
        const numbersArray = numbersString.split("-").map(number => number.trim());
    
        const firstNumber = numbersArray[0];
    
        // console.log(firstNumber); // Output: "1678"
        // console.log(event.target.textContent.trim())
        ahh(grandParent.textContent.trim(), true)
        }
        
  }

  if (event.target.tagName === 'SPAN') {
    var grandParent = event.target.parentNode;

    if(grandParent.textContent.includes("-")){
       grandParent.style.backgroundColor = 'lightblue';
        // console.log("I RUN")
        let numbersString = event.target.textContent
        const numbersArray = numbersString.split("-").map(number => number.trim());
    
        const firstNumber = numbersArray[0];
    
        // console.log(firstNumber); // Output: "1678"
        // console.log(event.target.textContent.trim())
        ahh(grandParent.textContent.trim(), true)
        }
    // console.log("SPPPPPPAN")
        
  }

  if (event.target.tagName === 'TD') {
    if(!(event.target.textContent.trim() === '')){
      let parent = event.target.parentNode;
      let tdElements = parent.querySelectorAll('td');
  
      tdElements.forEach(td => { 
        if(td.textContent.includes("-")){
          //    grandParent.style.backgroundColor = 'lightblue';
              // console.log("I RUN")
              let numbersString = event.target.textContent
              const numbersArray = numbersString.split("-").map(number => number.trim());
          
              const firstNumber = numbersArray[0];
          
              // console.log(firstNumber); // Output: "1678"
              // console.log(event.target.textContent.trim())
  
              
              ahh(td.textContent.trim(), true)
              }
      })
    } else {
      // console.log("I REJECTED IT")
    }
    

      
  }
  });

  // Add event listener to reset the hover effect on mouseout
  commonAncestor.addEventListener('mouseout', function(event) {
    // console.log("OUT")
    // event.target.style.backgroundColor = '';
    ahh("OVERRIDE", false)


  });
}
}

function ahh(string, isHighlighting){
// console.log("BEGIN ")

  let nest
  const table = document.getElementById('double-elim-bracket-table');

  // Find all <tr> elements within the <tbody> of the table
  const trElements = table.querySelectorAll('tbody tr');

    // Iterate over each <tr> element
    trElements.forEach(tr => {
        // Find the nested <table> element within the <div> structure
        const nestedTable = tr.querySelector('td div > div > table');
        // Check if nestedTable exists
        if (nestedTable) {
        // Perform actions on the nested table
        //   console.log(nestedTable);
        nest = nestedTable

        }
    });



    // Now you have both tr elements, and you can work with them
    trElements.forEach(tr => {
        // console.log(tr)
      // Perform actions on each tr element
      const tdElement = tr.querySelectorAll('td');

      tdElement.forEach(td => {
        
        if (td && td.classList.contains('match')) {
                // console.log(td)

              let tableMatch = td.querySelector('div > div > table > tbody');
              // console.log(tableMatch)
              let tableMatchTr = tableMatch.querySelectorAll("tr")
              tableMatchTr.forEach(tr => { 
                let winner = false

                let tds = tr.querySelectorAll("td")
                

                tds.forEach(td => { 
                  if(td.classList.contains("winner"))  {
                    winner = true
                  }
                  if(td.classList.length === 0){
                    let spans = td.querySelectorAll("span")

                    spans.forEach(span => { 
                      if(span){
                        // console.log(span.textContent)
                        if(span.textContent.trim() == string  || string == "OVERRIDE"){
                          if(isHighlighting){

                            let specialContentElement = span.querySelector('.special-content');
                            if (!specialContentElement) {
                              
                            

                            td.style.backgroundColor = 'lightblue';
                            td.style.boxShadow = '0 0 5px rgba(0, 0, 0, 5)';
                            td.style.transform = 'translateY(-2px)';

                            if(winner){
                              let checkMark = document.createElement('span');
                              checkMark.textContent = '✅';
                              checkMark.style.color = 'green'; // Optional: Set the color
                              checkMark.className = 'special-content'; // Set the class name
                              checkMark.style.pointerEvents = 'none'; // Set pointer events to none

                              span.appendChild(checkMark)
                            } else {
                              let redX = document.createElement('span');
                              redX.textContent = '❌';
                              redX.style.color = 'red'; // Optional: Set the color
                              redX.className = 'special-content'; // Set the class name
                              redX.style.pointerEvents = 'none'; // Set pointer events to none

                              span.appendChild(redX);

                            }
                          }
                          } else{
                            
                            let specialContentElement = span.querySelector('.special-content');
                            if (specialContentElement) {
                              // Remove the special content element
                              specialContentElement.remove();
                            }
                            td.style.backgroundColor = '';
                            td.style.transform = '';
                            td.style.boxShadow = '';

                            // console.log("I SET IT BACK")

                          }
  
                        }
                      }
                      

                    })


                  }

                })
              })
            }
        })

    });
}


function validateEventPage(){

let score = 0
var colSm12 = document.querySelectorAll('div.col-sm-12');
colSm12.forEach(function(div) { 
    var h1Exists = div.querySelector('h1') !== null;
    var h3Exists = div.querySelector('h3') !== null;
    if(h1Exists || h3Exists){
        return
    }


    var ulElements = div.querySelectorAll('ul');
    ulElements.forEach(function(ul) { 

        var liElements = ul.querySelectorAll("li")
        liElements.forEach(function(li) { 

            var anchorElement = li.querySelector('a');

            if (anchorElement) {
                var href = anchorElement.getAttribute('href');
                if(href == "#results" || href == "#rankings" || href == "#awards" || href == "#teams" || href == "#event-insights" || href == "#media"){
                    score++
                }
                // console.log(href)
            }

        })

    })

})   

return score

}






function forEventPage(){

    if(document.location.href.includes("#rankings")){
        return
    }

    trElements.forEach(function(tr) {   
        var tdElements = tr.querySelectorAll('td');
        let blueScore = 0;
        let redScore = 0;
        let isNA = false;

        if(tr.className == "key"){
            // console.log("AHHAHAHA")
            var newTd = document.createElement('th');
            // newTd.textContent = 'AHAHAHAHAH?';
            tr.appendChild(newTd);
            return;
        }

        if(tr.parentElement.tagName == "THEAD" && tr.className != "key"){
            // console.log(tr.lastElementChild.textContent)
            if(!tr.lastElementChild.textContent.includes("Ranking") && !tr.lastElementChild.textContent.includes("Image") && !tr.lastElementChild.textContent.includes("Winner") && !tr.lastElementChild.textContent.includes("Ranking")&& !tr.lastElementChild.textContent.includes("OPR")){
                var newTd = document.createElement('th');
                newTd.textContent = 'Win?';
                tr.appendChild(newTd);
                return;
            }
            
        }  
        
        
    
        if(tr.className != "visible-lg"){
            return
        }


        tdElements.forEach(function(td) { 
            var spanElements2 = td.querySelectorAll('span');

            spanElements2.forEach(function(span) { 
                if(span.hasAttribute("title")){
                    if(span.getAttribute("title").includes("Scheduled")){
                        isNA = true
                        return
                    }
                }
            })

            let isOnRedTeam = null
            if(!td.className.includes("Score")){
                return
            }

            if(td.className.includes("redScore")){
                isOnRedTeam = true
            } else{
                isOnRedTeam = false
            }

            var spanElements = td.querySelectorAll('span');

            spanElements.forEach(function(span) {
                if(isOnRedTeam){
                    redScore = span.textContent
                } else {
                    blueScore = span.textContent
                }

                
            })

        })   

        let vari = ""
        var newTd = document.createElement('td');
        newTd.style.border =  '1px solid black'

        

        if(parseInt(redScore) > parseInt(blueScore)){
            vari = "RED Won"
            newTd.style.backgroundColor = 'rgb(236 110 110)' //"#ee5151"

        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
            newTd.style.backgroundColor = "#f9d663"

        } else if(parseInt(blueScore) > parseInt(redScore)){
            vari = "BLUE Won"
            newTd.style.backgroundColor = 'rgb(153 147 241)' //"#796ffd"

        } else {
            vari = "N/A"
            newTd.style.backgroundColor = "#bfd7e8"

        }

        if(isNA){
            // console.log("IS NAAAA")
            vari = "N/A"
        }

        newTd.textContent = vari;
        tr.appendChild(newTd);
    })

}



function forTeamPage(){

var element = document.getElementById("team-title");
if(element){
    var textContent = element.textContent;
    var image = element.querySelector("img")

    if(image){
        image = image.cloneNode(true);
    }

    if(image){
        // Clone the image element inside the <h2> element

        // Split the text content by the '-' character
        var parts = textContent.split('-');

        // Get the first part and trim whitespace
        var teamInfo = parts[0].trim();

        // Extract the team number (assuming it's always the first word)
        var teamNumber = parseInt(teamInfo.split(' ')[1]);

        // Create a new <a> element
        var link = document.createElement("a");

        // Create the href attribute value
        var href = "https://www.statbotics.io/team/" + teamNumber;

        // Set the href attribute of the <a> element
        link.setAttribute("href", href);

        // Optionally, you can set the target attribute to open the link in a new tab
        link.setAttribute("target", "_blank");

        link.style.fontSize = "30px"; // Set font size to 20 pixels
        link.style.color = "black";   // Set text color to black




// Append the cloned image to the <a> element
link.appendChild(image);

// Set the text content of the <a> element
link.appendChild(document.createTextNode(textContent));

// Replace the original element with the <a> element
element.parentNode.replaceChild(link, element);
    }
    
}
trElements.forEach(function(tr) {   
    // Find the <span> element inside the <td>
    var tdElements = tr.querySelectorAll('td');
    var thElements = tr.querySelectorAll('th');

    let blueScore = 0;
    let redScore = 0;
    let isTeamBlue = null;

    if(divTeamInfo && divTeamTitle && teamSocial){

    }else{
        return
    }
    

    if(tr.parentElement.tagName == "THEAD"){
        // console.log("RAHHHHHHHHHHHHHHHHH")
        var newTd = document.createElement('th');
        newTd.textContent = 'Win?';
        tr.appendChild(newTd);
        return;
    }  
    
    if(tr.className == "key"){
        // console.log("AHHAHAHA")
        var newTd = document.createElement('th');
        // newTd.textContent = 'AHAHAHAHAH?';
        tr.appendChild(newTd);
        return;
    }

    if(tr.className != "visible-lg"){
        return
    }

    


    tdElements.forEach(function(td) {
        let isOnBlueScore = null

        if(td.className.includes("current-team")){
            if(td.className.includes("blueScore")){
                isTeamBlue = true
            } else{
                isTeamBlue = false
            }
        }

        if(td.className.includes("red")){
            isOnBlueScore = false
        } else{
            isOnBlueScore = true
        }

        if(isTeamBlue == null || isOnBlueScore == null){
            return
        }



        var spanElements = td.querySelectorAll('span');

        spanElements.forEach(function(span) {

            if(span.hasAttribute("title")){
                if(span.getAttribute("title").includes("Scheduled")){
                    blueScore = "N/a"
                    redScore = "N/a"
                    // console.log("ITS N?A")
                    return
                }
            }
            

            // console.log("Class name of the <span> element:", span.className);
            if(isOnBlueScore){
                blueScore = span.textContent
            } else{
                redScore = span.textContent
            }


        });
    });

    
    var vari = ""

    if(isTeamBlue){
        if(parseInt(blueScore) > parseInt(redScore)){
            vari = "WIN"
        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
        } else{
            vari = "LOSS"
        }
    } else{
        if(parseInt(redScore) > parseInt(blueScore)){
            vari = "WIN"
        } else if(parseInt(redScore) == parseInt(blueScore)){
            vari = "TIE"
        } else{
            vari = "LOSS"
        }
    }

    if(blueScore == "N/a"){
        vari = "N/A"

    }

    var newTd = document.createElement('td');
    newTd.textContent = vari;

    if(vari == "WIN"){
        newTd.style.backgroundColor = "#5fd99a"
    } else if(vari == "TIE"){
        newTd.style.backgroundColor = "#f9d663"
    }else if(vari == "LOSS"){
        newTd.style.backgroundColor = "#eb5e5e" 
    } else{
        newTd.style.backgroundColor = "#bfd7e8"

    }

    tr.appendChild(newTd);

    
});
}