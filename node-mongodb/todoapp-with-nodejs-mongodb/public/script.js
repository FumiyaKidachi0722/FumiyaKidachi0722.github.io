// const task = require("../models/Task");
// const { events } = require("../models/Task");

const tasksDOM     = document.querySelector(".tasks");
const fromDOM      = document.querySelector(".task-from");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasksからタスクを読み込む
const showTasks = async () => {
    try {
        //自作APIをたたく
        // const tasks = await axios.get("/api/v1/tasks");
        const {data: tasks} = await axios.get("/api/v1/tasks");
        console.log(tasks);

        //タスクが1つもないとき
        if(tasks.length < 1){
            tasksDOM.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`
            return;
        }

        //タスクを出力
        const allTasks = tasks.map((task) => {
            const { completed, _id, name } = task;
            // console.log(name)
            // console.log(task.name)
            return `
            <div class="single-task ${completed && "task-completed"}">
                <h5><span><i class="far fa-check-circle"></i>${ name }</span></h5>
                <div class="task-links">
                    <!-- 編集リンク -->
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <!-- ゴミ箱 -->
                    <button class="delete-btn" data-id="${_id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>`;
        })
        //カンマをなくして連結させる
        .join("");
        console.log(allTasks);
        tasksDOM.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
}

showTasks();

//タスクを新規作成する
fromDOM.addEventListener("submit", async (event) => {
    //再リロードの阻止
    event.preventDefault();
    const name = taskInputDOM.value;

    try {
        await axios.post("/api/v1/tasks", {name: name});
        showTasks();
        taskInputDOM.value = "";
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "タスクを追加しました";
        formAlertDOM.classList.add("text-success");
    } catch (err) {
        console.log(err)
        formAlertDOM.style.display = "block";
        formAlertDOM.innerHTML = "無効です。もう一度やり直してください";
    }
    setTimeout(() => {
        formAlertDOM.style.display = "none";
        formAlertDOM.classList.remove("text-success");
    }, 3000);
});

//タスクを削除する
tasksDOM.addEventListener("click", async (event) => {
    const element = event.target;
    // console.log(element.parentElement);
    if(element.parentElement.classList.contains("delete-btn")){
        const id = element.parentElement.dataset.id;
        // console.log(id);
        try {
            console.log(id);
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (err) {
            console.log(err);
        }
    }
});
