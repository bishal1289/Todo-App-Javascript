let arr = [];
      let txt = document.querySelector("#txt");
      let add = document.querySelector("#add");
      let mainDiv = document.querySelector("#mainDiv");
      let count = 1;

        /* CREATING OBJECT AND STORING INTO THE ARRAY */

      add.addEventListener("click", function () {
        let obj = {};
        obj.id = count;
        obj.title = txt.value;
        if (obj.title === "") {
          alert("Write Something");
        }
        else {
          arr.push(obj);
          addUI(obj);
          storeInLocalStorage();
        }
        obj.status = "Pending";
        count++;
        
      });

        /* FUNCTION TO APPEND ITEMS CHECKBOX AND DELETE BUTTON IN UI */

      function addUI(obj) {
        let div = document.createElement("div");
        div.classList.add('task-list-item');
        let span = document.createElement("span");
        let checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkbox");
        

        let deleteBtn = document.createElement("button");
        //deleteBtn.innerHTML = "Delete";
        deleteBtn.classList.add('delete-btn');

        span.innerHTML = obj.title;
        div.append(checkBox);
        div.append(span);
        div.append(deleteBtn);

        /* TO MAKE CHECKED ITEM STYLE TEXT-DECORATION : LINE-THROUGH */

        checkBox.addEventListener("click", function () {
          if (checkBox.checked === true) {
            span.style.textDecoration = "line-through";
            obj.status = "Completed";
            console.log(arr);
          } 
          else {
            obj.status = "Pending";
            span.style.textDecoration = "none";
          }
          storeInLocalStorage();
        });

        if (obj.status == "Completed") {
          checkBox.checked = true;
          span.style.textDecoration = "line-through";
        }

        deleteBtn.addEventListener("click", removeTask);

        /* TO REMOVE ITEM ON CLICK OF THE BUTTON FROM ARRAY AND UI*/

        deleteBtn.addEventListener("click", function () {
          arr = arr.filter((item) => {
            if (item.id != obj.id) {
              return true;
            }
          });
          console.log(arr);
          storeInLocalStorage();
        });

        mainDiv.append(div);
        txt.value = "";
        console.log(arr);
      }

          /* TO REMOVE THE ITEMS */

      function removeTask(e) {
        e.target.parentNode.remove();
      }

          /* FOR STROING THE DATA IN LOCALSTORAGE */

      function storeInLocalStorage() {
        localStorage.setItem("items", JSON.stringify(arr));
      }

            /* FOR GETTING THE DATA FROM LOCALSTORAGE */

      function getLocalStorage() {
        if (localStorage.getItem("items")) {
          arr = JSON.parse(localStorage.getItem("items"));
        }

        arr.forEach((element) => {
          addUI(element);
        });
      }

      getLocalStorage();