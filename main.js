(function () {
   
   let btn = document.querySelector("#createFolderButton");
   let divContainer = document.querySelector("#container");
   let myTemplates = document.querySelector("#myTemplates");

   btn.addEventListener("click",function() {
       let fName = prompt("Enter the name of a folder")
       
       if(fName == null) {
           return;
       }

       let divFolderTemplate = myTemplates.content.querySelector(".folder");
       let divFolder = document.importNode(divFolderTemplate,true);
       
       divFolder.innerHTML = fName;
       divContainer.appendChild(divFolder);
   });

})()