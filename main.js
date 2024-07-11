
let one = document.createElement("span");
let two = document.createElement("span");
let three = document.createElement("span");
one.style.cssText = `
width:20px;
height:2px;
background-color: black;
margin:2px;

`;
two.style.cssText = `
width:20px;
height:2px;
background-color: black;
margin:2px;
`;
three.style.cssText = `
width:20px;
height:2px;
background-color: black;
margin:2px;
`;
let heading = document.querySelector(".heading");
let m = heading.nextElementSibling;
m.appendChild(one);
m.appendChild(two);
m.appendChild(three);




document.addEventListener("DOMContentLoaded", function () {
  let parts = document.querySelectorAll(".part");
  let content = document.querySelector(".content");

  parts.forEach((p) => {
      p.addEventListener("click", function () {
          getPart(p.id);
          getAllItemsContainingName(p.id);
          parts.forEach((item) => {
              item.style.cssText = ``;
          });

          p.style.cssText = `
              background-color: white;
              border-radius: 3mm;
              padding-left: 5px;
          `;
      });
  });

  function getPart(name) {
      content.innerHTML = "";
      let myDiv = document.createElement("div");
      myDiv.className = "headingcontent";
      myDiv.style.cssText = `
          display: flex;
          justify-content: space-between;
          padding: 20px;
      `;
      let btn = document.createElement("button");
      btn.textContent = "Add Task";
      btn.style.cssText = `
          background-color: dodgerblue;
          padding: 10px;
          color: white;
          border: none;
          border-radius: 3mm;
          cursor: pointer;
      `;
      btn.className = name;

      let head = document.createElement("h2");
      head.textContent = name;
      myDiv.appendChild(head);
      myDiv.appendChild(btn);
      content.appendChild(myDiv);
      secContent();
      
      btn.addEventListener("click", tempForm);
  }

  function CreateItem(tsk, desc, part) {
      let sec = document.querySelector(".maincontent");
      let item = document.createElement("div");
      item.className = "cart";
      let title = document.createElement("h2");
      let description = document.createElement("p");

      let del=document.createElement("button")
      del.className="btn-del"
      del.textContent="Delete"

      

      title.textContent = tsk;
      description.textContent = desc;

      // item.style.cssText = `
      //     width: calc(50% - 20px);
      //     height: calc(50% - 20px);
      //     background-color: hsl(110, 100%, 77%);
      //     border-radius: 3mm;
      //     padding: 10px;
      // `;
      item.appendChild(title);
      item.appendChild(description);
      item.appendChild(del)
      sec.appendChild(item);
      del.addEventListener("click",function(){
        window.localStorage.removeItem(`${part}.${tsk}`)
        item.remove()
      })
  }

  function secContent() {
      let secContent = document.createElement("div");
      secContent.className = "maincontent";
      secContent.style.cssText = `
          width: 90%;
          height: 90%;
          margin: auto;
          display: flex;
          flex-wrap: wrap;
          padding: 20px;
          gap: 30px;
      `;
      content.appendChild(secContent);
  }

  function tempForm() {
      let form = document.createElement("form");
      form.className = "form";
      form.style.cssText = `
          width: 20%;
          display: flex;
          flex-direction: column;
          z-index: 100;
          background-color: #eee;
          padding: 10px;
          transition: 0.5s;
      `;

      let input1 = document.createElement("input");
      let input2 = document.createElement("input");
      let span2=document.createElement("span")

      input1.className = "task";
      input2.className = "desc";

      input1.setAttribute("type", "text");
      input1.setAttribute("placeholder", "Task Type");
      input2.setAttribute("type", "text");
      input2.setAttribute("placeholder", "Description");

      let save = document.createElement("button");
      save.textContent = "Save";
      // save.style.cssText = `
      //     background-color: dodgerblue;
      //     padding: 10px;
      //     width: 100px;
      //     height: 40px;
      //     margin-left: 10px;
      //     color: white;
      //     border: none;
      //     border-radius: 3mm;
      //     cursor: pointer;
      // `;
      save.className = "save";
      save.setAttribute("type", "submit");

      form.appendChild(input1);
      form.appendChild(input2);
      form.appendChild(span2)
      form.appendChild(save);
      document.body.appendChild(form);

      save.addEventListener("click", function (event) {
          if(input2.value.length>280){
            span2.innerHTML="Max Length is 280"
            span2.style.color="red"
            span2.style.marginBottom="10px"
            event.preventDefault();
          }else{
          let taskName = input1.value;
          let description = input2.value;
          let partName = document.querySelector(".content h2").textContent;
          window.localStorage.setItem(`${partName}.${taskName}`, description);
          form.remove();
          CreateItem(taskName, description, partName);
          }
      });
  }

  function getAllItemsContainingName(name) {
      for (let i = 0; i < window.localStorage.length; i++) {
          let key = window.localStorage.key(i);
          if (key.includes(name)) {
              let taskName = key.split('.')[1];
              let description = window.localStorage.getItem(key);
              CreateItem(taskName, description, name);
          }
      }
  }
 
});
