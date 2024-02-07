let taskList = [];

const taskListElm = document.getElementById("taskList");
const badkListElm = document.getElementById("badList");
const total = document.getElementById("total");

const handleOnSubmit = (e) => {
    const frm = new FormData(e);
    const task = frm.get("task");
    const hr = +frm.get("hr");
    const obj = { task, hr, type: "entry", id: randomStr() };
    taskList.push(obj);

    display();
    displayTotal();

};

const display = () => {
    let str = "";

    const entryList = taskList.filter((item) => item.type === "entry");
    
    const sumTask = entryList.reduce((acc, value) => {
        return acc + value.hr;
    }, 0);

   
    if(sumTask <= 168){
        entryList.map((item, i) => {
            str += `<tr>
            <td>${i + 1}</td>
            <td>${item.task}</td>
            <td>${item.hr} hrs</td>
            <td class="text-end">
              <button class="btn btn-danger"
              onclick="handleOnDelete('${item.id}')"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
              <button class="btn btn-success"
              onclick = "handleOnSwitch('${item.id}', 'bad')"
              >
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </td>
          </tr>`;
         
        });
        str += ` <tr>Sum: ${sumTask}</tr>`
        taskListElm.innerHTML = str;
    }
    else{
        alert("Entry List sum exceeded");
    }
   
};

const displayBad = () => {
    let str = "";

    const badList = taskList.filter((item) => item.type === "bad");

    const sumBad = badList.reduce((acc, value) => {

        return acc + value.hr;
    }, 0);
    if(sumBad <= 168){
        badList.map((item, i) => {
            str += `<tr>
            <td>${i + 1}</td>
            <td>${item.task}</td>
            <td>${item.hr} hrs</td>
            <td class="text-end">
            <button class="btn btn-warning"
            onclick = "handleOnSwitch('${item.id}', 'entry')"
            >
              <i class="fa-solid fa-arrow-left"></i>
            </button>
              <button class="btn btn-danger"
              onclick="handleOnDelete('${item.id}')"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </td>
          </tr>`;
        });
        str += ` <tr>Sum: ${sumBad}</tr>`
        badkListElm.innerHTML = str;
    }
    else{
        alert("Bad List sum exceeded");
    }
    
};

const handleOnDelete = (id) => {
    if (window.confirm("Are you sure you want to delet this task")) {
        taskList = taskList.filter((item) => item.id !== id);
        display();
        displayBad();
        displayTotal();
    }
};

const handleOnSwitch = (id, type) => {
    if (window.confirm("Are you sure you want to change the task type?")) {
        taskList.forEach((item) => {
            if (item.id == id) {
                item.type = type;
            }
        });
        display();
        displayBad();
    }
};

const charSrt = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

const randomStr = () => {
    const strLength = 6;
    let str = "";
    for (let i = 0; i < strLength; i++) {
        str += charSrt[Math.floor(Math.random() * charSrt.length)];
    }
    return str;
};



const displayTotal = () => {
    const entry = taskList.filter((item) => item.type === "entry");
    const sumT = entry.reduce((acc, value) => acc + value.hr, 0);

    const bad = taskList.filter((item) => item.type === "bad");
    const sumB = bad.reduce((acc, value) => acc + value.hr, 0);

    const totalSum = sumT + sumB;
    let str = "";
    if(totalSum <= 168){
        str += `<p>Total hours allocated per week = '${totalSum}'</p>`; 
        total.innerHTML = str;
    }
    else{
        alert("total hours sum exceeded");
    }
    
};
