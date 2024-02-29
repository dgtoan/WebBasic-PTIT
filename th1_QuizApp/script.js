let quizzData;

function startQuizz() {
    if (!isValidInfo()) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
    loadData();
}

function isValidInfo() {
    var name = document.getElementById("full-name").value;
    var dob = document.getElementById("dob").value;
    var studentId = document.getElementById("student-id").value;
    var classId = document.getElementById("class-id").value;

    return name && dob && studentId && classId
}

function loadData() {
    const jsonFile = "data.json";
    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            quizzData = data;
            showQuestions();
        });
}

function showQuestions() {
    document.getElementById("student-info").style.display = "none";
    const quizzContainer = document.getElementById("quizz-container");
    quizzContainer.style.display = "block";

    quizzContainer.innerHTML += showTrueFalseQuestion(quizzData.trueFalseQuestions, 1);
    quizzContainer.innerHTML += showOneChoiceQuestion(quizzData.oneChoiceQuestions, 11);
    quizzContainer.innerHTML += showMultipleChoiceQuestion(quizzData.multipleChoiceQuestions, 21);
    quizzContainer.innerHTML += showTextQuestion(quizzData.textQuestions, 31);

    quizzContainer.innerHTML += "<button class='btn btn-primary w-100 py-2 mt-3 mb-5' onclick='submitQuizz()'>Nộp bài</button>";
}

function showTrueFalseQuestion(questions, startId) {
    let html = '';

    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        html += `
            <div class="question my-4">
                <p class="m-0">${startId + i}. ${question.question}</p>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="tfq${startId + i}" id="true-${i}" value="1">
                    <label class="form-check-label" for="true-${i}">Đúng</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="tfq${startId + i}" id="false-${i}" value="0">
                    <label class="form-check-label" for="false-${i}">Sai</label>
                </div>
            </div>`;
    }
    return html;
}

function showOneChoiceQuestion(questions, startId) {
    let html = '';
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        html += `
            <div class="question my-4">
                <p class="m-0">${startId + i}. ${question.question}</p>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${startId + i}" id="one-choice-${i}-0" value="0">
                    <label class="form-check-label" for="one-choice-${i}-1">${question.answers[0]}</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${startId + i}" id="one-choice-${i}-1" value="1">
                    <label class="form-check-label" for="one-choice-${i}-2">${question.answers[1]}</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${startId + i}" id="one-choice-${i}-2" value="2">
                    <label class="form-check-label" for="one-choice-${i}-3">${question.answers[2]}</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="radio" name="ocq${startId + i}" id="one-choice-${i}-3" value="3">
                    <label class="form-check-label" for="one-choice-${i}-4">${question.answers[3]}</label>
                </div>
            </div>`;
    }
    return html;
}

function showMultipleChoiceQuestion(questions, startId) {
    let html = '';
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        html += `
            <div class="question my-4">
                <p class="m-0">${startId + i}. ${question.question}</p>
                <div class="form-check my-1">
                    <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-0" value="0">
                    <label class="form-check-label" for="multiple-choice-${i}-1">${question.answers[0]}</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-1" value="1">
                    <label class="form-check-label" for="multiple-choice-${i}-2">${question.answers[1]}</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-2" value="2">
                    <label class="form-check-label" for="multiple-choice-${i}-3">${question.answers[2]}</label>
                </div>
                <div class="form-check my-1">
                    <input class="form-check-input" type="checkbox" name="mcq${startId + i}" id="multiple-choice-${i}-3" value="3">
                    <label class="form-check-label" for="multiple-choice-${i}-4">${question.answers[3]}</label>
                </div>
            </div>`;
    }
    return html;
}

function showTextQuestion(questions, startId) {
    let html = '';
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        html += `
            <div class="question my-4">
                <p class="m-0">${startId + i}. ${question.question}</p>
                <div class="form-group my-1">
                    <input type="text" class="form-control" id="text-${i}" name="tq${startId + i}">
                </div>
            </div>`;
    }
    return html;
}

function isFinish() {
    const trueFalseQuestions = document.querySelectorAll('input[type="radio"][name^="tfq"]');
    const oneChoiceQuestions = document.querySelectorAll('input[type="radio"][name^="ocq"]');
    const multipleChoiceQuestions = document.querySelectorAll('input[type="checkbox"][name^="mcq"]');
    const textQuestions = document.querySelectorAll('input[type="text"][name^="tq"]');

    const totalQuestions = quizzData.trueFalseQuestions.length + quizzData.oneChoiceQuestions.length + quizzData.textQuestions.length + quizzData.multipleChoiceQuestions.length;
    let answeredQuestions = 0;

    for (let i = 0; i < trueFalseQuestions.length / 2; i++) {
        if (trueFalseQuestions[i*2].checked || trueFalseQuestions[i*2 + 1].checked) {
            answeredQuestions++;
        }
    }

    for (let i = 0; i < oneChoiceQuestions.length / 4; i++) {
        if (oneChoiceQuestions[i*4].checked || oneChoiceQuestions[i*4 + 1].checked || oneChoiceQuestions[i*4 + 2].checked || oneChoiceQuestions[i*4 + 3].checked) {
            answeredQuestions++;
        }
    }

    for (let i = 0; i < multipleChoiceQuestions.length / 4; i++) {
        if (multipleChoiceQuestions[i*4].checked || multipleChoiceQuestions[i*4 + 1].checked || multipleChoiceQuestions[i*4 + 2].checked || multipleChoiceQuestions[i*4 + 3].checked) {
            answeredQuestions++;
        }
    }

    for (let i = 0; i < textQuestions.length; i++) {
        if (textQuestions[i].value) {
            answeredQuestions++;
        }
    }

    return answeredQuestions >= totalQuestions / 2;
}

function getScore() {
    let score = 0;
    const trueFalseQuestions = document.querySelectorAll('input[type="radio"][name^="tfq"]');
    const oneChoiceQuestions = document.querySelectorAll('input[type="radio"][name^="ocq"]');
    const multipleChoiceQuestions = document.querySelectorAll('input[type="checkbox"][name^="mcq"]');
    const textQuestions = document.querySelectorAll('input[type="text"][name^="tq"]');

    const data = quizzData.trueFalseQuestions;
    for (let i = 0; i < data.length; i++) {
        if (
            (
                trueFalseQuestions[i*2].checked &&
                parseInt(trueFalseQuestions[i*2].value) === data[i].correctAnswer
            ) ||
            (
                trueFalseQuestions[i*2 + 1].checked &&
                parseInt(trueFalseQuestions[i*2 + 1].value) === data[i].correctAnswer
            )
        ) {
            score++;
        }
    }

    const data2 = quizzData.oneChoiceQuestions;
    for (let i = 0; i < data2.length; i++) {
        if (
            (
                oneChoiceQuestions[i*4].checked &&
                parseInt(oneChoiceQuestions[i*4].value) === data2[i].correctAnswer
            ) ||
            (
                oneChoiceQuestions[i*4 + 1].checked &&
                parseInt(oneChoiceQuestions[i*4 + 1].value) === data2[i].correctAnswer
            ) ||
            (
                oneChoiceQuestions[i*4 + 2].checked &&
                parseInt(oneChoiceQuestions[i*4 + 2].value) === data2[i].correctAnswer
            ) ||
            (
                oneChoiceQuestions[i*4 + 3].checked &&
                parseInt(oneChoiceQuestions[i*4 + 3].value) === data2[i].correctAnswer
            )
        ) {
            score++;
        }
    }

    const data3 = quizzData.multipleChoiceQuestions;
    for (let i = 0; i < data3.length; i++) {
        let correctAnswers = data3[i].correctAnswers;
        let userAnswers = [];
        for (let j = 0; j < 4; j++) {
            if (multipleChoiceQuestions[i*4 + j].checked) {
                userAnswers.push(parseInt(multipleChoiceQuestions[i*4 + j].value));
            }
        }
        if (JSON.stringify(correctAnswers) === JSON.stringify(userAnswers)) {
            score++;
        }
    }
    

    return score;
}

function submitQuizz() {
    if (!isFinish()) {
        alert("Vui lòng hoàn thành trên 50% số câu hỏi");
        return;
    }

    const score = getScore();
    const studentInfo = {
        name: document.getElementById("full-name").value,
        dob: document.getElementById("dob").value,
        studentId: document.getElementById("student-id").value,
        classId: document.getElementById("class-id").value,
    };

    const result = {
        studentInfo: studentInfo,
        score: score,
    };

    document.getElementById("quizz-container").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
    let html = `
        <div class="result">
            <p class="my-2">Họ và tên: ${result.studentInfo.name}</p>
            <p class="my-2">Ngày sinh: ${result.studentInfo.dob}</p>
            <p class="my-2">Mã sinh viên: ${result.studentInfo.studentId}</p>
            <p class="my-2">Mã lớp: ${result.studentInfo.classId}</p>
            <p class="my-2">Điểm: ${result.score} / 40</p>
        </div>`;
    resultContainer.innerHTML += html;
}