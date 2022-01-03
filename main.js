(function () {
   
   let btn = document.querySelector("#createFolderButton");
   let divContainer = document.querySelector("#container");
   let myTemplates = document.querySelector("#myTemplates");
   let fid = 0;
   let folders = [];

//    load in the beginning

   btn.addEventListener("click",addFolder);

   function addFolder() {
    let fName = prompt("Enter the name of a folder")
    
    if(fName == null) {
        return;
    }

    if(!fName) {
        alert("Please enter something to create a folder");
        return;
    }
    
    let fidx = folders.findIndex(f=> f.name == fName);
    if(fidx == -1) {
        fid++;
        addFolderInPage(fName,fid);
        
        folders.push({
            id: fid,
            name: fName
        });
    } else {
        alert(fName + " Folder already exists");
    }
    persistFolders();
}

   function addFolderInPage(fName,fid) {
        let divFolderTemplate = myTemplates.content.querySelector(".folder");
        let divFolder = document.importNode(divFolderTemplate,true);
        
        let divName = divFolder.querySelector("[name='name']")
        divName.textContent = fName;

        let spanDelete = divFolder.querySelector("[action='delete']");

        spanDelete.addEventListener("click",deleteFolder);

        let spanEdit = divFolder.querySelector("[action='edit']");

        spanEdit.addEventListener("click",editFolder);
        
        divFolder.setAttribute("fid",fid);
        divContainer.appendChild(divFolder);

   }

   function deleteFolder() {
    let divFolder = this.parentNode;
    let divName = divFolder.querySelector("[name='name']");

    let flag = confirm("Are you sure you want to delete this folder? " + "Folder: " + divName.textContent);
    if(flag == false) {
        return;
    }

    divContainer.removeChild(divFolder);
    let idx = folders.findIndex(f => f.id == parseInt(divFolder.getAttribute("fid")));
    folders.splice(idx,1);
    persistFolders();
}

   function editFolder() {
        
        let divFolder = this.parentNode;
        let divName = divFolder.querySelector("[name='name']")
    
        let fName = prompt("Enter the name of the folder");

        if(fName == null) {
            return;
        }

        if(!fName) {
            alert("Enter a new Name for the folder " + divName.textContent);
            return;
        }

        let efid = parseInt(divFolder.getAttribute("fid"));

        let exists = folders.some(f=> f.name == fName && f.id != efid);
        if(exists) {
            alert("This folder already exists. Please enter a valid new name");
            return;
        }

        let sameName = folders.some(f => f.name == fName && f.id == efid);
        if(sameName) {
            alert(fName + " is already the name of this folder. Please try something unique");
            return;
        }

        divName.textContent = fName;
        let folder = folders.find(f=> f.id == parseInt(divFolder.getAttribute("fid")));
        folder.name = fName;
        persistFolders();
   }

   function persistFolders() {
       console.log(folders);
       let fjson = JSON.stringify(folders);
       localStorage.setItem("data",fjson);
   }

   function loadFoldersFromStorage() {
       let fjson = localStorage.getItem("data");
       if(!!fjson) {
        folders = JSON.parse(fjson);
        let maxID = -1;
        folders.forEach(function(f) {
            addFolderInPage(f.name,f.id);
            if(f.id > maxID) {
                maxID = f.id;

            }
        });
        fid = maxID;
       }
   }

   loadFoldersFromStorage();

})()