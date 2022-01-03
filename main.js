(function () {
   
   let btn = document.querySelector("#createFolderButton");
   let divContainer = document.querySelector("#container");
   let myTemplates = document.querySelector("#myTemplates");
   let fid = 0;

   btn.addEventListener("click",function() {
       let fName = prompt("Enter the name of a folder")
       
       if(fName == null) {
           return;
       }

       let divFolderTemplate = myTemplates.content.querySelector(".folder");
       let divFolder = document.importNode(divFolderTemplate,true);
       
       let divName = divFolder.querySelector("[name='name']")
       divName.textContent = fName;

       let spanDelete = divFolder.querySelector("[action='delete']");

       spanDelete.addEventListener("click",function() {
           let flag = confirm("Are you sure you want to delete this folder?" + "Folder: " + divName.textContent);
           if(flag == false) {
               return;
           }

           divContainer.removeChild(divFolder);
       });

       let spanEdit = divFolder.querySelector("[action='edit']");

       spanEdit.addEventListener("click",function() {
           let fName = prompt("Enter the name of the folder");
           if(fName == null) {
               return;
           }

           divName.textContent = fName;
       })
        
       divFolder.setAttribute("fid",++fid);
       divContainer.appendChild(divFolder);
   });

})()